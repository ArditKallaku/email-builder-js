import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8090/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    //get token from token search params
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Access-Control-Allow-Origin'] = '*';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
