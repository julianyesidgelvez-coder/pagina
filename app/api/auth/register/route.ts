import { NextResponse } from 'next/server'
import { memoryStore } from '@/lib/memory-store'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, nombre, telefono, institucion } = await request.json()

    const existingUser = await memoryStore.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await memoryStore.createUser({
      email,
      password: hashedPassword,
      nombre,
      telefono,
      institucion,
    })

    return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
