from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from inventory import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register(r'produtos', views.ProdutoViewSet)
router.register(r'entradas', views.EntradaViewSet)
router.register(r'saidas', views.SaidaViewSet)
router.register(r'pedidos', views.PedidoViewSet)
router.register(r'orcamentos', views.OrcamentoViewSet, basename='orcamento')
router.register(r'clientes', views.ClienteViewSet)
router.register(r'fornecedores', views.FornecedorViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('inventory.urls')),
    path('api/', include(router.urls)),
    path('api/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
