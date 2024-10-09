import React, { useState } from 'react';
import './Login.css';  
import api from '../services/api';  // Serviço Axios

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/token/', {
        username: username,
        password: password,
      });

      // Armazena o token JWT e o nome do usuário no localStorage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('first_name', response.data.first_name);  // Armazena o first_name
      localStorage.setItem('last_name', response.data.last_name);    // Armazena o last_name

      
      // Redireciona para a página inicial
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Nome de usuário ou senha inválidos');
    }
    
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
