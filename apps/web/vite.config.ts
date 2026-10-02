import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { onRequestPost } from './functions/api/chat.ts'

function chatbotDevApi(): Plugin {
  return {
    name: 'chatbot-dev-api',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, '')
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(Buffer.from(chunk))
          const headers = new Headers()
          for (const [name, value] of Object.entries(req.headers)) {
            if (typeof value === 'string') headers.set(name, value)
          }
          const url = new URL(req.url ?? '/api/chat', `http://${req.headers.host ?? 'localhost'}`)
          const result = await onRequestPost({
            request: new Request(url, { method: 'POST', headers, body: Buffer.concat(chunks) }),
            env: { GEMINI_API_KEY: env.GEMINI_API_KEY },
          })
          res.statusCode = result.status
          result.headers.forEach((value, name) => res.setHeader(name, value))
          res.end(await result.text())
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [chatbotDevApi(), react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react-vendor', test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'three-core', test: /[\\/]three[\\/]build[\\/]three\.core\.js$/ },
            { name: 'three-renderer', test: /[\\/]three[\\/]build[\\/]three\.module\.js$/ },
          ],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
