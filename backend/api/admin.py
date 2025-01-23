# app/admin.py
from import_export import fields, resources
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ForeignKeyWidget
from django.core.files.base import ContentFile
import base64
import os
from django import forms
from django.contrib import admin
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature
)

class BaseImageResource(resources.ModelResource):
    def export_field(self, field, obj, **kwargs):
        if field.attribute and field.attribute.endswith('image') and getattr(obj, field.attribute):
            image_file = getattr(obj, field.attribute)
            try:
                with open(image_file.path, 'rb') as f:
                    return base64.b64encode(f.read()).decode('utf-8')
            except:
                return ''
        return super().export_field(field, obj, **kwargs)

    def import_field(self, field, obj, data, is_m2m=False):
        if field.attribute and field.attribute.endswith('image') and data.get(field.column_name):
            image_data = base64.b64decode(data[field.column_name])
            image_name = f"{obj.__class__.__name__.lower()}_{field.attribute}_{os.urandom(8).hex()}"
            content_file = ContentFile(image_data, name=image_name)
            setattr(obj, field.attribute, content_file)
        else:
            super().import_field(field, obj, data, is_m2m)

class ProductResource(BaseImageResource):
    image = fields.Field(column_name='image', attribute='image')
    
    class Meta:
        model = Product
        fields = ('id', 'name', 'category', 'type', 'thc', 'cbd', 'description', 'effects', 'terpenes', 'make_active', 'image')

class LabResultResource(resources.ModelResource):
    class Meta:
        model = LabResult

class RetailerResource(BaseImageResource):
    logo = fields.Field(column_name='logo', attribute='logo')
    
    class Meta:
        model = Retailer
        fields = ('id', 'name', 'logo', 'address', 'url', 'make_active', 'products')

class HomeCarouselItemResource(BaseImageResource):
    image = fields.Field(column_name='image', attribute='image')
    
    class Meta:
        model = HomeCarouselItem
        fields = ('id', 'admin_title', 'image', 'title', 'description', 'order', 'link_page', 'make_active')

class HomeFeatureResource(BaseImageResource):
    image = fields.Field(column_name='image', attribute='image')
    
    class Meta:
        model = HomeFeature
        fields = ('id', 'image', 'title', 'description', 'order', 'make_active')

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
    resource_class = HomeCarouselItemResource
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
    resource_class = HomeFeatureResource
    pass