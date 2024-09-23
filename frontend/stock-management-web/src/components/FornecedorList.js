import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FornecedorList = () => {
  const [Fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await api.get('/fornecedor/');
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao carregar os clientes:', error);
      }
    };

    fetchFornecedores();
  }, []);

  return (
    <div>
      <h2>Lista de Fornecedores</h2>
      <ul>
        {Fornecedores.map(Fornecedor => (
          <li key={Fornecedor.id}>
            {Fornecedor.nome} - {Fornecedor.email} - {Fornecedor.telefone} - {Fornecedor.endereco}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FornecedorList;
