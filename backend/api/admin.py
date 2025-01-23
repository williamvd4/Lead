# app/admin.py
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django import forms
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
import zipfile
import io
import os
from django.conf import settings
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

# Custom admin views for exporting and importing images
def export_images_admin(request):
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, 'w') as zip_file:
        for folder in ['products', 'home_carousel', 'home-features', 'retailers']:
            folder_path = os.path.join(settings.MEDIA_ROOT, folder)
            for root, _, files in os.walk(folder_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    zip_file.write(file_path, os.path.relpath(file_path, settings.MEDIA_ROOT))
    buffer.seek(0)
    response = HttpResponse(buffer, content_type='application/zip')
    response['Content-Disposition'] = 'attachment; filename=images.zip'
    return response

def import_images_admin(request):
    if request.method == 'POST' and request.FILES.get('file'):
        zip_file = request.FILES['file']
        with zipfile.ZipFile(zip_file, 'r') as zip_ref:
            zip_ref.extractall(settings.MEDIA_ROOT)
        return HttpResponse('Images imported successfully')
    return HttpResponse('Failed to import images', status=400)

# Store the original get_urls method
original_get_urls = admin.site.get_urls

# Register custom admin views
def get_urls():
    urls = original_get_urls()
    custom_urls = [
        path('export-images/', export_images_admin, name='export-images'),
        path('import-images/', import_images_admin, name='import-images'),
    ]
    return custom_urls + urls

admin.site.get_urls = get_urls