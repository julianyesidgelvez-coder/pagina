import { NextResponse } from 'next/server'
import { memoryStore } from '@/lib/memory-store'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    const { producto, notas } = await request.json()

    const compra = await memoryStore.createCompra({
      userId: decoded.userId,
      producto,
      fechaCompra: new Date(),
      garantiaHasta: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year warranty
      notas,
    })

    return NextResponse.json(compra, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
