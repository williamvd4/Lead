# app/views.py

from rest_framework import viewsets
from django.shortcuts import render
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature
)
from .serializers import (
    EffectSerializer, TerpeneSerializer, ProductSerializer, LabResultSerializer,
    RetailerSerializer, CoreValueSerializer, HomeCarouselItemSerializer, HomeFeatureSerializer
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