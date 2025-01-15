from rest_framework import viewsets
from .models import Product, Retailer, LabResult, Terpene, Effect
from .serializers import ProductSerializer, RetailerSerializer, LabResultSerializer, TerpeneSerializer, EffectSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class RetailerViewSet(viewsets.ModelViewSet):
    queryset = Retailer.objects.all()
    serializer_class = RetailerSerializer
    
class LabResultViewSet(viewsets.ModelViewSet):
    queryset = LabResult.objects.all()
    serializer_class = LabResultSerializer
    
class TerpeneViewSet(viewsets.ModelViewSet):
    queryset = Terpene.objects.all()
    serializer_class = TerpeneSerializer
    
class EffectViewSet(viewsets.ModelViewSet):
    queryset = Effect.objects.all()
    serializer_class = EffectSerializer