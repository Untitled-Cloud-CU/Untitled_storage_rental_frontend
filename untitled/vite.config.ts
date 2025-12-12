// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })
// vite.config.ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 5174,
    strictPort: true, // if 5174 is taken, it FAILS instead of switching ports
  },
});
