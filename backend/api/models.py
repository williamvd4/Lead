from django.db import models

class Effect(models.Model):
    name = models.CharField(max_length=100)  # Added unique constraint

    def __str__(self):
        return self.name

class Terpene(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('flower', 'Flower'),
        ('concentrates', 'Concentrates'),
        ('edibles', 'Edibles'),
        ('vapes', 'Vapes'),
        ('concentrates', 'Concentrates'),
        ('seeds', 'Seeds'),
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
    effects = models.ManyToManyField(Effect, related_name='products', blank=True) # Added blank=True
    terpenes = models.ManyToManyField(Terpene, related_name='products', blank=True) # Added blank=True

    def __str__(self):
        return self.name

class LabResult(models.Model):
    batch_number = models.CharField(max_length=50)
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='lab_results',
        null=True,      # Allow null values in the database
        blank=True,     # Allow blank values in forms (important for Django admin)
    )
    thc = models.DecimalField(max_digits=5, decimal_places=2)
    cbd = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateField() #Consider DateTimeField
    lab = models.CharField(max_length=255)
    pdf = models.FileField(upload_to='lab_results/')

    def __str__(self):
        return self.product.name

class Retailer(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='retailers/')
    address = models.CharField(max_length=255)
    url = models.URLField()
    products = models.ManyToManyField(Product, related_name='retailers', blank=True) # Added blank=True

    def __str__(self):
        return self.name

class CoreValue(models.Model):
    icon = models.CharField(max_length=50)
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class HomeCarouselItem(models.Model):
    image = models.ImageField(upload_to='home_carousel/')
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class HomeFeature(models.Model):
    image = models.ImageField(upload_to='home-features', null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title