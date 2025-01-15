from django.contrib import admin
from .models import Product, Retailer, LabResult, Terpene, Effect

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'type')

admin.site.register(Product, ProductAdmin)

admin.site.register(Retailer)
admin.site.register(LabResult)
admin.site.register(Terpene)
admin.site.register(Effect)

# Register your models here.
