import { twMerge } from 'tailwind-merge'

export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(' '))
}

export function calcProgress(paid: number, target: number) {
  if (!target) return 0
  return Math.min(100, Math.round((paid / target) * 100))
}
