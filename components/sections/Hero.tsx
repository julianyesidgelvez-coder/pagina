'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="inicio" className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-0 animate-fadeInGrid" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
      }} />

      {/* Circuit Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 60%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 60%)',
      }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path className="animate-drawCircuit" d="M0,50 L20,50 L25,30 L40,30 L45,70 L60,70 L65,50 L80,50 L85,20 L100,20" stroke="white" strokeWidth="0.25" fill="none" strokeDasharray="300" strokeDashoffset="300" />
          <path className="animate-drawCircuit delay-1000" d="M0,70 L15,70 L20,40 L35,40 L40,60 L55,60 L60,30 L75,30 L80,50 L100,50" stroke="white" strokeWidth="0.25" fill="none" strokeDasharray="300" strokeDashoffset="300" />
          <path className="animate-drawCircuit delay-2000" d="M0,30 L10,30 L15,60 L30,60 L35,40 L50,40 L55,70 L70,70 L75,40 L100,40" stroke="white" strokeWidth="0.25" fill="none" strokeDasharray="300" strokeDashoffset="300" />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className={`mb-12 opacity-0 ${isVisible ? 'animate-heroLogoIn' : ''}`}>
          <div className="w-full max-w-[1000px] mx-auto mb-3">
            <img src="/logo.png" alt="FUCOVI Logo" className="w-full h-auto max-h-[500px] object-contain mx-auto" />
          </div>
        </div>

        <p className={`font-mono text-[0.75rem] tracking-[0.35em] uppercase text-gray-500 mb-4 opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '0.7s' }}>
          FUCOVI
        </p>

        <h1 className={`text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.5px] text-white max-w-[16ch] mx-auto mb-5 opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '0.85s' }}>
          Potencia de laboratorio en tu mochila
        </h1>

        <p className={`text-[clamp(0.85rem,1.4vw,1rem)] text-gray-500 max-w-[36ch] mx-auto mb-7 leading-[1.6] opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '1.1s' }}>
          Fuentes conmutadas portátiles y accesibles.
        </p>

        <Link href="/login" className={`inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-[0.04em] text-black bg-white border border-white rounded-full hover:bg-transparent hover:text-white hover:-translate-y-0.5 transition-all duration-250 mb-7 opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '1.25s' }}>
          Solicitar la tuya
        </Link>

        <div className={`flex items-center justify-center gap-3 sm:gap-5 opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '1.3s' }}>
          <span className="font-mono text-[14px] sm:text-[16px] font-normal tracking-[2px] sm:tracking-[3px] text-white">
            0V - 30V
          </span>
          <span className="w-6 h-[1px] bg-white/6" />
          <span className="font-mono text-[14px] sm:text-[16px] font-normal tracking-[2px] sm:tracking-[3px] text-white">
            0A - 5A
          </span>
        </div>
      </div>

      {/* Wave Background */}
      <div className="absolute bottom-0 left-0 right-0 h-60 opacity-4 pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="white" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeInGrid {
          to { opacity: 1; }
        }
        @keyframes drawCircuit {
          to { stroke-dashoffset: 0; }
        }
        @keyframes heroLogoIn {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInGrid {
          animation: fadeInGrid 2.5s ease forwards;
        }
        .animate-drawCircuit {
          animation: drawCircuit 5s ease forwards;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .animate-heroLogoIn {
          opacity: 0;
          transform: scale(0.88) translateY(20px);
          animation: heroLogoIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease forwards;
        }
      `}</style>
    </section>
  )
}
