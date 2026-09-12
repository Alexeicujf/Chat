import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

export const api = axios.create({
	baseURL: import.meta.env.VITE_HTTP_DOMEN || 'http://localhost:8080/api',
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error: AxiosError) => {
		const originalRequest = error.config as CustomAxiosRequestConfig;
		const isUnAuth = error.response?.status === 401;
		const isRefreshRequest = originalRequest?.url?.includes('/v1/auth/refresh');
		const alreadyRetried = originalRequest?._retry;

		if (!isUnAuth || !originalRequest || alreadyRetried || isRefreshRequest) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		try {
			await api.post('/v1/auth/refresh');
			return api(originalRequest);
		} catch (refreshError) {
			return Promise.reject(refreshError);
		}
	},
);
