import { api } from './api';

export const loginUser = async (data: any) => {
	const response = await api.post('/v1/auth/login', data);
	return response.data;
};

export const checkUserSession = async () => {
	const response = await api.get('/v1/user');
	return response.data;
};
