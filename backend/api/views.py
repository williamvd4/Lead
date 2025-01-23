# app/admin.py
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django import forms
from django.contrib import admin
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature
)

class ProductResource(resources.ModelResource):
    class Meta:
        model = Product

class LabResultResource(resources.ModelResource):
    class Meta:
        model = LabResult

class RetailerResource(resources.ModelResource):
    class Meta:
        model = Retailer

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
    resource_class = ProductResource
    list_display = ('name', 'category', 'type', 'thc', 'cbd', 'make_active')
    search_fields = ('name', 'category', 'type')
    list_filter = ('category', 'type')
    list_editable = ('make_active',)
    
@admin.register(LabResult)
class LabResultAdmin(ImportExportModelAdmin):
    resource_class = LabResultResource
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
    resource_class = RetailerResource
    form = RetailerAdminForm
    list_display = ('name', 'address', 'url', 'make_active', 'get_products_with_category')
    search_fields = ('name', 'address')
    list_filter = ('products',)
    list_editable = ('make_active',)

    def get_products_with_category(self, obj):
        return obj.get_products_with_category()
    get_products_with_category.short_description = 'Products (Category)'
    


@admin.register(Effect)
class EffectAdmin(ImportExportModelAdmin):
    pass

@admin.register(Terpene)
class TerpeneAdmin(ImportExportModelAdmin):
    pass

@admin.register(CoreValue)
class CoreValueAdmin(ImportExportModelAdmin):
    pass

@admin.register(HomeFeature)
class HomeFeatureAdmin(ImportExportModelAdmin):
    pass