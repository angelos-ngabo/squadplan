import { LogOut, User } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import { useAuth } from '../hooks/useAuth'

export function AccountSettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { user, logout } = useAuth()

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Account settings"
      description="Your SquadPlan organizer profile."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#141416] p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E97F18]/15 text-[#E97F18]">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{user?.displayName || 'Organizer'}</p>
            <p className="text-sm text-[#92929D]">{user?.email || 'No email on file'}</p>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#141416] p-4 text-sm text-white/70">
          <p>Use this account to create and manage private event links. Guests join events without signing in.</p>
        </div>

        <Button
          variant="outline"
          className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
          onClick={() => {
            void logout()
            onOpenChange(false)
          }}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </Dialog>
  )
}
