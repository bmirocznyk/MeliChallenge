/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // Exit if port is already in use instead of trying another port
    host: true,
    open: false // Don't auto-open browser
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
}); 