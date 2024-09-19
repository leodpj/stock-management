// src/components/OrcamentoList.js

import React, { useState, useEffect } from 'react';
import './OrcamentoList.css';  // Estilos específicos para o orçamento (opcional)
import api from '../services/api';

function OrcamentoList() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [cliente, setCliente] = useState('');
  const [validade, setValidade] = useState('');
  const [especificacao, setEspecificacao] = useState('');
  const [metrosQuadrados, setMetrosQuadrados] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [status, setStatus] = useState('Pendente');  // Valor padrão para status
  const [message, setMessage] = useState('');

  // Função para buscar orçamentos do backend
  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const token = localStorage.getItem('access_token');  // Recupera o token JWT
        const response = await api.get('/orcamentos/', {
          headers: {
            Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
          },
        });
        setOrcamentos(response.data);
      } catch (error) {
        setMessage('Erro ao carregar os orçamentos.');
      }
    };

    fetchOrcamentos();  // Chama a função para buscar orçamentos ao carregar o componente
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
      especificacao,  // String
      metros_quadrados: parseFloat(metrosQuadrados) || null,  // Decimal
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
      setEspecificacao('');
      setMetrosQuadrados('');
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

      setOrcamentos(orcamentos.filter(orcamento => orcamento.id !== id));  // Remove o orçamento da lista
      setMessage('Orçamento excluído com sucesso!');
    } catch (error) {
      setMessage('Erro ao excluir o orçamento.');
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
          <label htmlFor="especificacao">Especificação:</label>
          <input
            type="text"
            id="especificacao"
            value={especificacao}
            onChange={(e) => setEspecificacao(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="metros_quadrados">Metros Quadrados:</label>
          <input
            type="number"
            id="metros_quadrados"
            value={metrosQuadrados}
            onChange={(e) => setMetrosQuadrados(e.target.value)}
            step="0.01"
          />
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
      <h2>Orçamentos</h2>
      <ul>
        {orcamentos.map((orcamento) => (
         // <li key={orcamento.id}>
           // {orcamento.descricao} - R$ {orcamento.valor.toFixed(2)}
           // <button onClick={() => handleDelete(orcamento.id)}>Excluir</button>
          //</li>
          <span></span>
        ))}
      </ul>
    </div>
  );
}

export default OrcamentoList;
