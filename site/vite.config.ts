import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Camada canônica compartilhada entre site/ e app/ (ver /shared/README.md).
      '@shared': path.resolve(import.meta.dirname, '../shared'),
      // shared/ vive fora de site/node_modules — força a resolução de
      // react/react-dom para a cópia local deste projeto (evita duplicação
      // de instância do React ao importar componentes/context de @shared).
      react: path.resolve(import.meta.dirname, 'node_modules/react'),
      'react-dom': path.resolve(import.meta.dirname, 'node_modules/react-dom'),
    },
  },
  server: {
    host: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
})
