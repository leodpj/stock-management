import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
});

export const login = async (username, password, navigate) => {
  try {
    const response = await api.post('/token/', { username, password });    

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);    

    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const logout = (navigate) => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');  

  navigate('/login');
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    throw error;
  }
};

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

