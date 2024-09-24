import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Substitua pela URL correta da sua API
});

// Agora a função recebe 'navigate' como argumento
export const login = (username, password, navigate) => {
  return api.post('/login/', { username, password })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');  // Usando navigate para redirecionar após o login
    })
    .catch(error => {
      console.error("Erro no login:", error);
    });
};

// Agora a função recebe 'navigate' como argumento
export const logout = (navigate) => {
  localStorage.removeItem('token');
  navigate('/login');  // Redireciona para a tela de login após o logout
};

export default api;
