import React, { useState, useEffect } from 'react';
import './OrcamentoList.css';  // Estilos específicos para o orçamento (opcional)
import api from '../services/api';
import { useNavigate } from 'react-router-dom';


function ClientList() {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Carregar a lista de clientes da API ao montar o componente
  useEffect(() => {
    async function fetchClientes() {
      try {
        const token = localStorage.getItem('access_token');  // Recupera o token JWT do localStorage
        const response = await api.get('/clientes/', {
          headers: {
            Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
          },
        });

        setClientes(response.data);  // Armazena os clientes no estado
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    }

    fetchClientes();
  }, []);

  // Função para redirecionar para a página de cadastro de clientes
  const handleAddClient = () => {
    navigate('/clientes/novo');  // Redireciona para a página de cadastro de clientes
  };

  // Função para redirecionar para a página de edição de um cliente
  const handleEditClient = (id) => {
    navigate(`/clientes/editar/${id}`);  // Redireciona para a página de edição do cliente
  };

  // Filtro de busca baseado no nome do cliente
  const filteredClients = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orcamento-container">
      <h1>Lista de Clientes</h1>

      {/* Campo de busca para filtrar clientes */}
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Botão para cadastrar novo cliente */}
      <button onClick={handleAddClient}>Cadastrar Novo Cliente</button>

      {/* Renderizar a lista filtrada de clientes */}
      <ul>
        {filteredClients.map((cliente) => (
          <li key={cliente.id}>
            <p>Nome: {cliente.nome}</p>
            <p>Email: {cliente.email}</p>
            <button onClick={() => handleEditClient(cliente.id)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
