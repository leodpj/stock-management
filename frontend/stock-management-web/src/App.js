import React from 'react';
import './App.css';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProdutoList from './pages/ProdutoList';
import ProdutoForm from './pages/ProdutoForm';  
import OrcamentoList from './pages/OrcamentoList';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; 
import ClienteForm from './pages/ClienteForm';
import ClienteList from './pages/ClienteList';
import FornecedorForm from './pages/FornecedorForm';
import FornecedorList from './pages/FornecedorList';


function App() {
   
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Sistema de Gestão de Estoque</h1>
        </header>
        <Routes>       
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route path="/orcamentos" element={<ProtectedRoute> <OrcamentoList /> </ProtectedRoute>} />
          <Route path="/produtos" element={<ProtectedRoute> <ProdutoList /> </ProtectedRoute>} />
          <Route path="/clientes" element={<ProtectedRoute> <ClienteList /> </ProtectedRoute>} />
          <Route path="/produtos/novo" element={<ProtectedRoute> <ProdutoForm /></ProtectedRoute> } />  
          <Route path="/clientes/novo" element={<ProtectedRoute><ClienteForm /></ProtectedRoute>} />          
          <Route path="/clientes/editar/:id" element={<ProtectedRoute> <ClienteList /> </ProtectedRoute>} />          
          <Route path="/fornecedores/novo" element={<ProtectedRoute> <FornecedorForm /> </ProtectedRoute>} />
          <Route path="/fornecedores" element={<ProtectedRoute> <FornecedorList /> </ProtectedRoute>} />          
          <Route path="/fornecedores/editar/:id" element={<ProtectedRoute> <FornecedorList /> </ProtectedRoute>} />                 
        </Routes>
      </div>
    </Router>
  );
}

export default App;