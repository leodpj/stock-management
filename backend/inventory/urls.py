from django.urls import path
from . import views
from .views import CustomTokenObtainPairView


urlpatterns = [
    path('produtos/', views.listar_produtos, name='listar_produtos'),
    path('produtos/novo/', views.criar_produto, name='criar_produto'),
    path('entradas/nova/', views.registrar_entrada, name='registrar_entrada'),
    path('saidas/nova/', views.registrar_saida, name='registrar_saida'),
    path('pedidos/', views.listar_pedidos, name='listar_pedidos'),
    path('pedidos/novo/', views.criar_pedido, name='criar_pedido'),
    path('orcamentos/', views.listar_orcamentos, name='listar_orcamentos'),
    path('orcamentos/novo/', views.criar_orcamento, name='criar_orcamento'),
]
