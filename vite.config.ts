import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Production on lp.alljanitorialservice.com uses base '/'.
// GitHub Pages staging used '/ajs-paid-lps/' — override with VITE_BASE if needed.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
})
