import React from 'react';
import './App.css';  // Estilos específicos para o login (opcional)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProdutoList from './components/ProdutoList';
import ProdutoForm from './components/ProdutoForm';  // Importa o formulário de adicionar produtos
import OrcamentoList from './components/OrcamentoList';  // Importa o formulário de adicionar produtos
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import FornecedorForm from './components/FornecedorForm';
import FornecedorList from './components/FornecedorList';


function App() {
  const isAuthenticated = !!localStorage.getItem('access_token');  // Verifique se o token existe
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Sistema de Gestão de Estoque</h1>
        </header>
        <Routes>
          {/* Rota de login */}
          <Route path="/login" element={<Login />} />
          {/*<Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} /> */}
          {/* Rota privada protegida */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produtos" element={<PrivateRoute component={ProdutoList} />} />
          <Route path="/orcamentos" element={<PrivateRoute component={OrcamentoList} />} />
          <Route path="/produtos/novo" element={<PrivateRoute component={ProdutoForm} />} />  {/* Adiciona a rota para o formulário de produto */}
          <Route path="/clientes/novo" element={<ClienteForm component={ClienteForm}/>} />
          <Route path="/clientes" element={<ClienteList component={ClienteList}/>} />
          <Route path="/clientes/editar/:id" element={<ClienteForm component={ClienteList} />} />
          <Route path="/fornecedores/novo" element={<FornecedorForm component={FornecedorForm}/>} />
          <Route path="/fornecedores" element={<FornecedorList component={FornecedorList}/>} />
          <Route path="/fornecedores/editar/:id" element={<FornecedorForm component={FornecedorList} />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;