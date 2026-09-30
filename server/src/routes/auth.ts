import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { users } from '../db/schema.js'

export const authRouter = Router()

// POST /auth/login — usado por el Credentials provider de NextAuth (web/src/auth.ts).
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'email y password son requeridos' })
  }

  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (!user || !user.passwordHash) {
    return res.status(401).json({ error: 'Credenciales invalidas' })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return res.status(401).json({ error: 'Credenciales invalidas' })
  }

  res.json({ id: user.id, email: user.email, name: user.displayName })
})

// POST /auth/oauth — ejemplo de upsert tras un login exitoso con Google/GitHub.
// Body esperado: { email, name }. En produccion tambien verificarias aqui el
// id_token/access_token contra el proveedor antes de confiar en el email.
authRouter.post('/oauth', async (req, res) => {
  const { email, name } = req.body ?? {}
  if (!email) {
    return res.status(400).json({ error: 'email es requerido' })
  }

  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existing) {
    return res.json({ id: existing.id, email: existing.email, name: existing.displayName })
  }

  const [created] = await db
    .insert(users)
    .values({ email, displayName: name ?? null })
    .returning()

  res.status(201).json({ id: created.id, email: created.email, name: created.displayName })
})
