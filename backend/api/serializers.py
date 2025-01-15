from rest_framework import serializers
from .models import Product, Retailer, LabResult, Terpene, Effect
from django.conf import settings

class TerpeneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terpene
        fields = ['id', 'name']

class EffectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Effect
        fields = ['id', 'description']

class ProductSerializer(serializers.ModelSerializer):
    effects = EffectSerializer(many=True, read_only=True)
    terpenes = TerpeneSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'type', 'thc', 'cbd', 'image', 'description', 'effects', 'terpenes']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        return None

class RetailerSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    logo = serializers.SerializerMethodField()

    class Meta:
        model = Retailer
        fields = ['id', 'name', 'logo', 'logo_alt', 'address', 'url', 'products']

    def get_logo(self, obj):
        request = self.context.get('request')
        if obj.logo and hasattr(obj.logo, 'url'):
            return request.build_absolute_uri(obj.logo.url)
        return None

class LabResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabResult
        fields = ['id', 'batch_number', 'strain', 'thc', 'cbd', 'date', 'lab', 'pdf']




