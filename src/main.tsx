import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FirebaseSetupScreen } from './components/firebase-setup-screen'
import { ensureFirebaseInit } from './firebase'
import { router } from './router'
import './index.css'

const queryClient = new QueryClient()

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
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#141416] text-[#92929D]">
        Loading...
      </div>
    )
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
