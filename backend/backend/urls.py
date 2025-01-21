# backend/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.static import serve




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # Explicit media serving
    path('media/<path:path>', serve, {
        'document_root': settings.MEDIA_ROOT,
        'show_indexes': False,
    }),
]