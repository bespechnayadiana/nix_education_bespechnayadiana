const api = axios.create({
  baseURL: 'http://localhost:8081',
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use( (response) => {
  const token = response.data?.token;
  const user = response.data?.user;
  if (token) localStorage.setItem('access-token', token);
  if (user) localStorage.setItem('user', JSON.stringify(user));
  return response;
},  (error) => {
  console.log(error);
  if (error.response.status === 401) {
    localStorage.removeItem('access-token');
    window.reload();
  }
  return Promise.reject(error);
});