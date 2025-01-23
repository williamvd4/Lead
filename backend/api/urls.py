# app/urls.py

from django.urls import path, include
from rest_framework import routers
from .views import (
    EffectViewSet, TerpeneViewSet, ProductViewSet, LabResultViewSet,
    RetailerViewSet, CoreValueViewSet, HomeCarouselItemViewSet, HomeFeatureViewSet,
    export_database_and_images, import_database_and_images
)

router = routers.DefaultRouter()
router.register(r'effects', EffectViewSet)
router.register(r'terpenes', TerpeneViewSet)
router.register(r'lab-results', LabResultViewSet)
router.register(r'products', ProductViewSet)
router.register(r'retailers', RetailerViewSet)
router.register(r'core-values', CoreValueViewSet)
router.register(r'home-carousel', HomeCarouselItemViewSet)
router.register(r'home-features', HomeFeatureViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('export-database-and-images/', export_database_and_images, name='export-database-and-images'),
    path('import-database-and-images/', import_database_and_images, name='import-database-and-images'),
]