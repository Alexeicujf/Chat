import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_HTTP_DOMEN || 'http://localhost:8080/api/v1',
	withCredentials: true,
});
