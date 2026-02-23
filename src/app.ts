import express from 'express'
import cors from 'cors'
import auth from './routes/auth.route.js'
import application from './routes/application.route.js'
import log from './routes/log.route.js'
import { env } from './config/env.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true
  })
)
app.use(express.static('public'))
app.use(cookieParser())

app.use('/api/v1/auth', auth)
app.use('/api/v1/application', application)
app.use('/api/v1/log', log)

export default app
