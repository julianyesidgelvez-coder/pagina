'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

export default function Orders() {
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

  const steps = [
    { num: '1', title: 'Regístrate', desc: 'Crea tu cuenta en nuestra plataforma' },
    { num: '2', title: 'Solicita', desc: 'Realiza tu pedido de fuente FUCOVI' },
    { num: '3', title: 'Recibe', desc: 'Envío seguro a tu ubicación' },
  ]

  return (
    <section id="pedidos" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.5px] mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
          Obtén tu FUCOVI
        </h2>
        <p className={`text-[1.15rem] text-gray-400 leading-[1.9] max-w-[640px] mx-auto mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.2s' }}>
          Proceso simple y directo. Tres pasos para tener tu fuente de alimentación.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center mb-8">
          {steps.map((s, i) => (
            <div key={i} className={`flex-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${0.3 + i * 0.1}s` }}>
              <div className="text-[3rem] font-mono font-light text-gray-500 mb-2">{s.num}</div>
              <h3 className="text-[1.25rem] font-semibold mb-2 text-white">{s.title}</h3>
              <p className="text-gray-400 text-[0.95rem]">{s.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/login" className={`inline-block px-8 py-3.5 text-sm font-medium tracking-[0.04em] text-black bg-white border border-white rounded-full hover:bg-transparent hover:text-white transition-all duration-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.6s' }}>
          Comenzar pedido
        </Link>
      </div>
    </section>
  )
}
