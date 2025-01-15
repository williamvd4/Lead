from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, RetailerViewSet, LabResultViewSet, TerpeneViewSet, EffectViewSet


router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'retailers', RetailerViewSet)
router.register(r'lab-results', LabResultViewSet)
router.register(r'terpenes', TerpeneViewSet)
router.register(r'effects', EffectViewSet)

urlpatterns = [
    path('', include(router.urls)),
]   