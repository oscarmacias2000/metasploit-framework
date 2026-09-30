import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

const port = Number(process.env.PORT ?? 5000)
app.listen(port, () => {
  console.log(`[server] escuchando en http://localhost:${port}`)
})
