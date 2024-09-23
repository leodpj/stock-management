from django.contrib import admin
from .models import Produto, Entrada, Saida, Pedido, Orcamento, Cliente, Fornecedor

admin.site.register(Produto)
admin.site.register(Entrada)
admin.site.register(Saida)
admin.site.register(Pedido)
admin.site.register(Orcamento)
admin.site.register(Cliente)
admin.site.register(Fornecedor)