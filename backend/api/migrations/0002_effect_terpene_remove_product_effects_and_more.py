# Generated by Django 5.1.5 on 2025-01-15 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
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
                ("description", models.CharField(max_length=255)),
            ],
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
        migrations.RemoveField(
            model_name="product",
            name="effects",
        ),
        migrations.RemoveField(
            model_name="product",
            name="terpenes",
        ),
        migrations.AddField(
            model_name="product",
            name="effects",
            field=models.ManyToManyField(related_name="products", to="api.effect"),
        ),
        migrations.AddField(
            model_name="product",
            name="terpenes",
            field=models.ManyToManyField(related_name="products", to="api.terpene"),
        ),
    ]
