from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

class Effect(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Terpene(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('flower', 'Flower'),
        ('preroll', 'Preroll'),
        ('concentrates', 'Concentrates'),
        ('edibles', 'Edibles'),
        ('vapes', 'Vapes'),
    ]

    TYPE_CHOICES = [
        ('Sativa', 'Sativa'),
        ('Indica', 'Indica'),
        ('Hybrid', 'Hybrid'),
    ]
    
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    thc = models.DecimalField(max_digits=5, decimal_places=2)
    cbd = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    description = models.TextField()
    effects = models.ManyToManyField(Effect, related_name='products', blank=True)
    terpenes = models.ManyToManyField(Terpene, related_name='products', blank=True)
    make_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    def get_image_url(self):
        if self.image:
            return self.image.url
        return None

class LabResult(models.Model):
    batch_number = models.CharField(max_length=50)
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='lab_results',
        null=True,
        blank=True,
    )
    thc = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    cbd = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    date = models.DateField()
    lab = models.CharField(max_length=255)
    pdf = models.FileField(upload_to='lab_results/')
    make_active = models.BooleanField(default=False)

    def __str__(self):
        return self.product.name if self.product else "No Product"

    def get_category(self):
        return self.product.category if self.product else None

    def get_thc(self):
        return self.product.thc if self.product else None

    def get_cbd(self):
        return self.product.cbd if self.product else None

    def save(self, *args, **kwargs):
        if self.product:
            self.thc = self.product.thc
            self.cbd = self.product.cbd
        super().save(*args, **kwargs)

class Retailer(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='retailers/')
    address = models.CharField(max_length=255)
    url = models.URLField()
    products = models.ManyToManyField(Product, related_name='retailers', blank=True)
    make_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    def get_logo_url(self):
        if self.logo:
            return self.logo.url
        return None

class CoreValue(models.Model):
    icon = models.CharField(max_length=50)
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class HomeCarouselItem(models.Model):
    admin_title = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='home_carousel/')
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)
    link_page = models.CharField(
        max_length=255, 
        null=True, 
        blank=True,
        choices=[
            ('/about', 'About'),
            ('/products', 'Products'),
            ('/retailers', 'Retailers'),
            ('/lab-results', 'Lab Results'),
            ('/cultivation', 'Cultivation')
        ]
    )
    make_active = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.admin_title if self.admin_title else "No Title"

    def get_image_url(self):
        if self.image:
            return self.image.url
        return None

class HomeFeature(models.Model):
    image = models.ImageField(upload_to='home-features', null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)
    
    make_active = models.BooleanField(default=False)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
    
    def get_image_url(self):
        if self.image:
            return self.image.url
        return None