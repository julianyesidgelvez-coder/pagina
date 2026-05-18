'use client'

import { useEffect, useState, useRef } from 'react'

export default function Company() {
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

  const pillars = [
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M32,20 L32,32 L40,38" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="3" fill="currentColor" />
        </svg>
      ),
      title: 'Misión',
      description: 'Democratizar el acceso a equipos de laboratorio de calidad para estudiantes y makers en Colombia y Latinoamérica.',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <path d="M32,8 L40,24 L56,28 L44,40 L48,56 L32,48 L16,56 L20,40 L8,28 L24,24 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Visión',
      description: 'Ser la referencia en fuentes conmutadas educativas, reconocidos por calidad, precio y compromiso con la comunidad maker.',
    },
  ]

  const orgItems = [
    { name: 'Ingeniería y Desarrollo', role: 'Diseño de productos' },
    { name: 'Producción', role: 'Fabricación local' },
    { name: 'Ventas y Soporte', role: 'Atención al cliente' },
  ]

  return (
    <section id="empresa" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <span className={`block text-[12px] font-mono font-medium uppercase tracking-[5px] text-gray-500 mb-7 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          07 — Empresa
        </span>

        <h2 className={`text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-2px] mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
          Tecnología accesible. Hecha en Colombia.
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`bg-[#111] border border-white/6 rounded-2xl p-10 transition-all duration-500 hover:border-white/12 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="w-12 h-12 text-white mb-5">{pillar.icon}</div>
              <h3 className="text-[1.3rem] font-semibold mb-3.5 text-white">{pillar.title}</h3>
              <p className="text-[0.95rem] text-gray-400 leading-[1.7]">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className={`mt-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.5s' }}>
          <h3 className="text-[1.1rem] font-semibold text-center mb-8 text-white">Nuestro equipo</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {orgItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white/015 border border-white/6 rounded-xl transition-all duration-250 hover:bg-white/03 hover:border-white/12 hover:translate-x-1"
              >
                <div className="w-2 h-2 bg-white rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="block text-[0.9rem] font-semibold mb-0.5 text-white">{item.name}</strong>
                  <span className="text-[0.82rem] text-gray-500">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
