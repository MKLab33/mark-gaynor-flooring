import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mark Gaynor Flooring | Wood Flooring Specialists in Dublin',
  description:
    'Mark Gaynor Flooring (trading as Mark II Flooring) — premium engineered oak, herringbone, laminate and luxury vinyl supply and fit across Dublin and Leinster. Free quotations. Call 087 767 8389.',
  keywords: [
    'wood flooring Dublin',
    'engineered oak Dublin',
    'herringbone flooring Ireland',
    'floor fitter Dublin',
    'Mark Gaynor Flooring',
    'Mark II Flooring',
    'laminate flooring Dublin',
    'LVT Dublin',
    'floor sanding Dublin',
  ],
  openGraph: {
    title: 'Mark Gaynor Flooring | Wood Flooring Specialists in Dublin',
    description:
      'Premium engineered oak, herringbone, laminate and luxury vinyl supply and fit across Dublin and Leinster. Free quotations.',
    url: 'https://markgaynorflooring.ie',
    siteName: 'Mark Gaynor Flooring',
    locale: 'en_IE',
    type: 'website',
  },
  metadataBase: new URL('https://markgaynorflooring.ie'),
  alternates: { canonical: 'https://markgaynorflooring.ie' },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Mark Gaynor Flooring',
  alternateName: 'Mark II Flooring',
  image: 'https://markgaynorflooring.ie/og-image.jpg',
  url: 'https://markgaynorflooring.ie',
  telephone: '+353877678389',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dublin',
    addressRegion: 'Dublin',
    addressCountry: 'IE',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Dublin' },
    { '@type': 'AdministrativeArea', name: 'Leinster' },
  ],
  priceRange: '€€–€€€',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '15:00',
    },
  ],
  description:
    'Dublin-based wood flooring specialists supplying and fitting engineered oak, herringbone parquet, laminate, luxury vinyl and floor sanding.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0A0807] text-white antialiased" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
