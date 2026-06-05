import { Navigate, createBrowserRouter } from 'react-router-dom'
import { OrganizerEventRoute } from './components/organizer-event-route'
import { ProtectedRoute } from './components/protected-route'
import { RouteErrorPage } from './components/route-error-page'
import { Auth } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { JoinEvent } from './pages/JoinEvent'
import { Landing } from './pages/Landing'
import { Manage } from './pages/Manage'

export const router = createBrowserRouter([
  { path: '/', element: <Landing />, errorElement: <RouteErrorPage /> },
  { path: '/auth', element: <Auth />, errorElement: <RouteErrorPage /> },
  { path: '/login', element: <Navigate to="/auth" replace /> },
  { path: '/signup', element: <Navigate to="/auth?mode=signup" replace /> },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Manage />
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorPage />,
  },
  { path: '/event/:slug', element: <JoinEvent />, errorElement: <RouteErrorPage /> },
  {
    path: '/event/:slug/dashboard',
    element: (
      <OrganizerEventRoute>
        <Dashboard />
      </OrganizerEventRoute>
    ),
    errorElement: <RouteErrorPage />,
  },
])
