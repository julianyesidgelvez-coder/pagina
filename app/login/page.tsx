'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    telefono: '',
    institucion: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error en la operación')
      }

      if (isLogin) {
        login(data.token, data.userId)
        router.push('/cuenta')
      } else {
        setIsLogin(true)
        setError('Cuenta creada exitosamente. Por favor inicia sesión.')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-0 animate-fadeInGrid" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
      }} />

      {/* Circuit Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 60%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 60%)',
      }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path className="animate-drawCircuit" d="M0,50 L20,50 L25,30 L40,30 L45,70 L60,70 L65,50 L80,50 L85,20 L100,20" stroke="white" strokeWidth="0.25" fill="none" strokeDasharray="300" strokeDashoffset="300" />
          <path className="animate-drawCircuit delay-1000" d="M0,70 L15,70 L20,40 L35,40 L40,60 L55,60 L60,30 L75,30 L80,50 L100,50" stroke="white" strokeWidth="0.25" fill="none" strokeDasharray="300" strokeDashoffset="300" />
          <path className="animate-drawCircuit delay-2000" d="M0,30 L10,30 L15,60 L30,60 L35,40 L50,40 L55,70 L70,70 L75,40 L100,40" stroke="white" strokeWidth="0.25" fill="none" strokeDasharray="300" strokeDashoffset="300" />
        </svg>
      </div>

      <div className="max-w-md w-full relative z-10">
        <Link href="/" className="text-gray-500 hover:text-white text-sm mb-6 inline-block">
          ← Volver al inicio
        </Link>

        <div className="bg-[#111] border border-white/6 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-2 text-white">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h1>
          <p className="text-gray-500 mb-6 text-sm">
            {isLogin ? 'Ingresa a tu cuenta FUCOVI' : 'Crea tu cuenta para comenzar'}
          </p>

          {error && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${error.includes('exitosamente') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nombre completo</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Correo electrónico</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Teléfono (opcional)</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Institución (opcional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                    value={formData.institucion}
                    onChange={(e) => setFormData({ ...formData, institucion: e.target.value })}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Procesando...' : (isLogin ? 'Ingresar' : 'Crear cuenta')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white hover:underline"
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInGrid {
          to { opacity: 1; }
        }
        @keyframes drawCircuit {
          to { stroke-dashoffset: 0; }
        }
        .animate-fadeInGrid {
          animation: fadeInGrid 2.5s ease forwards;
        }
        .animate-drawCircuit {
          animation: drawCircuit 5s ease forwards;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
