// Sistema de almacenamiento en memoria para desarrollo y producción
// Los datos se perderán cuando el servidor se reinicie

interface User {
  id: string
  email: string
  password: string
  nombre: string
  telefono?: string
  institucion?: string
  preferencias?: string
  createdAt: Date
  updatedAt: Date
}

interface Compra {
  id: string
  userId: string
  producto: string
  fechaCompra: Date
  garantiaHasta?: Date
  notas?: string
  createdAt: Date
  updatedAt: Date
}

class MemoryStore {
  private users: Map<string, User> = new Map()
  private compras: Map<string, Compra> = new Map()
  private userByEmail: Map<string, string> = new Map() // email -> userId

  // User operations
  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const id = Math.random().toString(36).substring(7)
    const now = new Date()
    const user: User = {
      id,
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    this.users.set(id, user)
    this.userByEmail.set(data.email, id)
    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userId = this.userByEmail.get(email)
    if (!userId) return null
    return this.users.get(userId) || null
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  async updateUser(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
    const user = this.users.get(id)
    if (!user) return null
    
    const updatedUser: User = {
      ...user,
      ...data,
      updatedAt: new Date(),
    }
    
    if (data.email) {
      this.userByEmail.delete(user.email)
      this.userByEmail.set(data.email, id)
    }
    
    this.users.set(id, updatedUser)
    return updatedUser
  }

  // Compra operations
  async createCompra(data: Omit<Compra, 'id' | 'createdAt' | 'updatedAt'>): Promise<Compra> {
    const id = Math.random().toString(36).substring(7)
    const now = new Date()
    const compra: Compra = {
      id,
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    this.compras.set(id, compra)
    return compra
  }

  async findComprasByUserId(userId: string): Promise<Compra[]> {
    return Array.from(this.compras.values()).filter(c => c.userId === userId)
  }

  async findCompraById(id: string): Promise<Compra | null> {
    return this.compras.get(id) || null
  }

  async updateCompra(id: string, data: Partial<Omit<Compra, 'id' | 'createdAt'>>): Promise<Compra | null> {
    const compra = this.compras.get(id)
    if (!compra) return null
    
    const updatedCompra: Compra = {
      ...compra,
      ...data,
      updatedAt: new Date(),
    }
    
    this.compras.set(id, updatedCompra)
    return updatedCompra
  }

  async deleteCompra(id: string): Promise<boolean> {
    return this.compras.delete(id)
  }
}

// Singleton instance
export const memoryStore = new MemoryStore()
