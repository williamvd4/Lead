# app/admin.py
from django import forms
from django.contrib import admin
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature,
    ShopItems, ShopDetails, Order, OrderItem, Cart, CartItem, Review  # Updated model name
)
from import_export import resources
from import_export.admin import ImportExportModelAdmin

class RetailerAdminForm(forms.ModelForm):
    class Meta:
        model = Retailer
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['products'].queryset = Product.objects.all()
        self.fields['products'].label_from_instance = lambda obj: f"{obj.name} ({obj.category})"
        
        
@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    list_display = ('name', 'category', 'type', 'thc', 'cbd', 'make_active')
    search_fields = ('name', 'category', 'type')
    list_filter = ('category', 'type')
    list_editable = ('make_active',)
    
@admin.register(LabResult)
class LabResultAdmin(ImportExportModelAdmin):
    list_display = ('batch_number', 'product', 'get_category', 'get_thc', 'get_cbd', 'date', 'make_active')
    search_fields = ('batch_number', 'product__name', 'lab', 'product__category')
    list_filter = ('date', 'lab', 'product__category')
    list_editable = ('make_active',)
    exclude = ('thc', 'cbd')

    def get_category(self, obj):
        return obj.get_category()
    get_category.short_description = 'Category'

    def get_thc(self, obj):
        return obj.get_thc()
    get_thc.short_description = 'THC'

    def get_cbd(self, obj):
        return obj.get_cbd()
    get_cbd.short_description = 'CBD'
    
            
@admin.register(HomeCarouselItem)
class HomeCarouselItemAdmin(ImportExportModelAdmin):
    list_display = ('admin_title', 'make_active', )
    list_editable = ('make_active',)
    
@admin.register(Retailer)
class RetailerAdmin(ImportExportModelAdmin):
    form = RetailerAdminForm
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

@admin.register(ShopItems)  # Updated registration
class ShopItemsAdmin(ImportExportModelAdmin):  # Updated class name
    list_display = ('name', 'price', 'category', 'size', 'in_stock')
    search_fields = ('name', 'description', 'category')
    list_filter = ('category', 'size', 'in_stock')

@admin.register(ShopDetails)
class ShopDetailsAdmin(ImportExportModelAdmin):
    list_display = ('shop', 'detail')
    search_fields = ('shop__name', 'detail')

@admin.register(Order)
class OrderAdmin(ImportExportModelAdmin):
    list_display = ('user', 'created_at', 'updated_at', 'status', 'total_price')
    search_fields = ('user__username', 'status')
    list_filter = ('status', 'created_at', 'updated_at')

@admin.register(OrderItem)
class OrderItemAdmin(ImportExportModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price')
    search_fields = ('order__user__username', 'product__name')
    list_filter = ('order', 'product')

@admin.register(Cart)
class CartAdmin(ImportExportModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')
    search_fields = ('user__username',)
    list_filter = ('created_at', 'updated_at')

@admin.register(CartItem)
class CartItemAdmin(ImportExportModelAdmin):
    list_display = ('cart', 'product', 'quantity')
    search_fields = ('cart__user__username', 'product__name')
    list_filter = ('cart', 'product')

@admin.register(Review)
class ReviewAdmin(ImportExportModelAdmin):
    list_display = ('product', 'user', 'rating', 'created_at', 'updated_at')
    search_fields = ('product__name', 'user__username', 'rating')
    list_filter = ('rating', 'created_at', 'updated_at')
