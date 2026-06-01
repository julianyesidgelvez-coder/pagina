'use client'

import { useEffect, useState, useRef } from 'react'

export default function Clients() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.35 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const clients = [
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <path d="M32,12 L32,20 M24,20 L40,20 L40,32 L24,32 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28,32 L28,44 M36,32 L36,44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="48" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="44" cy="48" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M16,20 L12,16 M48,20 L52,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      ),
      title: 'Estudiantes',
      description: 'Electrónica, Eléctrica, Mecatrónica y carreras afines.',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <rect x="12" y="20" width="40" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="30" x2="52" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <rect x="20" y="36" width="8" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="36" y="36" width="8" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M32,12 L32,20 M28,8 L36,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      ),
      title: 'Instituciones',
      description: 'Universidades, colegios y centros técnicos.',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <circle cx="32" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M16,54 C16,44 24,38 32,38 C40,38 48,44 48,54" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="20" r="2" fill="currentColor" />
          <path d="M28,28 Q32,32 36,28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Makers',
      description: 'Electrónica, robótica y proyectos tecnológicos personales.',
    },
  ]

  return (
    <section id="clientes" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className={`text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.5px] mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
          ¿Para quién es FUCOVI?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className={`bg-[#111] border border-white/6 rounded-2xl p-10 text-center transition-all duration-500 hover:border-white/15 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40 hover:shadow-white/2.5 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="w-14 h-14 mx-auto mb-6 text-white">{client.icon}</div>
              <h3 className="text-[1.25rem] font-semibold mb-3 text-white">{client.title}</h3>
              <p className="text-[1rem] text-gray-400 leading-[1.7]">{client.description}</p>
            </div>
          ))}
        </div>

        <div className={`flex items-center gap-3 mt-10 p-4 bg-white/02 border border-white/6 rounded-xl max-w-[640px] mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'}`} style={{ transitionDelay: '0.6s' }}>
          <svg viewBox="0 0 24 24" width="20" height="20" className="text-gray-500 flex-shrink-0">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1.5" fill="currentColor" />
          </svg>
          <p className="text-[0.85rem] text-gray-500 leading-[1.6]">
            Uso recomendado para mayores de 16 años. Manipular voltajes y corrientes requiere precaución; menores deben usar el equipo con supervisión de un adulto.
          </p>
        </div>
      </div>
    </section>
  )
}
