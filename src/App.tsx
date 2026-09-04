import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { OfficePage } from './pages/Office'
import { RecurringPage } from './pages/Recurring'
import { ThankYouPage } from './pages/ThankYou'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/office" element={<OfficePage />} />
        <Route path="/recurring" element={<RecurringPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  )
}
