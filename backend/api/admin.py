# app/admin.py

from django.contrib import admin
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature
)



admin.site.register(Effect)
admin.site.register(Terpene)
admin.site.register(LabResult)
admin.site.register(Retailer)
admin.site.register(CoreValue)
admin.site.register(HomeCarouselItem)
admin.site.register(HomeFeature)
admin.site.register(Product)