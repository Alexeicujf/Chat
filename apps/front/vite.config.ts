import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	const port = parseInt(env.FRONTEND_PORT) || 8000;
	const hmrHost = env.VITE_HMR_HOST || 'localhost';

	return {
		plugins: [react()],
		server: {
			host: '0.0.0.0',
			port: port,
			strictPort: true,
			hmr: {
				clientPort: port,
				host: hmrHost,
			},
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	};
});
