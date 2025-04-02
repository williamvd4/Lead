from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Order, OrderItem, Cart, CartItem, Review, ShopItems

class OrderModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.shop_item = ShopItems.objects.create(name='Test Item', price=10.00, description='Test Description')
        self.order = Order.objects.create(user=self.user, total_price=10.00)
        self.order_item = OrderItem.objects.create(order=self.order, product=self.shop_item, quantity=1, price=10.00)

    def test_order_creation(self):
        self.assertEqual(self.order.user.username, 'testuser')
        self.assertEqual(self.order.total_price, 10.00)

    def test_order_item_creation(self):
        self.assertEqual(self.order_item.order, self.order)
        self.assertEqual(self.order_item.product, self.shop_item)
        self.assertEqual(self.order_item.quantity, 1)
        self.assertEqual(self.order_item.price, 10.00)

class CartModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.shop_item = ShopItems.objects.create(name='Test Item', price=10.00, description='Test Description')
        self.cart = Cart.objects.create(user=self.user)
        self.cart_item = CartItem.objects.create(cart=self.cart, product=self.shop_item, quantity=1)

    def test_cart_creation(self):
        self.assertEqual(self.cart.user.username, 'testuser')

    def test_cart_item_creation(self):
        self.assertEqual(self.cart_item.cart, self.cart)
        self.assertEqual(self.cart_item.product, self.shop_item)
        self.assertEqual(self.cart_item.quantity, 1)

class ReviewModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.shop_item = ShopItems.objects.create(name='Test Item', price=10.00, description='Test Description')
        self.review = Review.objects.create(product=self.shop_item, user=self.user, rating=5, comment='Great product!')

    def test_review_creation(self):
        self.assertEqual(self.review.product, self.shop_item)
        self.assertEqual(self.review.user.username, 'testuser')
        self.assertEqual(self.review.rating, 5)
        self.assertEqual(self.review.comment, 'Great product!')

class OrderViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)
        self.shop_item = ShopItems.objects.create(name='Test Item', price=10.00, description='Test Description')
        self.order = Order.objects.create(user=self.user, total_price=10.00)
        self.order_item = OrderItem.objects.create(order=self.order, product=self.shop_item, quantity=1, price=10.00)

    def test_get_orders(self):
        response = self.client.get('/api/orders/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_order(self):
        data = {
            'user': self.user.id,
            'total_price': 20.00,
            'items': [
                {
                    'product': self.shop_item.id,
                    'quantity': 2,
                    'price': 10.00
                }
            ]
        }
        response = self.client.post('/api/orders/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class CartViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)
        self.shop_item = ShopItems.objects.create(name='Test Item', price=10.00, description='Test Description')
        self.cart = Cart.objects.create(user=self.user)
        self.cart_item = CartItem.objects.create(cart=self.cart, product=self.shop_item, quantity=1)

    def test_get_cart(self):
        response = self.client.get('/api/carts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_add_to_cart(self):
        data = {
            'cart': self.cart.id,
            'product': self.shop_item.id,
            'quantity': 2
        }
        response = self.client.post('/api/cart-items/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class ReviewViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)
        self.shop_item = ShopItems.objects.create(name='Test Item', price=10.00, description='Test Description')
        self.review = Review.objects.create(product=self.shop_item, user=self.user, rating=5, comment='Great product!')

    def test_get_reviews(self):
        response = self.client.get('/api/reviews/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_review(self):
        data = {
            'product': self.shop_item.id,
            'user': self.user.id,
            'rating': 4,
            'comment': 'Good product!'
        }
        response = self.client.post('/api/reviews/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
