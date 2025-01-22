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
    list_display = ('batch_number', 'product', 'get_category', 'date', 'make_active')
    search_fields = ('batch_number', 'product__name', 'lab', 'product__category')
    list_filter = ('date', 'lab', 'product__category')
    list_editable = ('make_active',)

    def get_category(self, obj):
        return obj.get_category()
    get_category.short_description = 'Category'
        
@admin.register(HomeCarouselItem)
class HomeCarouselItemAdmin(admin.ModelAdmin):
    list_display = ('admin_title', 'make_active', )
    list_editable = ('make_active',)
    
@admin.register(Retailer)
class RetailerAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'url', 'make_active', 'get_products_with_category')
    search_fields = ('name', 'address')
    list_filter = ('products',)
    list_editable = ('make_active',)

    def get_products_with_category(self, obj):
        return obj.get_products_with_category()
    get_products_with_category.short_description = 'Products (Category)'
    
    
admin.site.register(Effect)
admin.site.register(Terpene)
admin.site.register(CoreValue)
admin.site.register(HomeFeature)