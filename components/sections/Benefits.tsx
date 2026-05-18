'use client'

import { useEffect, useState, useRef } from 'react'

export default function Benefits() {
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

  const benefits = [
    {
      num: '01',
      title: 'Un solo equipo, muchos rangos',
      description: 'Voltaje e intensidad regulables sin cambiar de fuente.',
    },
    {
      num: '02',
      title: 'Ahorro real',
      description: 'Accesible para estudiantes y aficionados con presupuesto ajustado.',
    },
    {
      num: '03',
      title: 'Llévala donde trabajes',
      description: 'Compacta. Lista para campus, casa o taller.',
    },
    {
      num: '04',
      title: 'Interfaz intuitiva',
      description: 'Menos curva de aprendizaje. Más práctica autónoma.',
    },
  ]

  return (
    <section id="beneficios" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <span className={`block text-[12px] font-mono font-medium uppercase tracking-[5px] text-gray-500 mb-7 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          05 — Beneficios
        </span>

        <h2 className={`text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-2px] mb-14 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
          Más equipo. Menos fricción.
        </h2>

        <div className="flex flex-col gap-0 mt-14">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-10 items-center py-10 border-b border-white/6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="font-mono text-[2.5rem] font-light text-gray-500 w-[70px]">{benefit.num}</div>
              <div>
                <h3 className="text-[1.5rem] font-semibold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-400 text-[1.05rem] max-w-[520px] leading-[1.7]">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
