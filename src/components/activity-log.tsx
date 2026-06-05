import { tv } from 'tailwind-variants'
import type { ActivityEntry } from '../schemas/participant'
import { formatTimestamp } from '../utils/formatters'

const card = tv({ base: 'rounded-xl border border-white/10 bg-[#1b1b1f] p-5' })
const list = tv({ base: 'max-h-64 space-y-3 overflow-y-auto pr-1' })
const dot = tv({ base: 'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E97F18]' })

export function ActivityLog({ activityLog }: { activityLog: ActivityEntry[] }) {
  return (
    <div className={card()}>
      <h3 className="mb-4 text-sm font-semibold text-white">Recent Activity</h3>
      <div className={list()}>
        {activityLog.length === 0 ? (
          <p className="text-sm text-[#92929D]">No activity yet.</p>
        ) : (
          activityLog.map((entry) => (
            <div key={entry.id} className="flex items-start gap-3">
              <div className={dot()} />
              <div>
                <p className="text-sm text-white/80">{entry.message}</p>
                <p className="mt-0.5 text-xs text-[#92929D]">{formatTimestamp(entry.createdAt)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
