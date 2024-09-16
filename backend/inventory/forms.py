from django import forms
from .models import Produto, Entrada, Saida, Pedido, Orcamento

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
        fields = ['cliente', 'validade', 'status', 'especificacao', 'metros_quadrados', 'quantidade', 'valor_unitario', 'valor_total']

