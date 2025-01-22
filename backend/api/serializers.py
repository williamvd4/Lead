from rest_framework import serializers
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature
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
    products = serializers.SerializerMethodField()

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