import React, { useState, useEffect } from 'react';
import './OrcamentoList.css'; 
import api from '../services/api';
import { useNavigate } from 'react-router-dom';


function FornecedorList() {
  const [fornecedores, setFornecedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFornecedores() {
      try {
        const token = localStorage.getItem('access_token'); 
        const response = await api.get('/fornecedores/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao carregar fornecedores:', error);
      }
    }

    fetchFornecedores();
  }, []);

  const handleAddFornecedor = () => {
    navigate('/fornecedores/novo');
  };
  
  const handleEditFornecedor = (id) => {
    navigate(`/fornecedores/editar/${id}`);
  };

   const filteredFornecedors = fornecedores.filter((fornecedor) =>
    fornecedor.razao_social.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orcamento-container">
      <h1>Lista de Fornecedores</h1>

      <input
        type="text"
        placeholder="Buscar forncedor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <button onClick={handleAddFornecedor}>Cadastrar Novo Fornecedor</button>
      
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
