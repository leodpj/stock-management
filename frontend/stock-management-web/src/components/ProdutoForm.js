// src/components/ProdutoForm.js

import React, { useState } from 'react';
import api from '../services/api'; // Assumindo que o arquivo api.js está configurado para fazer requisições

function ProdutoForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Montar o objeto do produto
    const produtoData = {
      nome,
      descricao,
      preco: parseFloat(preco),  // Converte o preço para número
      quantidade_estoque: parseInt(quantidade, 10),  // Converte a quantidade para número
    };

    try {
      const token = localStorage.getItem('access_token');  // Recupera o token JWT
      const response = await api.post('/produtos/', produtoData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
          'Content-Type': 'application/json',
        },
      });

      // Exibe uma mensagem de sucesso e limpa o formulário
      setMessage('Produto adicionado com sucesso!');
      setNome('');
      setDescricao('');
      setPreco('');
      setQuantidade('');
    } catch (error) {
      setMessage('Erro ao adicionar o produto. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="produto-form-container">
      <h2>Adicionar Novo Produto</h2>
      {message && <p>{message}</p>} {/* Exibe a mensagem de sucesso ou erro */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Produto:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="preco">Preço (R$):</label>
          <input
            type="number"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantidade">Quantidade em Estoque:</label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
}

export default ProdutoForm;
