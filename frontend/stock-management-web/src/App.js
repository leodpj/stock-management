import React from 'react';
import './App.css';  // Estilos específicos para o login (opcional)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProdutoList from './pages/ProdutoList';
import ProdutoForm from './pages/ProdutoForm';  // Importa o formulário de adicionar produtos
import OrcamentoList from './pages/OrcamentoList';  // Importa o formulário de adicionar produtos
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';  // Importa a rota protegida
import ClienteForm from './pages/ClienteForm';
import ClienteList from './pages/ClienteList';
import FornecedorForm from './pages/FornecedorForm';
import FornecedorList from './pages/FornecedorList';


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
          <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orcamentos"
          element={
            <ProtectedRoute>
              <OrcamentoList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/produtos"
          element={
            <ProtectedRoute>
              <ProdutoList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <ClienteList />
            </ProtectedRoute>
          }
        />
         {/* <Route path="/produtos" element={<ProdutoList />} />
          <Route path="/orcamentos" element={<OrcamentoList />} />*/}
          <Route path="/produtos/novo" element={<ProdutoForm />} />  {/* Adiciona a rota para o formulário de produto */}
          <Route path="/clientes/novo" element={<ClienteForm />} />
          {/*<Route path="/clientes" element={<ClienteList />} />*/}
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