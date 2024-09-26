from django.db import models

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade_estoque = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.nome


class Entrada(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField()
    data_entrada = models.DateField(auto_now_add=True)
    fornecedor = models.CharField(max_length=100, blank=True, null=True)
    nota_fiscal = models.FileField(upload_to='notas_fiscais/', blank=True, null=True)

    def __str__(self):
        return f"{self.quantidade} unidades de {self.produto.nome}"


class Saida(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField()
    data_saida = models.DateField(auto_now_add=True)
    destinatario = models.CharField(max_length=100)
    motivo = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.quantidade} unidades de {self.produto.nome} para {self.destinatario}"


class Pedido(models.Model):
    STATUS_CHOICES = [
        ('Pendente', 'Pendente'),
        ('Em Processamento', 'Em Processamento'),
        ('Enviado', 'Enviado'),
    ]
    cliente = models.CharField(max_length=100)
    data_pedido = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pendente')
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Pedido #{self.id} para {self.cliente}"


class Orcamento(models.Model):
    cliente = models.CharField(max_length=100)
    data_orcamento = models.DateField(auto_now_add=True)  # Este campo é preenchido automaticamente
    validade = models.DateField()
    descricao = models.TextField(blank=True, null=True)
    especificacao = models.CharField(
        max_length=20,
        choices=[('UND', 'UND'), ('M²', 'M²')],
        default='UND'
    )
    quantidade = models.PositiveIntegerField(blank=True, null=True)
    valor_unitario = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    valor_total = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.CharField(
    max_length = 20,
    choices = [('Aprovado', 'Aprovado'), ('Pendente', 'Pendente'), ('Rejeitado', 'Rejeitado')],
    default = 'Pendente'
    )

    def save(self, *args, **kwargs):
        # Se metros_quadrados e valor_unitario existirem, calcular o valor total
        if self.quantidade is not None and self.valor_unitario is not None:
            self.valor_total = self.quantidade * self.valor_unitario
        else:
            self.valor_total = None  # Se faltar algum valor, o total fica indefinido
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Orçamento de {self.cliente} - {self.status}'


class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    endereco = models.CharField(max_length=255, blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

from django.db import models

class Fornecedor(models.Model):
    razao_social = models.CharField(max_length=100)
    nome_fantasia = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    cnpj = models.CharField(max_length=14, unique=True)
    endereco = models.CharField(max_length=255, blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome_fantasia
