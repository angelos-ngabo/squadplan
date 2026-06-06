import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'

export function RouteErrorPage() {
  const error = useRouteError()
  const isNotFound = isRouteErrorResponse(error) && error.status === 404
  const message = isRouteErrorResponse(error)
    ? error.statusText || error.data?.message
    : error instanceof Error
      ? error.message
      : 'Something went wrong.'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#141416] px-6 text-center text-white">
      <h1 className="text-2xl font-bold">{isNotFound ? 'Page not found' : 'Unexpected Application Error'}</h1>
      <p className="mt-3 max-w-lg text-sm text-[#92929D]">
        {isNotFound
          ? 'This link may be outdated, or the page moved. Event join links look like /event/your-event-name.'
          : message}
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-[10px] bg-[#E97F18] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d56f10]"
      >
        Back home
      </Link>
    </div>
  )
}
