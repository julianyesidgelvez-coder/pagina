'use client'

import { useEffect, useState, useRef } from 'react'

export default function Commitment() {
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
    <section id="compromiso" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.5px] mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
          Calidad que respaldamos
        </h2>
        <p className={`text-[1.15rem] text-gray-400 leading-[1.9] max-w-[640px] mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.2s' }}>
          Cada fuente FUCOVI pasa por rigurosos controles de calidad antes de llegar a tus manos. Garantizamos funcionamiento y durabilidad.
        </p>
      </div>
    </section>
  )
}
