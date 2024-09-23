import React, { useState } from 'react';
import './OrcamentoList.css';  // Estilos específicos para o orçamento (opcional)
import api from '../services/api';

const ForncedorForm = () => {
  const [razao_social, setRazao_social] = useState('');
  const [nome_fantasia, setNome_fantasia] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/fornecedor/', {
        razao_social,
        nome_fantasia,
        email,
        telefone,
        cnpj,
        endereco,
      });
      alert('Fornecedor cadastrado com sucesso!');
      setRazao_social('');
      setNome_fantasia('');
      setEmail('');
      setTelefone('');
      setCnpj('');
      setEndereco('');
    } catch (err) {
      setError('Erro ao cadastrar o Fornecedor.');
    }
  };

  return (
    <div className="orcamento-container">
      <h2>Cadastrar Fornecedor</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Razao Social:</label>
          <input type="text" value={razao_social} onChange={(e) => setRazao_social(e.target.value)} required />
        </div>
        <div>
          <label>Nome Fantasia:</label>
          <input type="text" value={nome_fantasia} onChange={(e) => setNome_fantasia(e.target.value)} required />
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
          <label>CNPJ:</label>
          <input type="text" value={telefone} onChange={(e) => setCnpj(e.target.value)} />
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

export default ForncedorForm;
