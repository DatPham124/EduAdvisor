import { defineConfig, loadEnv } from 'vite';
import process from 'process';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      host: env.VITE_HOSTNAME || 'localhost',
    },
  };
});
