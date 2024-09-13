// src/App.js

// src/App.js

import React from 'react';
import './App.css';  // Estilos específicos para o login (opcional)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProdutoList from './components/ProdutoList';
import ProdutoForm from './components/ProdutoForm';  // Importa o formulário de adicionar produtos
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Sistema de Gestão de Estoque</h1>
        </header>
        <Routes>
          {/* Rota de login */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          {/* Rota privada protegida */}
          <Route path="/produtos" element={<PrivateRoute component={ProdutoList} />} />
          <Route path="/produtos/novo" element={<PrivateRoute component={ProdutoForm} />} />  {/* Adiciona a rota para o formulário de produto */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;