import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.DATABASE_URL?.startsWith('libsql://')) {
  // Usar Turso (SQLite en la nube) para producción
  const libsql = createClient({
    url: process.env.DATABASE_URL,
  })
  const adapter = new PrismaLibSQL(libsql)
  prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter } as any)
} else {
  // Usar SQLite local para desarrollo
  prisma = globalForPrisma.prisma ?? new PrismaClient()
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }
