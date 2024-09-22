import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr(), ViteImageOptimizer({}), mkcert()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
