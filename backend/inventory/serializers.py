from rest_framework import serializers
from .models import Produto, Entrada, Saida, Pedido, Orcamento, Cliente, Fornecedor
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

class EntradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrada
        fields = '__all__'

class SaidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saida
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class OrcamentoSerializer(serializers.ModelSerializer):
    valor_unitario = serializers.FloatField()  # Converte para float

    class Meta:
        model = Orcamento
        fields = '__all__'  # Inclui todos os campos do modelo Orcamento

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = '__all__'


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Adicionar first_name e last_name ao token
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token
"""
        # Adiciona campos customizados no payload do token JWT
        token['username'] = user.username
        return token"""