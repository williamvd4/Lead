# app/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EffectViewSet, TerpeneViewSet, ProductViewSet, LabResultViewSet,
    RetailerViewSet, CoreValueViewSet, HomeCarouselItemViewSet, HomeFeatureViewSet,
    ShopItemsViewSet, ShopDetailsViewSet
)

router = DefaultRouter()
router.register(r'effects', EffectViewSet)
router.register(r'terpenes', TerpeneViewSet)
router.register(r'products', ProductViewSet)
router.register(r'lab-results', LabResultViewSet)
router.register(r'retailers', RetailerViewSet)
router.register(r'core-values', CoreValueViewSet)
router.register(r'home-carousel', HomeCarouselItemViewSet)
router.register(r'home-features', HomeFeatureViewSet)
router.register(r'shopitems', ShopItemsViewSet)  # Make sure this matches your frontend fetch URL
router.register(r'shop-details', ShopDetailsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]