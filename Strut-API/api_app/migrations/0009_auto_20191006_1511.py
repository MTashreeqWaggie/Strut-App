# Generated by Django 2.2.4 on 2019-10-06 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0008_auto_20191006_1443'),
    ]

    operations = [
        migrations.AlterField(
            model_name='module',
            name='moduleName',
            field=models.CharField(max_length=100),
        ),
    ]
