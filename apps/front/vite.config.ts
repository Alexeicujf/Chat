import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	server: {
		host: '0.0.0.0',
		port: 8000,
		strictPort: true,
		hmr: {
			clientPort: 8000, // Жестко ставим тот же порт
			host: 'localhost',
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
