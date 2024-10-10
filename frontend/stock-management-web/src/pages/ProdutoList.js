import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ProdutoList.css';
import api from '../services/api';

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
 
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get('/produtos/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProdutos(response.data);
      } catch (error) {
        setError('Erro ao carregar os produtos.');
      }
    };

    fetchProdutos(); 
  }, []);
  
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="produto-list-container">
      <h1>Lista de Produtos</h1>      

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
