from django.shortcuts import render, get_object_or_404, redirect
from .models import Produto, Entrada, Saida, Pedido, Orcamento, Cliente, Fornecedor
from .forms import ProdutoForm, EntradaForm, SaidaForm, PedidoForm, OrcamentoForm, ClienteForm, FornecedorForm
from rest_framework import viewsets
from .serializers import ProdutoSerializer, EntradaSerializer, SaidaSerializer, PedidoSerializer, CustomTokenObtainPairSerializer, OrcamentoSerializer, ClienteSerializer, FornecedorSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

class OrcamentoList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Lógica para retornar os orçamentos
        pass

############## NEW EMAIL
from django.core.mail import send_mail
from rest_framework.decorators import action
from rest_framework.response import Response


class OrcamentoViewSet(viewsets.ModelViewSet):
    queryset = Orcamento.objects.all()
    serializer_class = OrcamentoSerializer

    # Custom action to send email
    @action(detail=True, methods=['post'])
    def enviar_email(self, request, pk=None):
        orcamento = self.get_object()

        # Enviar email com os detalhes do orçamento
        send_mail(
          f'Orçamento para {orcamento.cliente}',
          f'Detalhes do orçamento:\n\nEspecificação: {orcamento.especificacao}\nQuantidade: {orcamento.quantidade}\nValor Total: R$ {orcamento.valor_total}',
          'seuemail@gmail.com',  # Email de origem
          ['cliente@gmail.com'],  # Email de destino (você pode adicionar o email do cliente aqui)
          fail_silently=False,
        )

        return Response({'status': 'email enviado'})
#########################

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


def listar_clientes(request):
    clientes = Cliente.objects.all()
    return render(request, 'inventory/clientes_list.html', {'cliente': clientes})

def criar_cliente(request):
    if request.method == 'POST':
        form = ClienteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_clientes')
    else:
        form = ClienteForm()
    return render(request, 'inventory/cliente_form.html', {'form': form})

def listar_fornecedores(request):
    fornecedores = Fornecedor.objects.all()
    return render(request, 'inventory/fornecedor_list.html', {'fornecedores': fornecedores})

def criar_fornecedor(request):
    if request.method == 'POST':
        form = FornecedorForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_fornecedores')
    else:
        form = FornecedorForm()
    return render(request, 'inventory/fornecedor_form.html', {'form': form})

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

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all().order_by('-data_criacao')
    serializer_class = ClienteSerializer

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all().order_by('-data_criacao')
    serializer_class = FornecedorSerializer
