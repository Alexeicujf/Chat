const response = await api.post(`/auth/login`, { email, password });
const checkAuthUrl = '/v1/user';
