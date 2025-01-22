import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/")
    }
  },
  server: {
    port: 3000, // เปลี่ยนพอร์ตเพื่อหลีกเลี่ยงการชนกัน
    open: true, // เปิดเบราว์เซอร์อัตโนมัติ
    hmr: {
      overlay: true
    }
  },
  build: {
    sourcemap: true,
  }
});
