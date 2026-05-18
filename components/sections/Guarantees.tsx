'use client'

import { useEffect, useState, useRef } from 'react'

export default function Guarantees() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.35 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const policies = [
    { title: 'Garantía de 1 año', desc: 'Cobertura total en componentes' },
    { title: 'Soporte técnico', desc: 'Asistencia por correo y WhatsApp' },
    { title: 'Envío seguro', desc: 'Embalaje protector para transporte' },
  ]

  return (
    <section id="garantias" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <span className={`block text-[12px] font-mono font-medium uppercase tracking-[5px] text-gray-500 mb-7 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          10 — Garantías
        </span>
        <h2 className={`text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-2px] mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
          Tu tranquilidad, nuestra prioridad
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {policies.map((p, i) => (
            <div key={i} className={`bg-[#111] border border-white/6 rounded-2xl p-6 transition-all duration-500 hover:border-white/12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${0.15 + i * 0.1}s` }}>
              <h3 className="text-[1rem] font-semibold mb-2 text-white">{p.title}</h3>
              <p className="text-[0.9rem] text-gray-400 leading-[1.6]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
