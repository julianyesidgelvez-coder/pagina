'use client'

import { useEffect, useState, useRef } from 'react'

export default function Product() {
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

  const features = [
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <rect x="8" y="20" width="48" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="16" y="28" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          <text x="21" y="37" fontFamily="monospace" fontSize="7" fill="currentColor">00.0</text>
          <circle cx="48" cy="34" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M52,16 L52,20 M56,16 L56,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8,56 L16,56 L16,64 M48,64 L48,56 L56,56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      ),
      title: 'Compacta',
      description: 'Diseño portátil. Cabe en la mochila y en cualquier banco de trabajo.',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <path d="M12,32 L20,32 L24,20 L30,44 L36,24 L40,32 L52,32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="52" y1="20" x2="52" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="24" x2="56" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="40" x2="56" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: '0–30V · 0–5A',
      description: 'Regulación de voltaje y corriente en un solo equipo. Lo esencial del laboratorio.',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M32,18 L32,32 L42,38" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="3" fill="currentColor" />
          <path d="M20,12 L16,6 M44,12 L48,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      ),
      title: 'Bajo costo',
      description: 'Costo significativamente más bajo que las fuentes de laboratorio tradicionales, accesible para estudiantes.',
    },
  ]

  return (
    <section id="producto" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <span className={`block text-[12px] font-mono font-medium uppercase tracking-[5px] text-gray-500 mb-7 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          03 — Producto
        </span>

        <h2 className={`text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-2px] mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
          0–30V · 0–5A. Todo en uno.
        </h2>

        <p className={`text-[1.15rem] text-gray-400 leading-[1.9] max-w-[640px] mx-auto mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.2s' }}>
          Fuente conmutada para alimentar circuitos con control preciso. Laboratorio, robótica o tu banco de trabajo en casa.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-[#111] border border-white/6 rounded-2xl p-10 text-center transition-all duration-500 hover:border-white/20 hover:-translate-y-2 hover:bg-[#161616] hover:shadow-2xl hover:shadow-black/50 hover:shadow-white/3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 text-white">{feature.icon}</div>
              <h3 className="text-[1.15rem] font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-[0.9rem] text-gray-400 leading-[1.7]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
