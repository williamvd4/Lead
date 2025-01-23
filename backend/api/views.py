# app/views.py
from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.conf import settings
import os
import zipfile
import io
import json
from .models import (
    Effect, Terpene, Product, LabResult,
    Retailer, CoreValue, HomeCarouselItem, HomeFeature
)
from .serializers import (
    EffectSerializer, TerpeneSerializer, ProductSerializer, LabResultSerializer,
    RetailerSerializer, CoreValueSerializer, HomeCarouselItemSerializer, HomeFeatureSerializer
)

class EffectViewSet(viewsets.ModelViewSet):
    queryset = Effect.objects.all()
    serializer_class = EffectSerializer

class TerpeneViewSet(viewsets.ModelViewSet):
    queryset = Terpene.objects.all()
    serializer_class = TerpeneSerializer

class LabResultViewSet(viewsets.ModelViewSet):
    queryset = LabResult.objects.all()
    serializer_class = LabResultSerializer
    
    def labresults_view(request):
        active_items = LabResult.objects.all()
        return render(request, 'lab_results.html', {'lab_results': active_items})

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def products_view(request):
        active_items = Product.objects.all()
        return render(request, 'products.html', {'products': active_items})


class RetailerViewSet(viewsets.ModelViewSet):
    queryset = Retailer.objects.all()
    serializer_class = RetailerSerializer
    
    def retailers_view(request):
        active_items = Retailer.objects.all()
        return render(request, 'retailers.html', {'retailers': active_items})


class CoreValueViewSet(viewsets.ModelViewSet):
    queryset = CoreValue.objects.all()
    serializer_class = CoreValueSerializer

class HomeCarouselItemViewSet(viewsets.ModelViewSet):
    queryset = HomeCarouselItem.objects.filter(make_active=True)
    serializer_class = HomeCarouselItemSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)  # Debug statement
        response = super().create(request, *args, **kwargs)
        print(response.data)  # Debug statement
        return response

def home_view(request):
    active_items = HomeCarouselItem.objects.filter(make_active=True)
    return render(request, 'home.html', {'carousel_items': active_items})

class HomeFeatureViewSet(viewsets.ModelViewSet):
    queryset = HomeFeature.objects.all()
    serializer_class = HomeFeatureSerializer

def export_database_and_images(request):
    # Export database data
    data = {
        'effects': serializers.serialize('json', Effect.objects.all()),
        'terpenes': serializers.serialize('json', Terpene.objects.all()),
        'products': serializers.serialize('json', Product.objects.all()),
        'lab_results': serializers.serialize('json', LabResult.objects.all()),
        'retailers': serializers.serialize('json', Retailer.objects.all()),
        'core_values': serializers.serialize('json', CoreValue.objects.all()),
        'home_carousel_items': serializers.serialize('json', HomeCarouselItem.objects.all()),
        'home_features': serializers.serialize('json', HomeFeature.objects.all()),
    }
    json_data = json.dumps(data)

    # Create a zip file
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, 'w') as zip_file:
        # Add JSON data to the zip file
        zip_file.writestr('data.json', json_data)

        # Add images to the zip file
        for folder in ['products', 'home_carousel', 'home-features', 'retailers']:
            folder_path = os.path.join(settings.MEDIA_ROOT, folder)
            for root, _, files in os.walk(folder_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    print(f"Adding file: {file_path}")  # Debug statement
                    zip_file.write(file_path, os.path.relpath(file_path, settings.MEDIA_ROOT))

    buffer.seek(0)
    response = HttpResponse(buffer, content_type='application/zip')
    response['Content-Disposition'] = 'attachment; filename=database_and_images.zip'
    return response

def import_database_and_images(request):
    if request.method == 'POST' and request.FILES.get('file'):
        zip_file = request.FILES['file']
        with zipfile.ZipFile(zip_file, 'r') as zip_ref:
            # Extract JSON data
            json_data = zip_ref.read('data.json')
            data = json.loads(json_data)
            for model, objects in data.items():
                model_class = globals()[model.capitalize()]
                for obj in objects:
                    model_class.objects.update_or_create(pk=obj['pk'], defaults=obj['fields'])

            # Extract images
            zip_ref.extractall(settings.MEDIA_ROOT)

        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'failed'}, status=400)