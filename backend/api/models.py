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
    description = models.TextField(blank=True)  # Made optional
    effects = models.ManyToManyField(Effect, related_name='products', blank=True) # Added blank=True
    terpenes = models.ManyToManyField(Terpene, related_name='products', blank=True) # Added blank=True
    make_active = models.BooleanField(default=False)  # New field

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
    make_active = models.BooleanField(default=False)
    products = models.ManyToManyField(Product)

    def get_products_with_category(self):
        return ', '.join([f"{product.name} ({product.category})" for product in self.products.all()])
    
    def get_logo_url(self):
        if self.logo:
            return self.logo.url
        return None


    def __str__(self):
        return self.name
    
    
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
    image = models.ImageField(upload_to='home-features', null=True)
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0, blank=True)
    
    make_active = models.BooleanField(default=False)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
    
    def get_image_url(self):
        if self.image:
            return self.image.url
        return None

class ShopItems(models.Model):
    CATEGORY_CHOICES = [
        ('clothing', 'Clothing'),
        ('accessories', 'Accessories'),
        ('merchandise', 'Merchandise'),
        ('other', 'Other'),
    ]
    
    SIZE_CHOICES = [
        ('N/A', 'Not Applicable'),
        ('XS', 'Extra Small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('XXL', '2XL'),
    ]
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='shop/', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, default='N/A')
    available_sizes = models.CharField(max_length=255, blank=True, help_text="Comma-separated list of available sizes")
    in_stock = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def get_image_url(self):
        if self.image:
            return self.image.url
        return None

class ShopDetails(models.Model):
    shop = models.ForeignKey(ShopItems, on_delete=models.CASCADE, related_name='details')  # Updated ForeignKey reference
    detail = models.TextField()

    def __str__(self):
        return f"Details of {self.shop.name}"

class Order(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, default='pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(ShopItems, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

class Cart(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart of {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(ShopItems, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

class Review(models.Model):
    product = models.ForeignKey(ShopItems, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review by {self.user.username} for {self.product.name}"
