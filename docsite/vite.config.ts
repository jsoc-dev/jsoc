import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	optimizeDeps: {
		// disabling caching for code-editor, as currently it is local package in constant dev
		// NOTE: After modifications, vite server still needs to be restarted for latest code 
		exclude: ['code-editor'],
	},
	server: {
		host: true,
		port: 5173,
	},
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
	],
});
