// src/services/api.js

import axios from 'axios';
import { useHistory } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Base URL da API Django
});


export default api;
