# Generated by Django 5.1.5 on 2025-01-16 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_remove_homefeature_icon_homefeature_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="category",
            field=models.CharField(
                choices=[
                    ("flower", "Flower"),
                    ("concentrates", "Concentrates"),
                    ("edibles", "Edibles"),
                    ("vapes", "Vapes"),
                    ("concentrates", "Concentrates"),
                    ("seeds", "Seeds"),
                ],
                max_length=20,
            ),
        ),
    ]
