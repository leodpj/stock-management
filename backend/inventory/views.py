from django.shortcuts import render, get_object_or_404, redirect
from .models import Produto, Entrada, Saida, Pedido, Orcamento
from .forms import ProdutoForm, EntradaForm, SaidaForm, PedidoForm, OrcamentoForm
from rest_framework import viewsets
from .serializers import ProdutoSerializer, EntradaSerializer, SaidaSerializer, PedidoSerializer, OrcamentoSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

def listar_produtos(request):
    produtos = Produto.objects.all()
    return render(request, 'inventory/produtos_list.html', {'produtos': produtos})

def criar_produto(request):
    if request.method == 'POST':
        form = ProdutoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_produtos')
    else:
        form = ProdutoForm()
    return render(request, 'inventory/produto_form.html', {'form': form})

def registrar_entrada(request):
    if request.method == 'POST':
        form = EntradaForm(request.POST, request.FILES)
        if form.is_valid():
            entrada = form.save(commit=False)
            produto = entrada.produto
            produto.quantidade_estoque += entrada.quantidade
            produto.save()
            entrada.save()
            return redirect('listar_produtos')
    else:
        form = EntradaForm()
    return render(request, 'inventory/entrada_form.html', {'form': form})

def registrar_saida(request):
    if request.method == 'POST':
        form = SaidaForm(request.POST)
        if form.is_valid():
            saida = form.save(commit=False)
            produto = saida.produto
            produto.quantidade_estoque -= saida.quantidade
            produto.save()
            saida.save()
            return redirect('listar_produtos')
    else:
        form = SaidaForm()
    return render(request, 'inventory/saida_form.html', {'form': form})

def listar_pedidos(request):
    pedidos = Pedido.objects.all()
    return render(request, 'inventory/pedidos_list.html', {'pedidos': pedidos})

def criar_pedido(request):
    if request.method == 'POST':
        form = PedidoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_pedidos')
    else:
        form = PedidoForm()
    return render(request, 'inventory/pedido_form.html', {'form': form})

def listar_orcamentos(request):
    orcamentos = Orcamento.objects.all()
    return render(request, 'inventory/orcamentos_list.html', {'orcamentos': orcamentos})

def criar_orcamento(request):
    if request.method == 'POST':
        form = OrcamentoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_orcamentos')
    else:
        form = OrcamentoForm()
    return render(request, 'inventory/orcamento_form.html', {'form': form})

# inventory/views.py

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

class EntradaViewSet(viewsets.ModelViewSet):
    queryset = Entrada.objects.all()
    serializer_class = EntradaSerializer

class SaidaViewSet(viewsets.ModelViewSet):
    queryset = Saida.objects.all()
    serializer_class = SaidaSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class OrcamentoViewSet(viewsets.ModelViewSet):
    queryset = Orcamento.objects.all()
    serializer_class = OrcamentoSerializer
