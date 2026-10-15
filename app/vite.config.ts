import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
// O App Sentinela é publicado sob o subcaminho /app/ do mesmo domínio do
// Site Institucional (ver docs/DEPLOY — Opção A: um único Worker Cloudflare).
// Em desenvolvimento local mantemos base "/" para facilitar testes isolados.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/app/' : '/',
  resolve: {
    alias: {
      // Camada canônica compartilhada entre site/ e app/ (ver /shared/README.md).
      '@shared': path.resolve(import.meta.dirname, '../shared'),
      // shared/ vive fora de app/node_modules — força a resolução de
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
}))
