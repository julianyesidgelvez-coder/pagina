'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  nombre: string | null
  telefono: string | null
  institucion: string | null
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, userId: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUserId = localStorage.getItem('userId')
    
    if (storedToken && storedUserId) {
      setToken(storedToken)
      setUser({ id: storedUserId, email: '', nombre: null, telefono: null, institucion: null })
    }
    setIsLoading(false)
  }, [])

  const login = (newToken: string, userId: string) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('userId', userId)
    setToken(newToken)
    setUser({ id: userId, email: '', nombre: null, telefono: null, institucion: null })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
