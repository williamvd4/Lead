# Generated by Django 5.1.5 on 2025-01-23 18:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="CoreValue",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("icon", models.CharField(max_length=50)),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="Effect",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="HomeCarouselItem",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "admin_title",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("image", models.ImageField(upload_to="home_carousel/")),
                ("title", models.CharField(blank=True, max_length=255, null=True)),
                ("description", models.TextField(blank=True, null=True)),
                ("order", models.PositiveIntegerField(default=0)),
                (
                    "link_page",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("/about", "About"),
                            ("/products", "Products"),
                            ("/retailers", "Retailers"),
                            ("/lab-results", "Lab Results"),
                            ("/cultivation", "Cultivation"),
                        ],
                        max_length=255,
                        null=True,
                    ),
                ),
                ("make_active", models.BooleanField(default=False)),
            ],
            options={
                "ordering": ["order"],
            },
        ),
        migrations.CreateModel(
            name="HomeFeature",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(null=True, upload_to="home-features")),
                ("title", models.CharField(blank=True, max_length=255)),
                ("description", models.TextField()),
                ("order", models.PositiveIntegerField(blank=True, default=0)),
                ("make_active", models.BooleanField(default=False)),
            ],
            options={
                "ordering": ["order"],
            },
        ),
        migrations.CreateModel(
            name="Terpene",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("flower", "Flower"),
                            ("preroll", "Preroll"),
                            ("concentrates", "Concentrates"),
                            ("edibles", "Edibles"),
                            ("vapes", "Vapes"),
                        ],
                        max_length=20,
                    ),
                ),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("Sativa", "Sativa"),
                            ("Indica", "Indica"),
                            ("Hybrid", "Hybrid"),
                        ],
                        max_length=20,
                    ),
                ),
                ("thc", models.DecimalField(decimal_places=2, max_digits=5)),
                ("cbd", models.DecimalField(decimal_places=2, max_digits=5)),
                ("image", models.ImageField(upload_to="products/")),
                ("description", models.TextField(blank=True)),
                ("make_active", models.BooleanField(default=False)),
                (
                    "effects",
                    models.ManyToManyField(
                        blank=True, related_name="products", to="api.effect"
                    ),
                ),
                (
                    "terpenes",
                    models.ManyToManyField(
                        blank=True, related_name="products", to="api.terpene"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="LabResult",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("batch_number", models.CharField(max_length=50)),
                (
                    "thc",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=5, null=True
                    ),
                ),
                (
                    "cbd",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=5, null=True
                    ),
                ),
                ("date", models.DateField()),
                ("lab", models.CharField(max_length=255)),
                ("pdf", models.FileField(upload_to="lab_results/")),
                ("make_active", models.BooleanField(default=False)),
                (
                    "product",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="lab_results",
                        to="api.product",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Retailer",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("logo", models.ImageField(upload_to="retailers/")),
                ("address", models.CharField(max_length=255)),
                ("url", models.URLField()),
                ("make_active", models.BooleanField(default=False)),
                ("products", models.ManyToManyField(to="api.product")),
            ],
        ),
    ]
