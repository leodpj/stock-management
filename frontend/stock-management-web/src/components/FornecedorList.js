import React, { useState, useEffect } from 'react';
import './OrcamentoList.css';  // Estilos específicos para o orçamento (opcional)
import api from '../services/api';
import { useNavigate } from 'react-router-dom';


function FornecedorList() {
  const [fornecedores, setFornecedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Carregar a lista de clientes da API ao montar o componente
  useEffect(() => {
    async function fetchFornecedores() {
      try {
        const token = localStorage.getItem('access_token');  // Recupera o token JWT do localStorage
        const response = await api.get('/fornecedores/', {
          headers: {
            Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
          },
        });

        setFornecedores(response.data);  // Armazena os clientes no estado
      } catch (error) {
        console.error('Erro ao carregar fornecedores:', error);
      }
    }

    fetchFornecedores();
  }, []);

  // Função para redirecionar para a página de cadastro de clientes
  const handleAddFornecedor = () => {
    navigate('/fornecedores/novo');  // Redireciona para a página de cadastro de clientes
  };

  // Função para redirecionar para a página de edição de um cliente
  const handleEditFornecedor = (id) => {
    navigate(`/fornecedores/editar/${id}`);  // Redireciona para a página de edição do cliente
  };

  // Filtro de busca baseado no nome do cliente
  const filteredFornecedors = fornecedores.filter((fornecedor) =>
    fornecedor.razao_social.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orcamento-container">
      <h1>Lista de Fornecedores</h1>

      {/* Campo de busca para filtrar clientes */}
      <input
        type="text"
        placeholder="Buscar forncedor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Botão para cadastrar novo cliente */}
      <button onClick={handleAddFornecedor}>Cadastrar Novo Fornecedor</button>

      {/* Renderizar a lista filtrada de clientes */}
      <ul>
        {filteredFornecedors.map((fornecedor) => (
          <li key={fornecedor.id}>
            <p>Nome: {fornecedor.razao_social}</p>
            <p>Email: {fornecedor.email}</p>
            <button onClick={() => handleEditFornecedor(fornecedor.id)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FornecedorList;
