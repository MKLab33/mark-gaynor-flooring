import Hero from '@/components/sections/Hero'
import SocialProofBar from '@/components/sections/SocialProofBar'
import ServicesGrid from '@/components/sections/ServicesGrid'
import QuickQuote from '@/components/sections/QuickQuote'
import ReviewsCarousel from '@/components/sections/ReviewsCarousel'
import BrandsStrip from '@/components/sections/BrandsStrip'
import FloorFinder from '@/components/sections/FloorFinder'
import LocationMap from '@/components/sections/LocationMap'
import FAQ from '@/components/sections/FAQ'
import FinalCTA from '@/components/sections/FinalCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProofBar />
      <ServicesGrid />
      <QuickQuote />
      <ReviewsCarousel />
      <BrandsStrip />
      <FloorFinder />
      <LocationMap />
      <FAQ />
      <FinalCTA />
    </main>
  )
}
