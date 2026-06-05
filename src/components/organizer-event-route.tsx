import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useEvent } from '../hooks/useEvent'

export function OrganizerEventRoute({ children }: { children: React.ReactNode }) {
  const { slug = '' } = useParams()
  const { user, loading: authLoading } = useAuth()
  const { event, isLoading: eventLoading } = useEvent(slug)
  const location = useLocation()

  if (authLoading || eventLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#141416] text-[#92929D]">
        Loading...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />
  }

  if (!event) {
    return <Navigate to="/app" replace />
  }

  if (event.organizerId !== user.uid) {
    return <Navigate to={`/event/${slug}`} replace />
  }

  return children
}
