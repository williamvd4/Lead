from django.contrib import admin
from .models import Product, Retailer, LabResult, Terpene, Effect

admin.site.register(Product)
admin.site.register(Retailer)
admin.site.register(LabResult)
admin.site.register(Terpene)
admin.site.register(Effect)

# Register your models here.
