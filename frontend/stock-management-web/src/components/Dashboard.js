// src/components/Dashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';  // Estilos específicos para o login (opcional)

function Dashboard() {
  const firstName = localStorage.getItem('first_name');  // Recupera o primeiro nome
  const lastName = localStorage.getItem('last_name');    // Recupera o último nome
  const navigate = useNavigate();  // Hook para navegação

    // Função para realizar o logoff
    const handleLogoff = () => {
        // Remove o token JWT e o nome do usuário do localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
    
        // Redireciona o usuário para a página de login 
        navigate('/login');
      };


return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src="/hopesystem.webp" alt="Logo do Sistema" className="logo" />
        <h1>Bem-vindo(a), {firstName} {lastName}!</h1>  {/* Exibe o nome completo */}
        {/* Adiciona o botão de logoff */}
        <button onClick={handleLogoff} className="logoff-button">Logoff</button>
      </header>
      <nav className="dashboard-nav">
        <ul>
          <li><a href="/produtos">Gerenciar Produtos</a></li>
          <li><a href="/entradas">Registrar Entrada</a></li>
          <li><a href="/saidas">Registrar Saída</a></li>
          <li><a href="/pedidos">Gerenciar Pedidos</a></li>
          <li><a href="/orcamentos">Gerenciar Orçamentos</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
