# app/admin.py

from django.contrib import admin
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature
)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'type', 'thc', 'cbd', 'make_active')
    search_fields = ('name', 'category', 'type')
    list_filter = ('category', 'type')
    list_editable = ('make_active',)
    
    
@admin.register(LabResult)
class LabResultAdmin(admin.ModelAdmin):
    list_display = ('batch_number', 'product', 'date', 'make_active')
    search_fields = ('batch_number', 'product__name', 'lab')
    list_filter = ('date', 'lab')
    list_editable = ('make_active',)

    
@admin.register(HomeCarouselItem)
class HomeCarouselItemAdmin(admin.ModelAdmin):
    list_display = ('admin_title', 'make_active', )
    list_editable = ('make_active',)
    
@admin.register(Retailer)
class RetailerAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'url', 'make_active')
    search_fields = ('name', 'address')
    list_filter = ('products',)
    list_editable = ('make_active',)

admin.site.register(Effect)
admin.site.register(Terpene)
admin.site.register(CoreValue)
admin.site.register(HomeFeature)