import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const outerPort = env.FRONTEND_PORT ? parseInt(env.FRONTEND_PORT, 10) : 8000;

	return {
		plugins: [react()],
		// Явно прокидываем переменную в клиентский код фронтенда
		define: {
			'import.meta.env.VITE_WS_DOMEN': JSON.stringify(env.VITE_WS_DOMEN),
		},
		server: {
			host: true,
			port: 5173,
			hmr: {
				clientPort: outerPort,
			},
		},
	};
});
