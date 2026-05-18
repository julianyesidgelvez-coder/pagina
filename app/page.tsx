import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Product from '@/components/sections/Product'
import Innovation from '@/components/sections/Innovation'
import Benefits from '@/components/sections/Benefits'
import Clients from '@/components/sections/Clients'
import Company from '@/components/sections/Company'
import Commitment from '@/components/sections/Commitment'
import Market from '@/components/sections/Market'
import Guarantees from '@/components/sections/Guarantees'
import Orders from '@/components/sections/Orders'
import Contact from '@/components/sections/Contact'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Intro />
      <Product />
      <Innovation />
      <Benefits />
      <Clients />
      <Company />
      <Commitment />
      <Market />
      <Guarantees />
      <Orders />
      <Contact />
    </main>
  )
}
