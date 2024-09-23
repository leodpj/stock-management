# Generated by Django 5.1.1 on 2024-09-23 09:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0004_alter_orcamento_especificacao'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('telefone', models.CharField(blank=True, max_length=20, null=True)),
                ('endereco', models.CharField(blank=True, max_length=255, null=True)),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
