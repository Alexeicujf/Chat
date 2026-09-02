import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(__dirname, '../../'), '');

	return {
		plugins: [react(), tsconfigPaths()],
		server: {
			port: env.FRONTEND_PORT ? parseInt(env.FRONTEND_PORT, 10) : 5173,
		},
	};
});
