# Generated by Django 5.1.1 on 2024-10-08 14:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0009_alter_orcamento_especificacao_alter_orcamento_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orcamento',
            name='data_orcamento',
        ),
        migrations.RemoveField(
            model_name='orcamento',
            name='especificacao',
        ),
        migrations.RemoveField(
            model_name='orcamento',
            name='quantidade',
        ),
        migrations.RemoveField(
            model_name='orcamento',
            name='valor_unitario',
        ),
        migrations.AlterField(
            model_name='orcamento',
            name='cliente',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='orcamento',
            name='status',
            field=models.CharField(choices=[('Pendente', 'Pendente'), ('Aprovado', 'Aprovado'), ('Rejeitado', 'Rejeitado')], max_length=20),
        ),
        migrations.AlterField(
            model_name='orcamento',
            name='valor_total',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descricao', models.CharField(max_length=255)),
                ('especificacao', models.CharField(choices=[('UND', 'UND'), ('M²', 'M²')], max_length=20)),
                ('quantidade', models.IntegerField()),
                ('valor_unitario', models.DecimalField(decimal_places=2, max_digits=10)),
                ('valor_total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('orcamento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='itens', to='inventory.orcamento')),
            ],
        ),
    ]
