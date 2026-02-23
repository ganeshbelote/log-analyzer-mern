import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

interface payloadType {
  userId: number
  email: string
}

const generateToken = (payload: payloadType): string => {
  return jwt.sign(payload, env.JWT_SECRET!, {
    expiresIn: '24h'
  })
}

const verifyToken = (token: string): payloadType => {
  return jwt.verify(token, env.JWT_SECRET!) as payloadType
}

export { generateToken, verifyToken }
