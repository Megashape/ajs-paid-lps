import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { OfficesHome } from './pages/OfficesHome'
import { CityPage } from './pages/CityPage'
import { RecurringPage } from './pages/Recurring'
import { ThankYouPage } from './pages/ThankYou'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<OfficesHome />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/recurring" element={<RecurringPage />} />
        <Route path="/office" element={<Navigate to="/" replace />} />
        {/* City slugs last so static routes win */}
        <Route path="/:citySlug" element={<CityPage />} />
      </Routes>
    </BrowserRouter>
  )
}
