import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Home, KeyRound, LayoutDashboard, Loader2, LogOut, Trash2, User } from 'lucide-react'
import { DashboardToolbar } from '../components/dashboard-toolbar'
import { PageWrapper } from '../components/page-wrapper'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import type { DashboardMenuItem } from '../components/dashboard-menu'
import { useAccountActions } from '../hooks/useAccountActions'
import { useAuth } from '../hooks/useAuth'
import {
  changePasswordSchema,
  deleteAccountSchema,
  type ChangePasswordInput,
  type DeleteAccountInput,
} from '../schemas/account'

const card = 'rounded-2xl border border-white/10 bg-[#1b1b1f] p-5 sm:p-6'
const label = 'text-sm font-medium text-[#92929D]'
const errorText = 'mt-1 text-xs text-red-400'

export function Settings() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { changePassword, deleteAccount, isChangingPassword, isDeletingAccount } = useAccountActions()
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [deleteError, setDeleteError] = useState('')

  const passwordForm = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema) as Resolver<ChangePasswordInput>,
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  const deleteForm = useForm<DeleteAccountInput>({
    resolver: zodResolver(deleteAccountSchema) as Resolver<DeleteAccountInput>,
    defaultValues: { currentPassword: '', confirmText: '' },
  })

  const menuItems: DashboardMenuItem[] = [
    { type: 'link', label: 'My events', icon: LayoutDashboard, to: '/app' },
    { type: 'link', label: 'Home', icon: Home, to: '/' },
    { type: 'divider' },
    {
      label: 'Log out',
      icon: LogOut,
      destructive: true,
      onSelect: () => void logout(),
    },
  ]

  async function onChangePassword(data: ChangePasswordInput) {
    setPasswordError('')
    setPasswordMessage('')
    try {
      await changePassword(data.currentPassword, data.newPassword)
      setPasswordMessage('Password updated successfully.')
      passwordForm.reset()
    } catch (err) {
      setPasswordError((err as Error).message)
    }
  }

  async function onDeleteAccount(data: DeleteAccountInput) {
    setDeleteError('')
    try {
      await deleteAccount(data.currentPassword)
      navigate('/')
    } catch (err) {
      setDeleteError((err as Error).message)
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#141416]">
      <DashboardToolbar menuItems={menuItems} />

      <PageWrapper>
        <Link to="/app" className="inline-flex items-center gap-1 text-sm text-[#92929D] hover:text-[#E97F18]">
          ← My events
        </Link>

        <h1 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">Account settings</h1>
        <p className="mt-2 text-sm text-[#92929D]">Manage your profile, password, and account security.</p>

        <div className="mt-8 space-y-6">
          <section className={card}>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E97F18]/15 text-[#E97F18]">
                <User className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-white">Profile</h2>
                <p className="mt-1 text-sm text-[#92929D]">Your organizer account details</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-[#92929D]">Name</dt>
                    <dd className="mt-0.5 font-medium text-white">{user?.displayName || 'Organizer'}</dd>
                  </div>
                  <div>
                    <dt className="text-[#92929D]">Email</dt>
                    <dd className="mt-0.5 break-all font-medium text-white">{user?.email || 'No email on file'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <section className={card}>
            <div className="mb-4 flex items-center gap-3">
              <KeyRound className="h-5 w-5 text-[#E97F18]" />
              <div>
                <h2 className="text-lg font-semibold text-white">Change password</h2>
                <p className="text-sm text-[#92929D]">Update your sign-in password</p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={passwordForm.handleSubmit(onChangePassword)}>
              <label className="block">
                <span className={label}>Current password</span>
                <div className="mt-1">
                  <Input type="password" autoComplete="current-password" {...passwordForm.register('currentPassword')} />
                </div>
                {passwordForm.formState.errors.currentPassword ? (
                  <span className={errorText}>{passwordForm.formState.errors.currentPassword.message}</span>
                ) : null}
              </label>
              <label className="block">
                <span className={label}>New password</span>
                <div className="mt-1">
                  <Input type="password" autoComplete="new-password" {...passwordForm.register('newPassword')} />
                </div>
                {passwordForm.formState.errors.newPassword ? (
                  <span className={errorText}>{passwordForm.formState.errors.newPassword.message}</span>
                ) : null}
              </label>
              <label className="block">
                <span className={label}>Confirm new password</span>
                <div className="mt-1">
                  <Input type="password" autoComplete="new-password" {...passwordForm.register('confirmPassword')} />
                </div>
                {passwordForm.formState.errors.confirmPassword ? (
                  <span className={errorText}>{passwordForm.formState.errors.confirmPassword.message}</span>
                ) : null}
              </label>

              {passwordMessage ? <p className="text-sm text-green-400">{passwordMessage}</p> : null}
              {passwordError ? <p className={errorText}>{passwordError}</p> : null}

              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Save new password
              </Button>
            </form>
          </section>

          <section className={`${card} border-red-500/20`}>
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div>
                <h2 className="text-lg font-semibold text-white">Delete account</h2>
                <p className="text-sm text-[#92929D]">
                  Permanently remove your account and all events you created. This cannot be undone.
                </p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={deleteForm.handleSubmit(onDeleteAccount)}>
              <label className="block">
                <span className={label}>Confirm with your password</span>
                <div className="mt-1">
                  <Input type="password" autoComplete="current-password" {...deleteForm.register('currentPassword')} />
                </div>
                {deleteForm.formState.errors.currentPassword ? (
                  <span className={errorText}>{deleteForm.formState.errors.currentPassword.message}</span>
                ) : null}
              </label>
              <label className="block">
                <span className={label}>Type DELETE to confirm</span>
                <div className="mt-1">
                  <Input placeholder="DELETE" {...deleteForm.register('confirmText')} />
                </div>
                {deleteForm.formState.errors.confirmText ? (
                  <span className={errorText}>{deleteForm.formState.errors.confirmText.message}</span>
                ) : null}
              </label>

              {deleteError ? <p className={errorText}>{deleteError}</p> : null}

              <Button
                type="submit"
                variant="outline"
                className="border-red-500/40 text-red-400 hover:bg-red-500/10"
                disabled={isDeletingAccount}
              >
                {isDeletingAccount ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete my account
              </Button>
            </form>
          </section>
        </div>
      </PageWrapper>
    </div>
  )
}
