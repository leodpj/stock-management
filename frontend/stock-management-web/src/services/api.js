

import axios from 'axios';

// Configurando a instância Axios com o baseURL para a API
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Atualize o baseURL conforme necessário
});

// Função para realizar o login
export const login = async (username, password, navigate) => {
  try {
    // Enviando a requisição POST para obter o token JWT
    const response = await api.post('/token/', { username, password });
    
    // Armazenando os tokens no localStorage
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    
    // Redirecionando o usuário para o dashboard
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);  // Exibe o erro em caso de falha no login
  }
};

// Função para realizar o logout
export const logout = (navigate) => {
  // Remove os tokens do localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  
  // Redireciona o usuário para a página de login após o logout
  navigate('/login');
};

// Função para configurar o header Authorization com o token JWT
export const setAuthToken = (token) => {
  if (token) {
    // Se o token existir, define o header Authorization
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Caso contrário, remove o header Authorization
    delete api.defaults.headers.common['Authorization'];
  }
};

// Função genérica para fazer requisições GET (exemplo)
export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    throw error;
  }
};

// Função genérica para fazer requisições POST (exemplo)
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to post data to ${endpoint}:`, error);
    throw error;
  }
};



export default api;

