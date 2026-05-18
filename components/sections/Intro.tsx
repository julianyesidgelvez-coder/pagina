'use client'

import { useEffect, useState, useRef } from 'react'

export default function Intro() {
  const [isVisible, setIsVisible] = useState(false)
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Animate counters
            animateCounter(30, setCount1, 1500)
            animateCounter(5, setCount2, 1500)
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

  const animateCounter = (target: number, setter: (value: number) => void, duration: number) => {
    const startTime = performance.now()
    const startValue = 0

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = Math.round(startValue + (target - startValue) * eased)
      setter(current)

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        setter(target)
      }
    }

    requestAnimationFrame(update)
  }

  return (
    <section id="introduccion" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div>
            <span className={`block text-[12px] font-mono font-medium uppercase tracking-[5px] text-gray-500 mb-7 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              02 — Introducción
            </span>

            <h2 className={`text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-2px] mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
              El laboratorio no debería quedarse en el campus
            </h2>

            <p className={`text-[1.15rem] text-gray-400 leading-[1.9] max-w-[600px] mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.2s' }}>
              En ingeniería dependes de fuentes de alimentación del laboratorio: grandes, pesadas y solo disponibles si las prestas. Eso frena prácticas y proyectos fuera del aula.
            </p>

            <p className={`text-[1.15rem] text-gray-400 leading-[1.9] max-w-[600px] mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.3s' }}>
              FUCOVI nace para cambiar eso: fuentes conmutadas compactas, versátiles y con precio justo — para que estudiantes y makers desarrollen habilidades reales, en la universidad o en casa.
            </p>

            <div className={`flex gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.4s' }}>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-[3rem] font-medium text-white leading-none">{count1}</span>
                <span className="font-mono text-[1.5rem] font-normal text-gray-500">V</span>
                <span className="block w-full text-[12px] text-gray-500 uppercase tracking-[1.5px] mt-2">Voltaje máximo</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-[3rem] font-medium text-white leading-none">{count2}</span>
                <span className="font-mono text-[1.5rem] font-normal text-gray-500">A</span>
                <span className="block w-full text-[12px] text-gray-500 uppercase tracking-[1.5px] mt-2">Intensidad máxima</span>
              </div>
            </div>
          </div>

          <div className={`flex justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '0.3s' }}>
            <div className="w-full max-w-[400px]">
              <svg viewBox="0 0 320 220" className="w-full h-auto text-white">
                {/* Outer frame */}
                <rect x="25" y="35" width="270" height="150" rx="14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.85" />
                <rect x="28" y="38" width="264" height="144" rx="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                {/* Top accent line */}
                <line x1="40" y1="48" x2="280" y2="48" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                {/* Left display */}
                <rect x="45" y="58" width="95" height="52" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <rect x="50" y="63" width="85" height="42" rx="4" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                <text x="92" y="92" textAnchor="middle" fontFamily="monospace" fontSize="22" fill="currentColor" opacity="0.95" letterSpacing="1">12.50</text>
                <text x="92" y="122" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill="currentColor" opacity="0.35" letterSpacing="3">VOLTAJE</text>
                {/* Right display */}
                <rect x="155" y="58" width="95" height="52" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <rect x="160" y="63" width="85" height="42" rx="4" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                <text x="202" y="92" textAnchor="middle" fontFamily="monospace" fontSize="22" fill="currentColor" opacity="0.95" letterSpacing="1">2.400</text>
                <text x="202" y="122" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill="currentColor" opacity="0.35" letterSpacing="3">CORRIENTE</text>
                {/* Voltage knob */}
                <circle cx="78" cy="150" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <circle cx="78" cy="150" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
                <line x1="78" y1="150" x2="78" y2="138" stroke="currentColor" strokeWidth="1.5" opacity="0.7">
                  <animateTransform attributeName="transform" type="rotate" dur="6s" repeatCount="indefinite" values="0 78 150; 40 78 150; -20 78 150; 0 78 150" keyTimes="0; 0.3; 0.7; 1" />
                </line>
                <text x="78" y="178" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="currentColor" opacity="0.3">V</text>
                {/* Current knob */}
                <circle cx="122" cy="150" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <circle cx="122" cy="150" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
                <line x1="122" y1="150" x2="122" y2="138" stroke="currentColor" strokeWidth="1.5" opacity="0.7">
                  <animateTransform attributeName="transform" type="rotate" dur="7s" repeatCount="indefinite" values="0 122 150; -30 122 150; 25 122 150; 0 122 150" keyTimes="0; 0.4; 0.8; 1" />
                </line>
                <text x="122" y="178" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="currentColor" opacity="0.3">A</text>
                {/* Output terminals */}
                <rect x="165" y="135" width="44" height="38" rx="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <circle cx="178" cy="154" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                <text x="178" y="157" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="currentColor" opacity="0.5">+</text>
                <circle cx="196" cy="154" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                <text x="196" y="157" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="currentColor" opacity="0.5">-</text>
                {/* Power LED */}
                <circle cx="250" cy="150" r="5" fill="currentColor" opacity="0.2">
                  <animate attributeName="opacity" values="0.15; 0.8; 0.15" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="250" cy="150" r="3" fill="currentColor" opacity="0.5">
                  <animate attributeName="opacity" values="0.3; 1; 0.3" dur="2.5s" repeatCount="indefinite" />
                </circle>
                {/* Power button */}
                <circle cx="250" cy="178" r="5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <path d="M250,174 L250,178" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                {/* Brand mark */}
                <text x="275" y="172" textAnchor="end" fontFamily="sans-serif" fontSize="7" fill="currentColor" opacity="0.15" letterSpacing="2">FUCOVI</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
