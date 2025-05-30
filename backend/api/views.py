# app/views.py
from django.shortcuts import render
from rest_framework import viewsets, status # Added status
from rest_framework.permissions import IsAuthenticated # Added IsAuthenticated
from rest_framework.response import Response # Added Response
from rest_framework.decorators import action # Added action
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.conf import settings
from django.db import transaction # Added transaction
from decimal import Decimal # Added Decimal
import os
import zipfile
import io
import json
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature,
    ShopItems, ShopDetails, Order, OrderItem, Cart, CartItem, Review, Size  # Added Size
)
from .serializers import (
    EffectSerializer, TerpeneSerializer, ProductSerializer, LabResultSerializer,
    RetailerSerializer, CoreValueSerializer, HomeCarouselItemSerializer, HomeFeatureSerializer,
    ShopItemsSerializer, ShopDetailsSerializer, OrderSerializer, OrderItemSerializer, CartSerializer, CartItemSerializer, ReviewSerializer, SizeSerializer  # Added SizeSerializer
)

class EffectViewSet(viewsets.ModelViewSet):
    queryset = Effect.objects.all()
    serializer_class = EffectSerializer

class TerpeneViewSet(viewsets.ModelViewSet):
    queryset = Terpene.objects.all()
    serializer_class = TerpeneSerializer

class LabResultViewSet(viewsets.ModelViewSet):
    queryset = LabResult.objects.all()
    serializer_class = LabResultSerializer
    
    def labresults_view(request):
        active_items = LabResult.objects.all()
        return render(request, 'lab_results.html', {'lab_results': active_items})

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def products_view(request):
        active_items = Product.objects.all()
        return render(request, 'products.html', {'products': active_items})


class RetailerViewSet(viewsets.ModelViewSet):
    queryset = Retailer.objects.all()
    serializer_class = RetailerSerializer
    
    def retailers_view(request):
        active_items = Retailer.objects.all()
        return render(request, 'retailers.html', {'retailers': active_items})


class CoreValueViewSet(viewsets.ModelViewSet):
    queryset = CoreValue.objects.all()
    serializer_class = CoreValueSerializer

class HomeCarouselItemViewSet(viewsets.ModelViewSet):
    queryset = HomeCarouselItem.objects.filter(make_active=True)
    serializer_class = HomeCarouselItemSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)  # Debug statement
        response = super().create(request, *args, **kwargs)
        print(response.data)  # Debug statement
        return response

def home_view(request):
    active_items = HomeCarouselItem.objects.filter(make_active=True)
    return render(request, 'home.html', {'carousel_items': active_items})

class HomeFeatureViewSet(viewsets.ModelViewSet):
    queryset = HomeFeature.objects.all()
    serializer_class = HomeFeatureSerializer

class SizeViewSet(viewsets.ModelViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer

class ShopItemsViewSet(viewsets.ModelViewSet):  # Updated class name
    queryset = ShopItems.objects.all()  # Updated model reference
    serializer_class = ShopItemsSerializer  # Updated serializer reference

class ShopDetailsViewSet(viewsets.ModelViewSet):
    queryset = ShopDetails.objects.all()
    serializer_class = ShopDetailsSerializer

class OrderViewSet(viewsets.ReadOnlyModelViewSet): # Changed from ModelViewSet to ReadOnlyModelViewSet
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Ensure users can only see their own orders."""
        return Order.objects.filter(user=self.request.user).prefetch_related('items__product').order_by('-created_at')

    @action(detail=False, methods=['post'], url_path='create-from-cart')
    def create_order_from_cart(self, request):
        user = request.user
        try:
            cart = Cart.objects.get(user=user)
            if not cart.items.exists():
                return Response({'error': 'Your cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)
        except Cart.DoesNotExist:
            return Response({'error': 'You do not have a cart.'}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic(): # Ensure atomicity
            # Create the order
            order = Order.objects.create(user=user, total_price=Decimal(0)) # Initial total price
            current_order_total = Decimal(0)

            for cart_item in cart.items.all():
                if not cart_item.product.in_stock:
                    # Handle out-of-stock items - rollback and inform user
                    # transaction.set_rollback(True) # This is implicitly handled by raising an exception
                    return Response(
                        {'error': f'Product {cart_item.product.name} is out of stock.'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Create OrderItem, storing the price at the time of purchase
                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    quantity=cart_item.quantity,
                    price=cart_item.product.price # Store current product price as historical price
                )
                current_order_total += (cart_item.quantity * cart_item.product.price)
            
            # Update the order's total price
            order.total_price = current_order_total
            order.save()

            # Clear the cart
            cart.items.all().delete()
        
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CartViewSet(viewsets.GenericViewSet): # Changed from ModelViewSet to GenericViewSet
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # This queryset is not directly used for list/retrieve by GenericViewSet 
        # but can be useful for other actions or if we add mixins.
        return Cart.objects.filter(user=self.request.user)

    def get_object(self):
        # Retrieve or create cart for the current user
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

    # GET /api/cart/
    def retrieve(self, request, *args, **kwargs):
        cart = self.get_object()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    # DELETE /api/cart/
    def destroy(self, request, *args, **kwargs):
        cart = self.get_object()
        # Delete all cart items associated with the cart
        cart.items.all().delete() 
        # Optionally, delete the cart itself or keep it empty
        # cart.delete() # if you want to delete the cart record too
        return Response(status=status.HTTP_204_NO_CONTENT)

    # POST /api/cart/add_item/
    @action(detail=False, methods=['post'], url_path='add-item')
    def add_item(self, request):
        cart = self.get_object()
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = ShopItems.objects.get(id=product_id)
        except ShopItems.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    # PUT /api/cart/update-item/{item_pk}/
    @action(detail=False, methods=['put'], url_path='update-item/(?P<item_pk>[^/.]+)')
    def update_item(self, request, item_pk=None):
        cart = self.get_object()
        quantity = int(request.data.get('quantity', 1))

        if quantity <= 0:
            # If quantity is 0 or less, remove the item
            return self.remove_item(request, item_pk=item_pk, internal_call=True)

        try:
            cart_item = CartItem.objects.get(id=item_pk, cart=cart)
            cart_item.quantity = quantity
            cart_item.save()
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

    # DELETE /api/cart/remove-item/{item_pk}/
    @action(detail=False, methods=['delete'], url_path='remove-item/(?P<item_pk>[^/.]+)')
    def remove_item(self, request, item_pk=None, internal_call=False):
        cart = self.get_object()
        try:
            cart_item = CartItem.objects.get(id=item_pk, cart=cart)
            cart_item.delete()
            if internal_call: # Avoid sending response if called internally by update_item
                return True 
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            if internal_call:
                return False
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

def export_database_and_images(request):
    # Export database data
    data = {
        'effects': serializers.serialize('json', Effect.objects.all()),
        'terpenes': serializers.serialize('json', Terpene.objects.all()),
        'products': serializers.serialize('json', Product.objects.all()),
        'lab_results': serializers.serialize('json', LabResult.objects.all()),
        'retailers': serializers.serialize('json', Retailer.objects.all()),
        'core_values': serializers.serialize('json', CoreValue.objects.all()),
        'home_carousel': serializers.serialize('json', HomeCarouselItem.objects.all()),
        'home_features': serializers.serialize('json', HomeFeature.objects.all()),
    }
    json_data = json.dumps(data)

    # Create a zip file
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, 'w') as zip_file:
        # Add JSON data to the zip file
        zip_file.writestr('data.json', json_data)

        # Add images to the zip file
        for folder in ['products', 'home_carousel', 'home-features', 'retailers']:
            folder_path = os.path.join(settings.MEDIA_ROOT, folder)
            for root, _, files in os.walk(folder_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    print(f"Adding file: {file_path}")  # Debug statement
                    zip_file.write(file_path, os.path.relpath(file_path, settings.MEDIA_ROOT))

    buffer.seek(0)
    response = HttpResponse(buffer, content_type='application/zip')
    response['Content-Disposition'] = 'attachment; filename=database_and_images.zip'
    return response

def import_database_and_images(request):
    if request.method == 'POST' and request.FILES.get('file'):
        zip_file = request.FILES['file']
        with zipfile.ZipFile(zip_file, 'r') as zip_ref:
            # Extract JSON data
            json_data = zip_ref.read('data.json')
            data = json.loads(json_data)
            for model, objects in data.items():
                model_class = globals()[model.capitalize()]
                for obj in objects:
                    model_class.objects.update_or_create(pk=obj['pk'], defaults=obj['fields'])

            # Extract images
            zip_ref.extractall(settings.MEDIA_ROOT)

        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'failed'}, status=400)
