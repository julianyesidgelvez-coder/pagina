'use client'

import { useEffect, useState, useRef } from 'react'

export default function Contact() {
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

  return (
    <section id="contacto" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.05s' }}>
          <img src="/logo.png" alt="FUCOVI Logo" className="w-full h-auto max-h-[500px] object-contain mx-auto" />
        </div>

        <span className={`block text-[12px] font-mono font-medium uppercase tracking-[5px] text-gray-500 mb-7 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          12 — Contacto
        </span>

        <h2 className={`text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-2px] mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
          ¿Tienes preguntas?
        </h2>
        <p className={`text-[1.15rem] text-gray-400 leading-[1.9] max-w-[640px] mx-auto mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.2s' }}>
          Estamos aquí para ayudarte. Contáctanos por correo o WhatsApp.
        </p>
        <div className={`flex flex-col md:flex-row gap-6 justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.3s' }}>
          <a href="mailto:fucovi.oficial@gmail.com" className="px-8 py-3.5 text-sm font-medium tracking-[0.04em] text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all duration-250">
            fucovi.oficial@gmail.com
          </a>
          <a href="https://wa.me/573000000000" className="px-8 py-3.5 text-sm font-medium tracking-[0.04em] text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all duration-250">
            WhatsApp
          </a>
        </div>
        <p className={`mt-16 text-gray-500 text-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.4s' }}>
          © 2024 FUCOVI. Hecho en Colombia.
        </p>
      </div>
    </section>
  )
}
