export function FirebaseSetupScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#141416] px-6 py-12 text-white">
      <div className="max-w-lg rounded-xl border border-[#E97F18]/30 bg-[#1b1b1f] p-8">
        <h1 className="text-2xl font-bold">Firebase is not configured</h1>
        <p className="mt-3 text-sm text-[#92929D]">
          This hosted build does not include your Firebase keys. Add them using one of the options below,
          then rebuild and redeploy.
        </p>

        <div className="mt-6 space-y-4 text-sm text-white/80">
          <div className="rounded-lg border border-white/10 bg-[#141416] p-4">
            <p className="font-semibold text-white">Option 1 — Build with `.env` (recommended)</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-[#92929D]">
              <li>Copy `.env.example` to `.env`</li>
              <li>Paste your Firebase web app keys from the Firebase Console</li>
              <li>Run `npm run build`</li>
              <li>Run `firebase deploy --only hosting`</li>
            </ol>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#141416] p-4">
            <p className="font-semibold text-white">Option 2 — `public/firebase-config.json`</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-[#92929D]">
              <li>Copy `public/firebase-config.example.json` to `public/firebase-config.json`</li>
              <li>Fill in your Firebase project values</li>
              <li>Run `npm run build` and deploy again</li>
            </ol>
          </div>
        </div>

        <p className="mt-6 text-xs text-[#92929D]">
          Firebase web API keys are public in the browser. Security comes from Firestore rules and Authentication,
          not from hiding these values.
        </p>
      </div>
    </div>
  )
}
