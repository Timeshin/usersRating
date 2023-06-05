import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import path from 'path'

export default ({ mode }) => {
	process.env = { ...process.env, NODE_ENV: mode, ...loadEnv(mode, process.cwd()) }

	return defineConfig({
		base: '/',
		resolve: {
			alias: {
				'@/styles': path.resolve(__dirname, './src/styles/'),
				'@/types': path.resolve(__dirname, './src/types/'),
				'@/hooks': path.resolve(__dirname, './src/hooks/'),
				'@/stores': path.resolve(__dirname, './src/domain/stores'),
				'@/domain': path.resolve(__dirname, './src/domain/'),
				'@/adapters': path.resolve(__dirname, './src/adapters/'),
				'@/config': path.resolve(__dirname, './src/config/'),
				'@/components': path.resolve(__dirname, './src/presentation/components/'),
				'@/layouts': path.resolve(__dirname, './src/presentation/layouts/'),
				'@/pages': path.resolve(__dirname, './src/presentation/pages/')
			}
		},
		plugins: [react()],
		server: {
			host: true,
			strictPort: false,
			port: 3000
		},
		define: {
			'process.env': process.env
		}
	})
}
