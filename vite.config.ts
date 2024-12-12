import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://mukeshsahoo10.github.io/SRMS/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
