from django.db import models




class Terpene(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Effect(models.Model):
    """Represents an effect associated with a cannabis product."""
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.description

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    thc = models.FloatField()
    cbd = models.FloatField()
    image = models.ImageField(upload_to='products/')
    description = models.TextField()
    effects = models.ManyToManyField(Effect, related_name='products')
    terpenes = models.ManyToManyField(Terpene, related_name='products')

    def __str__(self):
        return self.name

class Retailer(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='retailers/')
    logo_alt = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    url = models.URLField()
    products = models.ManyToManyField(Product, related_name='retailers')

    def __str__(self):
        return self.name

class LabResult(models.Model):
    """Represents a lab result for a cannabis product."""
    batch_number = models.CharField(max_length=100)
    strain = models.CharField(max_length=255)
    thc = models.CharField(max_length=50)
    cbd = models.CharField(max_length=50)
    date = models.DateField()
    lab = models.CharField(max_length=255)
    pdf = models.FileField(upload_to='lab_results/')

    def __str__(self):
        return f"{self.strain} - {self.batch_number}"