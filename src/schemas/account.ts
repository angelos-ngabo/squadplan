import { z } from 'zod'

export const forgotEmailSchema = z.object({
  email: z.preprocess(
    (value) => (typeof value === 'string' ? value : ''),
    z.string().min(1, 'Email is required').email('Enter a valid email'),
  ),
})

export const forgotPasswordSchema = z
  .object({
    newPassword: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string().min(6, 'Password must be at least 6 characters'),
    ),
    confirmPassword: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string().min(1, 'Please confirm your password'),
    ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const changePasswordSchema = z
  .object({
    currentPassword: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string().min(1, 'Current password is required'),
    ),
    newPassword: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string().min(6, 'Password must be at least 6 characters'),
    ),
    confirmPassword: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string().min(1, 'Please confirm your new password'),
    ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const deleteAccountSchema = z
  .object({
    currentPassword: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string().min(1, 'Enter your password to confirm'),
    ),
    confirmText: z.preprocess(
      (value) => (typeof value === 'string' ? value : ''),
      z.string(),
    ),
  })
  .refine((data) => data.confirmText === 'DELETE', {
    message: 'Type DELETE to confirm',
    path: ['confirmText'],
  })

export type ForgotEmailInput = z.infer<typeof forgotEmailSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>
