// src/services/auth.js

// Função para verificar se o token de autenticação está presente no localStorage
export const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    
    // Verifica se o token existe. Você pode adicionar mais validações se necessário.
    return token !== null;
  };
  
  // Função para realizar logout
  export const logout = () => {
    localStorage.removeItem('access_token');  // Remove o token do localStorage
    window.location.href = '/login';  // Redireciona para a página de login
  };
  
  // Função para realizar login (Exemplo básico, pode ser ajustado conforme necessário)
  export const login = (token) => {
    localStorage.setItem('access_token', token);  // Salva o token no localStorage
  };
  