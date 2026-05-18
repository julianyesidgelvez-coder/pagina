'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function CuentaPage() {
  const [user, setUser] = useState<any>(null)
  const [compras, setCompras] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddCompra, setShowAddCompra] = useState(false)
  const [newCompra, setNewCompra] = useState({ producto: '', notas: '' })
  const router = useRouter()
  const { token, logout } = useAuth()

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }
    fetchUserData()
  }, [token])

  const fetchUserData = async () => {
    if (!token) return

    try {
      const response = await fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        router.push('/login')
        return
      }

      const data = await response.json()
      setUser(data)
      setCompras(data.compras || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCompra = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    try {
      const response = await fetch('/api/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCompra),
      })

      if (response.ok) {
        setShowAddCompra(false)
        setNewCompra({ producto: '', notas: '' })
        fetchUserData()
      }
    } catch (error) {
      console.error('Error adding compra:', error)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen px-6 py-20 bg-black">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-white text-sm mb-6 inline-block">
          ← Volver al inicio
        </Link>

        <div className="bg-[#111] border border-white/6 rounded-2xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Mi cuenta</h1>
          </div>
          
          {loading ? (
            <p className="text-gray-500">Cargando...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Información personal</h2>
                <div className="space-y-2">
                  <p className="text-white"><span className="text-gray-500">Nombre:</span> {user?.nombre || 'No especificado'}</p>
                  <p className="text-white"><span className="text-gray-500">Email:</span> {user?.email || 'No especificado'}</p>
                  <p className="text-white"><span className="text-gray-500">Teléfono:</span> {user?.telefono || 'No especificado'}</p>
                  <p className="text-white"><span className="text-gray-500">Institución:</span> {user?.institucion || 'No especificado'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#111] border border-white/6 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Mis compras</h2>
            <button onClick={() => setShowAddCompra(!showAddCompra)} className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-colors">
              {showAddCompra ? 'Cancelar' : '+ Agregar compra'}
            </button>
          </div>

          {showAddCompra && (
            <form onSubmit={handleAddCompra} className="mb-6 p-4 bg-black border border-white/6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Producto</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                    value={newCompra.producto}
                    onChange={(e) => setNewCompra({ ...newCompra, producto: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Notas (opcional)</label>
                  <textarea
                    className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                    value={newCompra.notas}
                    onChange={(e) => setNewCompra({ ...newCompra, notas: e.target.value })}
                    rows={2}
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-white text-black text-sm rounded-lg hover:bg-gray-200 transition-colors">
                  Guardar compra
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <p className="text-gray-500 text-center py-8">Cargando compras...</p>
          ) : compras.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tienes compras registradas</p>
          ) : (
            <div className="space-y-4">
              {compras.map((compra) => (
                <div key={compra.id} className="bg-black border border-white/6 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">{compra.producto}</p>
                      <p className="text-gray-500 text-sm">{new Date(compra.fechaCompra).toLocaleDateString()}</p>
                      {compra.notas && <p className="text-gray-500 text-sm mt-1">{compra.notas}</p>}
                    </div>
                    {compra.garantiaHasta && (
                      <span className="text-xs text-gray-500">
                        Garantía hasta: {new Date(compra.garantiaHasta).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
