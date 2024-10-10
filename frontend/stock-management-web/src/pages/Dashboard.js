import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaArrowRight, FaArrowLeft, FaClipboardList, FaFileInvoiceDollar, FaUsers, FaTruck } from 'react-icons/fa'; 
import './Dashboard.css';
import { isAuthenticated, logout } from '../services/auth';

function Dashboard() {
  const firstName = localStorage.getItem('first_name');  // Recupera o primeiro nome
  const lastName = localStorage.getItem('last_name');    // Recupera o último nome
  const navigate = useNavigate();  

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');  // Se não estiver autenticado, redireciona para login
    }
  }, [navigate]); 

  const handleLogoff = () => {
    logout();  
    navigate('/login'); 
    
  };
  console.log(firstName)
  
return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src="/hopesystem.webp" alt="Logo do Sistema" className="logo" />
        <h1>Bem-vindo(a), {firstName} {lastName}!</h1> 
        
        <button onClick={handleLogoff} className="logoff-button">Logoff</button>
      </header>
      <nav className="dashboard-nav">
        <ul>
            <li>
              <a href="/produtos">
                <FaBox size={20} />  Gerenciar Produtos
              </a>
            </li>
            <li>
              <a href="/entradas">
                <FaArrowRight size={20} /> Registrar Entrada
              </a>
            </li>
            <li>
              <a href="/saidas">
                <FaArrowLeft size={20} /> Registrar Saída
              </a>
            </li>
            <li>
              <a href="/pedidos">
                <FaClipboardList size={20} /> Gerenciar Pedidos
              </a>
            </li>
            <li>
              <a href="/orcamentos">
                <FaFileInvoiceDollar size={20} /> Gerenciar Orçamentos
              </a>
            </li>
            <li>
              <a href="/clientes">
                <FaUsers size={20} /> Gerenciar Cliente
              </a>
            </li>
            <li>
              <a href="/fornecedores">
                <FaTruck size={20} /> Gerenciar Fornecedor
              </a>
            </li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
