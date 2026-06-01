'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'introduccion', label: 'Intro' },
  { id: 'producto', label: 'Producto' },
  { id: 'innovacion', label: 'Innovación' },
  { id: 'beneficios', label: 'Beneficios' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'empresa', label: 'Empresa' },
  { id: 'compromiso', label: 'Compromiso' },
  { id: 'mercado', label: 'Mercado' },
  { id: 'garantias', label: 'Garantías' },
  { id: 'pedidos', label: 'Pedidos' },
  { id: 'contacto', label: 'Contacto' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [scrollProgress, setScrollProgress] = useState(0)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)

      // Update active section based on scroll position
      const sectionElements = sections.map(s => document.getElementById(s.id))
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section && section.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent z-[1001] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1002] bg-black/85 backdrop-blur-6 border-b border-white/6">
        <div className="h-[72px] px-8 pr-16 flex items-center justify-start">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'text-white bg-white/12 shadow-lg shadow-white/5'
                    : 'text-gray-500 hover:text-gray-400 hover:bg-white/6'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Side Navigation Dots */}
      <nav className="fixed right-7 top-1/2 -translate-y-1/2 z-[1000] flex flex-col">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="w-7 h-10 flex items-center justify-end relative group"
            aria-label={section.label}
          >
            <div className={`w-3.5 h-[1.5px] rounded transition-all ${
              activeSection === section.id ? 'w-7 bg-white' : 'bg-gray-500'
            }`} />
            <span className="absolute right-8 top-1/2 -translate-y-1/2 translate-x-2 text-[9px] font-medium uppercase tracking-widest text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              {section.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Auth Button */}
      <div className="fixed top-4 right-4 z-[1003]">
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/cuenta" className="text-sm text-gray-400 hover:text-white transition-colors">
              Mi cuenta
            </Link>
            <button onClick={logout} className="text-sm text-gray-400 hover:text-white transition-colors">
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
            Ingresar
          </Link>
        )}
      </div>
    </>
  )
}
