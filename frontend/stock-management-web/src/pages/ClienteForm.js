import React, { useState } from 'react';
import './OrcamentoList.css';
import api from '../services/api';

const ClienteForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const clienteData = {
      nome,
      email,
      telefone,
      endereco,
    };
      
    try {
      const token = localStorage.getItem('access_token');  // Recupera o token JWT
      const response = await api.post('/clientes/', clienteData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
          'Content-Type': 'application/json',
        },
      });
      // Caso a requisição tenha sucesso, você pode usar a resposta da API
      console.log('Produto criado com sucesso:', response.data);
      
      alert('Cliente cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setTelefone('');
      setEndereco('');
    } catch (err) {
      setError('Erro ao cadastrar o cliente.');
    }
  };

  return (
    <div className="orcamento-container"> 
      <h2>Cadastrar Cliente</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <div>
          <label>Endereço:</label>
          <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default ClienteForm;
