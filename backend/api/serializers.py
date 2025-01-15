from rest_framework import serializers
from .models import Product, Retailer, LabResult, Terpene, Effect

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

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'type', 'thc', 'cbd', 'image', 'description', 'effects', 'terpenes']

class RetailerSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Retailer
        fields = ['id', 'name', 'logo', 'logo_alt', 'address', 'url', 'products']

class LabResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabResult
        fields = ['id', 'batch_number', 'strain', 'thc', 'cbd', 'date', 'lab', 'pdf']




