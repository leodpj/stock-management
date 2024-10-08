from django import forms
from .models import Produto, Entrada, Saida, Pedido, Orcamento, Cliente, Fornecedor


class ProdutoForm(forms.ModelForm):
    class Meta:
        model = Produto
        fields = ['nome', 'descricao', 'preco', 'quantidade_estoque']

class EntradaForm(forms.ModelForm):
    class Meta:
        model = Entrada
        fields = ['produto', 'quantidade', 'fornecedor', 'nota_fiscal']

class SaidaForm(forms.ModelForm):
    class Meta:
        model = Saida
        fields = ['produto', 'quantidade', 'destinatario', 'motivo']

class PedidoForm(forms.ModelForm):
    class Meta:
        model = Pedido
        fields = ['cliente', 'status', 'valor_total']

class OrcamentoForm(forms.ModelForm):
    class Meta:
        model = Orcamento
        fields = ['cliente', 'validade', 'descricao', 'valor_total', 'status']


class ClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['nome', 'email', 'telefone', 'endereco']


class FornecedorForm(forms.ModelForm):
    class Meta:
        model = Fornecedor
        fields = ['razao_social', 'nome_fantasia', 'email', 'telefone', 'cnpj', 'endereco']