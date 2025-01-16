# app/views.py

from rest_framework import viewsets
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

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class RetailerViewSet(viewsets.ModelViewSet):
    queryset = Retailer.objects.all()
    serializer_class = RetailerSerializer

class CoreValueViewSet(viewsets.ModelViewSet):
    queryset = CoreValue.objects.all()
    serializer_class = CoreValueSerializer

class HomeCarouselItemViewSet(viewsets.ModelViewSet):
    queryset = HomeCarouselItem.objects.all()
    serializer_class = HomeCarouselItemSerializer

class HomeFeatureViewSet(viewsets.ModelViewSet):
    queryset = HomeFeature.objects.all()
    serializer_class = HomeFeatureSerializer