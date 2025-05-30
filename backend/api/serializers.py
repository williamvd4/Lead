from rest_framework import serializers
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature,
    ShopItems, ShopDetails, Order, OrderItem, Cart, CartItem, Review, Size, ShopCategory  # Added ShopCategory
)

class EffectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Effect
        fields = '__all__'

class TerpeneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terpene
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    effects = EffectSerializer(many=True, read_only=True)
    terpenes = TerpeneSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        
class LabResultSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    category = serializers.SerializerMethodField()
    thc = serializers.SerializerMethodField()
    cbd = serializers.SerializerMethodField()

    class Meta:
        model = LabResult
        fields = '__all__'

    def get_category(self, obj):
        return obj.get_category()

    def get_thc(self, obj):
        return obj.get_thc()

    def get_cbd(self, obj):
        return obj.get_cbd()

class RetailerSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Retailer
        fields = '__all__'

    def get_products(self, obj):
        return ", ".join([f"{product.name} ({product.category})" for product in obj.products.all()])

class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = '__all__'

class HomeCarouselItemSerializer(serializers.ModelSerializer):
    admin_title = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    title = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    description = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    link_page = serializers.ChoiceField(choices=[
        ('/about', 'About'),
        ('/products', 'Products'),
        ('/retailers', 'Retailers'),
        ('/lab-results', 'Lab Results'),
        ('/cultivation', 'Cultivation')
    ], required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = HomeCarouselItem
        fields = '__all__'

class HomeFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeFeature
        fields = '__all__'

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'

class ShopCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopCategory
        fields = ['id', 'name', 'slug']

class ShopItemsSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    sizes = SizeSerializer(many=True, read_only=True)
    size_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=Size.objects.all(), source='sizes', required=False
    )
    category = ShopCategorySerializer(read_only=True) # Display category details
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=ShopCategory.objects.all(), source='category', write_only=True, allow_null=True, required=False
    )

    class Meta:
        model = ShopItems
        fields = [
            'id', 'name', 'slug', 'description', 'image', 'image_url', 
            'price', 'category', 'category_id', 'sizes', 'size_ids', 'in_stock'
        ]
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class ShopDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopDetails
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product = ShopItemsSerializer(read_only=True) # Display product details
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=ShopItems.objects.all(), source='product', write_only=True
    )
    item_total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'product_id', 'quantity', 'price', 'item_total'] 

    def get_item_total(self, obj):
        # Assuming obj.price on OrderItem stores the unit price at the time of purchase
        return obj.quantity * obj.price 

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True) # Now OrderItemSerializer is defined
    user = serializers.PrimaryKeyRelatedField(read_only=True) # Or StringRelatedField
    # total_price is a model field. Ensure it's correctly calculated and saved in the model.

    class Meta:
        model = Order
        fields = ['id', 'user', 'items', 'created_at', 'updated_at', 'status', 'total_price']

class CartItemSerializer(serializers.ModelSerializer):
    product = ShopItemsSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=ShopItems.objects.all(), source='product', write_only=True
    )
    size = SizeSerializer(read_only=True, allow_null=True)
    size_id = serializers.PrimaryKeyRelatedField(
        queryset=Size.objects.all(), source='size', write_only=True, allow_null=True, required=False
    )
    item_total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'product_id', 'size', 'size_id', 'quantity', 'item_total']

    def get_item_total(self, obj):
        return obj.product.price * obj.quantity

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True) # Or StringRelatedField
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at', 'updated_at', 'total_price']

    def get_total_price(self, obj):
        return sum(item.product.price * item.quantity for item in obj.items.all())

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField() # Display username

    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at'] # User and created_at are set automatically
