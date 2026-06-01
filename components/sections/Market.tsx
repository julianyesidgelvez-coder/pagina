'use client'

import { useEffect, useState, useRef } from 'react'

export default function Market() {
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

  const markets = [
    { title: 'Educación', desc: 'Universidades y colegios técnicos' },
    { title: 'Maker', desc: 'Proyectos personales y hobby' },
    { title: 'Industrial', desc: 'Prototipado y pruebas' },
    { title: 'Investigación', desc: 'Laboratorios de I+D' },
  ]

  return (
    <section id="mercado" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className={`text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.5px] mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
          Dónde estamos presentes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {markets.map((m, i) => (
            <div key={i} className={`bg-[#111] border border-white/6 rounded-2xl p-8 transition-all duration-500 hover:border-white/15 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40 hover:shadow-white/2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${0.15 + i * 0.15}s` }}>
              <h3 className="text-[0.95rem] font-semibold mb-2 text-white">{m.title}</h3>
              <p className="text-[0.82rem] text-gray-400 leading-[1.6]">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
