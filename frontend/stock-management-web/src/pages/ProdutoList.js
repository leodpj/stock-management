// src/components/ProdutoList.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa o hook para navegação
import './ProdutoList.css';  // Estilos específicos para o login (opcional)
import api from '../services/api';

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook para navegação

  useEffect(() => {
    // Função para buscar os produtos da API
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem('access_token');  // Recupera o token JWT do localStorage
        const response = await api.get('/produtos/', {
          headers: {
            Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
          },
        });
        setProdutos(response.data);
      } catch (error) {
        setError('Erro ao carregar os produtos.');
      }
    };

    fetchProdutos();  // Chama a função ao carregar o componente
  }, []);

  // Exibir uma mensagem de erro, se houver
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="produto-list-container">
      <h1>Lista de Produtos</h1>
      
      {/* Botão para adicionar um novo produto */}
      <button onClick={() => navigate('/produtos/novo')} className="novo-produto-button">
        Novo Produto
      </button>

      {produtos.length === 0 ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              {produto.nome} - R$ {produto.preco}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProdutoList;
