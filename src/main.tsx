import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PageLoader } from './components/page-loader'
import { FirebaseSetupScreen } from './components/firebase-setup-screen'
import { ensureFirebaseInit } from './firebase'
import { router } from './router'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function AppBootstrap() {
  const [ready, setReady] = useState(false)
  const [configured, setConfigured] = useState(false)

  useEffect(() => {
    ensureFirebaseInit().then((ok) => {
      setConfigured(ok)
      setReady(true)
    })
  }, [])

  if (!ready) {
    return <PageLoader />
  }

  if (!configured) {
    return <FirebaseSetupScreen />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppBootstrap />
  </React.StrictMode>,
)
