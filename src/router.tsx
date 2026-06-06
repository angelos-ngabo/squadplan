import { lazy, Suspense, type ReactNode } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { OrganizerEventRoute } from './components/organizer-event-route'
import { PageLoader } from './components/page-loader'
import { ProtectedRoute } from './components/protected-route'
import { RouteErrorPage } from './components/route-error-page'

const Landing = lazy(() => import('./pages/Landing').then((module) => ({ default: module.Landing })))
const Auth = lazy(() => import('./pages/Auth').then((module) => ({ default: module.Auth })))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword').then((module) => ({ default: module.ForgotPassword })))
const Manage = lazy(() => import('./pages/Manage').then((module) => ({ default: module.Manage })))
const Settings = lazy(() => import('./pages/Settings').then((module) => ({ default: module.Settings })))
const JoinEvent = lazy(() => import('./pages/JoinEvent').then((module) => ({ default: module.JoinEvent })))
const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })))

function suspense(element: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  { path: '/', element: suspense(<Landing />), errorElement: <RouteErrorPage /> },
  { path: '/auth', element: suspense(<Auth />), errorElement: <RouteErrorPage /> },
  { path: '/forgot-password', element: suspense(<ForgotPassword />), errorElement: <RouteErrorPage /> },
  { path: '/login', element: <Navigate to="/auth" replace /> },
  { path: '/signup', element: <Navigate to="/auth?mode=signup" replace /> },
  {
    path: '/app',
    element: suspense(
      <ProtectedRoute>
        <Manage />
      </ProtectedRoute>,
    ),
    errorElement: <RouteErrorPage />,
  },
  {
    path: '/app/settings',
    element: suspense(
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>,
    ),
    errorElement: <RouteErrorPage />,
  },
  { path: '/event/:slug', element: suspense(<JoinEvent />), errorElement: <RouteErrorPage /> },
  {
    path: '/event/:slug/dashboard',
    element: suspense(
      <OrganizerEventRoute>
        <Dashboard />
      </OrganizerEventRoute>,
    ),
    errorElement: <RouteErrorPage />,
  },
])
