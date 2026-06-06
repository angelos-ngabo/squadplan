export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#141416] text-[#92929D]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E97F18] border-t-transparent" />
        <span className="text-sm">Loading...</span>
      </div>
    </div>
  )
}
