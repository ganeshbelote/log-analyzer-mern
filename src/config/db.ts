import { PrismaClient } from '@prisma/client'; 
import { env } from './env.js'

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient

if (env.NODE_ENV == 'production') {
  prisma = new PrismaClient()
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient()
  }
  prisma = globalThis.prisma
}

export default prisma
