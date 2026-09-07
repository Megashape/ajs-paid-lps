import { Navigate } from 'react-router-dom'

/** Legacy /office → root funnel. Prefer App Navigate. */
export function OfficePage() {
  return <Navigate to="/" replace />
}
