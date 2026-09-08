import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { fromSlug } from '../lib/cities'
import { OfficesFunnel } from '../components/OfficesFunnel'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function CityPage() {
  const { citySlug } = useParams<{ citySlug: string }>()
  const city = fromSlug(citySlug)

  useEffect(() => {
    if (!city) document.title = 'Page not found, All Janitorial Service'
  }, [city])

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <div className="bg-navy-900">
          <Header overHero={false} />
        </div>
        <main className="flex-1 mx-auto max-w-lg w-full px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-navy-900">City not found</h1>
          <p className="mt-3 text-slate-600 text-sm">
            We don&apos;t have a page for that location. Try our main office cleaning funnel.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-ajs-red hover:bg-ajs-red-dark text-white font-bold px-5 h-12"
          >
            Go to office cleaning
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return <OfficesFunnel city={city} />
}
