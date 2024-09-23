import React, { useState, useEffect } from 'react';
import './OrcamentoList.css';  // Estilos específicos para o orçamento (opcional)
import api from '../services/api';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get('/clientes/');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao carregar os clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.email} - {cliente.telefone} - {cliente.endereco}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteList;
