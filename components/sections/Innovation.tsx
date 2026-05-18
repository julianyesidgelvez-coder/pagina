'use client'

import { useEffect, useState, useRef } from 'react'

export default function Innovation() {
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

  const innovations = [
    {
      title: 'Compacta y portátil',
      description: 'Hecha para el ritmo del estudiante, no del laboratorio fijo.',
    },
    {
      title: 'Rangos integrados',
      description: '0–30 V y 0–5 A en un solo dispositivo. Lo esencial de tus prácticas.',
    },
    {
      title: 'Precio accesible',
      description: 'Alternativa real frente a fuentes tradicionales de alto costo.',
    },
    {
      title: 'Enfoque educativo',
      description: 'Facilita aprender, experimentar y crear proyectos por tu cuenta.',
    },
  ]

  return (
    <section id="innovacion" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className={`flex justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '0.3s' }}>
            <div className="w-full max-w-[400px]">
              <svg viewBox="0 0 300 250" className="w-full h-auto text-white">
                {/* Central chip */}
                <rect x="110" y="90" width="80" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="120" y="100" width="60" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                {/* Chip pins */}
                <line x1="110" y1="100" x2="95" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="110" y1="110" x2="95" y2="110" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="110" y1="120" x2="95" y2="120" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="110" y1="130" x2="95" y2="130" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="110" y1="140" x2="95" y2="140" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="190" y1="100" x2="205" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="190" y1="110" x2="205" y2="110" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="190" y1="120" x2="205" y2="120" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="190" y1="130" x2="205" y2="130" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="190" y1="140" x2="205" y2="140" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="125" y1="90" x2="125" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="140" y1="90" x2="140" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="155" y1="90" x2="155" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="170" y1="90" x2="170" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="125" y1="150" x2="125" y2="165" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="140" y1="150" x2="140" y2="165" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="155" y1="150" x2="155" y2="165" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="170" y1="150" x2="170" y2="165" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                {/* Animated connection lines */}
                <path d="M50,60 L95,100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="4 4">
                  <animate attributeName="strokeDashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
                </path>
                <path d="M250,60 L205,100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="4 4">
                  <animate attributeName="strokeDashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
                </path>
                <path d="M50,190 L95,140" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="4 4">
                  <animate attributeName="strokeDashoffset" from="0" to="-8" dur="1.2s" repeatCount="indefinite" />
                </path>
                <path d="M250,190 L205,140" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="4 4">
                  <animate attributeName="strokeDashoffset" from="0" to="-8" dur="1.2s" repeatCount="indefinite" />
                </path>
                {/* Outer nodes */}
                <circle cx="50" cy="60" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                <text x="50" y="40" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="currentColor" opacity="0.6">Educación</text>
                <circle cx="250" cy="60" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                <text x="250" y="40" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="currentColor" opacity="0.6">Tecnología</text>
                <circle cx="50" cy="190" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                <text x="50" y="215" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="currentColor" opacity="0.6">Ahorro</text>
                <circle cx="250" cy="190" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                <text x="250" y="215" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="currentColor" opacity="0.6">Portabilidad</text>
                {/* Center pulse */}
                <circle cx="150" cy="120" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                  <animate attributeName="r" values="15;25;15" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>

          <div>
            <span className={`block text-[12px] font-mono font-medium uppercase tracking-[5px] text-gray-500 mb-7 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              04 — Innovación
            </span>

            <h2 className={`text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-2px] mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
              Diseñada para quien construye
            </h2>

            <ul className="flex flex-col gap-5 mt-8">
              {innovations.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
                  style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="w-2 h-2 bg-white rounded-sm mt-2 flex-shrink-0 rotate-45" />
                  <div>
                    <strong className="block font-semibold text-white mb-1">{item.title}</strong>
                    <span className="text-gray-400 text-[0.95rem] leading-[1.6]">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
