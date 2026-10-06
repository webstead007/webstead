import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import contactRoutes from './routes/contactRoutes.js'

dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) })
const app = express()
const port = Number(process.env.PORT || 5000)
const allowedOrigins = [
  'http://localhost:5173',
  'https://webstead.vercel.app',
  ...(process.env.CLIENT_ORIGIN || '').split(','),
].map(origin => origin.trim().replace(/\/+$/, '')).filter(Boolean)

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: [...new Set(allowedOrigins)], methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }))
app.use(express.json({ limit: '20kb' }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false, message: { message: 'Too many enquiries from this network. Please try again later.' } }))
app.use('/api/contact', contactRoutes)
app.use((error, _req, res, _next) => {
  console.error('API error:', error.message)
  if (error instanceof SyntaxError && 'body' in error) return res.status(400).json({ message: 'Request body must be valid JSON.' })
  return res.status(500).json({ message: 'An unexpected server error occurred.' })
})

app.listen(port, () => console.log(`Webstead API listening on port ${port}`))
