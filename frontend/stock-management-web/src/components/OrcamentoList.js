// src/components/OrcamentoList.js

import React, { useState, useEffect, useRef } from 'react';
import './OrcamentoList.css';  // Estilos específicos para o orçamento (opcional)
import api from '../services/api';


function OrcamentoList() {
  const [orcamentos, setOrcamentos] = useState([]);  // Inicializar com um array vazio
  const [itens, setItens] = useState([]);  // Para armazenar os itens adicionados
  const [cliente, setCliente] = useState('');
  const [validade, setValidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [especificacao, setEspecificacao] = useState('UND');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [message, setMessage] = useState('');

  const printRef = useRef();

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get('/orcamentos/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Dados recebidos:', response.data);  // Verificar os dados recebidos
        setOrcamentos(response.data);  // Verifica se está atribuindo um array
      } catch (error) {
        setMessage('Erro ao carregar os orçamentos.');
        console.error(error);
      }
    };

    fetchOrcamentos();
  }, []);


   
  // Função para calcular o valor total automaticamente
  const calcularValorTotalItem  = () => {
    return parseFloat(quantidade || 0) * parseFloat(valorUnitario || 0);
  };


// Função para adcionar orçamento

const adicionarItem = () => {
  if (descricao && quantidade > 0 && valorUnitario > 0) {
    const novoItem = {
      descricao,
      especificacao,
      quantidade,
      valor_unitario: parseFloat(valorUnitario),
      valor_total: parseFloat(quantidade) * parseFloat(valorUnitario)
    };

    setItens([...itens, novoItem]);
    
    // Limpar os campos após adicionar o item
    setDescricao('');
    setEspecificacao('UND');
    setQuantidade('');
    setValorUnitario('');
  } else {
    alert("Preencha todos os campos corretamente!");
  }
};


const calcularValorTotal = () => {
  return itens.reduce((total, item) => total + parseFloat(item.valor_total), 0).toFixed(2);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the payload to send to the backend
    const novoOrcamento = {
      cliente,  // String
      validade,  // Data no formato "YYYY-MM-DD"
      descricao,  // String
      valor_total: calcularValorTotal(),  // Decimal calculado
      status,  // String: "Pendente", "Aprovado" ou "Rejeitado"
      itens: itens.map((item) => ({  // Transforme a lista de itens para o formato correto
        descricao: item.descricao,  // String
        especificacao: item.especificacao,  // String: "UND", "M²"
        quantidade: parseInt(item.quantidade, 10),  // Inteiro
        valor_unitario: parseFloat(item.valor_unitario),  // Decimal
        valor_total: parseFloat(item.valor_total),  // Decimal
      })),
    };
  
    // Validação manual para garantir que `itens` não está vazio e `valor_unitario` seja válido
    if (itens.length === 0) {
      setMessage("Por favor, adicione ao menos um item ao orçamento.");
      return;  // Interrompe a execução se não houver itens
    }
  
    try {
      const token = localStorage.getItem('access_token');  // Recupera o token JWT
  
      // Envia a requisição para o backend
      const response = await api.post('/orcamentos/', novoOrcamento, {
        headers: {
          Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
          'Content-Type': 'application/json',
        },
      });
  
      // Atualiza o estado do frontend
      setOrcamentos([...orcamentos, response.data]);  // Atualiza a lista de orçamentos
      setCliente('');
      setValidade('');
      setDescricao('');
      setEspecificacao('UND');
      setQuantidade('');
      setValorUnitario('');
      setStatus('Pendente');
      setItens([]);  // Limpa os itens após o envio
      setMessage('Orçamento adicionado com sucesso!');
    } catch (error) {
      setMessage('Erro ao adicionar o orçamento.');
      console.error(error.response ? error.response.data : error);
    }
  };
 
  
  

  // Função para excluir um orçamento
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');  // Recupera o token JWT
      await api.delete(`/orcamentos/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
        },
      });

      // Atualiza a lista de orçamentos após a exclusão
      setOrcamentos(orcamentos.filter((orcamento) => orcamento.id !== id));
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error);
      alert('Falha ao excluir o orçamento. Tente novamente.');
    }
  };

  // Função para imprimir o orçamento
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Imprimir Orçamento</title>');
    printWindow.document.write('<style>@media print { body { font-family: Arial, sans-serif; } .no-print { display: none; } }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  

  // Função para enviar o orçamento por email
  const handleEmail = async (orcamento) => {
    try {
      const token = localStorage.getItem('access_token');  // Recupera o token JWT
      const response = await api.post(`/orcamentos/${orcamento.id}/enviar-email/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Caso a requisição tenha sucesso, você pode usar a resposta da API
      console.log('Produto criado com sucesso:', response.data);

      setMessage(`Orçamento enviado por email para ${orcamento.cliente}.`);
    } catch (error) {
      setMessage('Erro ao enviar o orçamento por email.');
    }
  };

  const removerItem = (index) => {
    const novaLista = itens.filter((item, i) => i !== index);
    setItens(novaLista);  // Atualiza a lista de itens
  };
  


  return (
    <div className="orcamento-container">
      <h1>Gerenciar Orçamentos</h1>
      {message && <p>{message}</p>}
  
      {/* Formulário para adicionar novos orçamentos */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cliente">Cliente:</label>
          <input
            type="text"
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="validade">Validade:</label>
          <input
            type="date"
            id="validade"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="especificacao">Especificação:</label>
          <select
            id="status"
            value={especificacao}
            onChange={(e) => setEspecificacao(e.target.value)}
          >
            <option value="UND">UND</option>
            <option value="M²">M²</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="valor_unitario">Valor Unitário (R$):</label>
          <input
            type="number"
            id="valor_unitario"
            value={valorUnitario}
            onChange={(e) => setValorUnitario(e.target.value)}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pendente">Pendente</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Rejeitado">Rejeitado</option>
          </select>
        </div>
  
        <button type="button" onClick={adicionarItem}>Adicionar Item</button><p></p>
        
        {/* Exibir a lista de itens adicionados */}
        <ul>
          {itens.map((item, index) => (
            <li key={index}>
              {item.descricao} - {item.quantidade} {item.especificacao} - R$ {item.valor_unitario} - Total: R$ {item.valor_total}
              <button type="button" onClick={() => removerItem(index)}>Remover</button>
            </li>
          ))}
        </ul>
  
        {/* Botão para enviar o orçamento com os itens */}
        <button type="submit">Adicionar Orçamento</button>
      </form>
  
      {/* Lista de orçamentos */}
      <ul>
        {Array.isArray(orcamentos) && orcamentos.length > 0 ? (
          orcamentos.map((orcamento) => (
            <li key={orcamento.id}>
              {orcamento.cliente} - R$ {typeof orcamento.valor_total === 'number' ? orcamento.valor_total.toFixed(2) : ''} {orcamento.valor_total}  - {orcamento.status}
              <button onClick={() => handlePrint(orcamento)}>Imprimir</button>
              <button onClick={() => handleEmail(orcamento)}>Enviar por Email</button>
              <button onClick={() => handleDelete(orcamento.id)}>Excluir</button>
            </li>
          ))
        ) : (
          <p>Nenhum orçamento encontrado.</p>
        )}
      </ul>
    </div>
  );
  
}

export default OrcamentoList;
