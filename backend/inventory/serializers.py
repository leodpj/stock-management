from rest_framework import serializers
from .models import Produto, Entrada, Saida, Pedido, Orcamento, Cliente, Fornecedor, Item
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
"""
class OrcamentoSerializer(serializers.ModelSerializer):
    valor_unitario = serializers.FloatField()  # Converte para float

    class Meta:
        model = Orcamento
        fields = '__all__'  # Inclui todos os campos do modelo Orcamento
"""

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['descricao', 'especificacao', 'quantidade', 'valor_unitario', 'valor_total']

class OrcamentoSerializer(serializers.ModelSerializer):
    itens = ItemSerializer(many=True)  # Aninhando os itens

    class Meta:
        model = Orcamento
        fields = ['cliente', 'validade', 'descricao', 'valor_total', 'status', 'itens']

    def create(self, validated_data):
        itens_data = validated_data.pop('itens')  # Remove os itens dos dados validados
        orcamento = Orcamento.objects.create(**validated_data)  # Cria o orçamento
        for item_data in itens_data:
            Item.objects.create(orcamento=orcamento, **item_data)  # Cria os itens para o orçamento
        return orcamento


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

        # Adiciona first_name e last_name ao token
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token

"""
        # Adiciona campos customizados no payload do token JWT
        token['username'] = user.username
        return token"""