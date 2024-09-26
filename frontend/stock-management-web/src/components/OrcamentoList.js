// src/components/OrcamentoList.js

import React, { useState, useEffect, useRef } from 'react';
import './OrcamentoList.css';  // Estilos específicos para o orçamento (opcional)
import api from '../services/api';

function OrcamentoList() {
  const [orcamentos, setOrcamentos] = useState([]);  // Inicializar com um array vazio
  const [cliente, setCliente] = useState('');
  const [validade, setValidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [especificacao, setEspecificacao] = useState('UND');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [status, setStatus] = useState('Pendente');  // Valor padrão para status
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
    const calcularValorTotal = () => {
      return parseFloat(quantidade || 0) * parseFloat(valorUnitario || 0);
    };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoOrcamento = {
      cliente,  // String
      validade,  // Data no formato "YYYY-MM-DD"
      descricao, // String
      especificacao,  // String: "UND", "M²"
      quantidade: parseInt(quantidade, 10) || null,  // Inteiro
      valor_unitario: parseFloat(valorUnitario) || null,  // Decimal
      valor_total: calcularValorTotal(),  // Decimal calculado
      status,  // String: "Pendente", "Aprovado" ou "Rejeitado"
    };

    try {
      const token = localStorage.getItem('access_token');  // Recupera o token JWT
      const response = await api.post('/orcamentos/', novoOrcamento, {
        headers: {
          Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
          'Content-Type': 'application/json',
        },
      });

      setOrcamentos([...orcamentos, response.data]);  // Atualiza a lista de orçamentos com o novo
      setCliente('');
      setValidade('');
      setDescricao('');
      setEspecificacao('UND');
      setQuantidade('');
      setValorUnitario('');
      setStatus('Pendente');
      setMessage('Orçamento adicionado com sucesso!');
    } catch (error) {
      setMessage('Erro ao adicionar o orçamento.');
      console.error(error.response.data);  // Verifica a mensagem de erro no console
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
const handlePrint = (orcamento) => {
  const printContents = `
    <h1>Orçamento de ${orcamento.cliente}</h1>
    <p>Descrição: ${orcamento.descricao}</p>
    <p>Especificação: ${orcamento.especificacao}</p>
    <p>Quantidade: ${orcamento.quantidade}</p>
    <p>Valor Unitário: R$ ${orcamento.valor_unitario.toFixed(2)}</p>
    <p>Valor Total: R$ ${orcamento.quantidade * orcamento.valor_unitario.toFixed(2)}</p>
    <p>Status: ${orcamento.status}</p>
  `;
  
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Imprimir Orçamento</title>');
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
          <label htmlFor="especificacao">Especificacao:</label>
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
      <div ref={printRef}>
        {/* Conteúdo do orçamento que deseja imprimir */}
        <h1>Orçamento</h1>
        <p>Detalhes do orçamento...</p>
      </div>
      <button onClick={handlePrint}>Imprimir</button>
    </div>

  );
}

export default OrcamentoList;
