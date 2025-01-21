# app/admin.py

from django.contrib import admin
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature
)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'type', 'thc', 'cbd')
    search_fields = ('name', 'category', 'type')
    list_filter = ('category', 'type')

admin.site.register(Effect)
admin.site.register(Terpene)
admin.site.register(LabResult)
admin.site.register(Retailer)
admin.site.register(CoreValue)
admin.site.register(HomeCarouselItem)
admin.site.register(HomeFeature)