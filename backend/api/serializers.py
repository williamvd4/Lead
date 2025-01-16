# app/serializers.py

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

class LabResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabResult
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    effects = EffectSerializer(many=True, read_only=True)
    terpenes = TerpeneSerializer(many=True, read_only=True)
    lab_results = LabResultSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class RetailerSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Retailer
        fields = '__all__'

class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = '__all__'

class HomeCarouselItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeCarouselItem
        fields = '__all__'

class HomeFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeFeature
        fields = '__all__'