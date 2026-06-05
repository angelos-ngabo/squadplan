import { type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const badge = tv({
  base: 'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
  variants: {
    tone: {
      green: 'border-green-500/20 bg-green-500/10 text-green-400',
      amber: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
      red: 'border-red-500/20 bg-red-500/10 text-red-400',
      violet: 'border-[#E97F18]/20 bg-[#E97F18]/10 text-[#E97F18]',
      zinc: 'border-white/10 bg-white/5 text-[#92929D]',
    },
    dot: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    tone: 'zinc',
    dot: false,
  },
})

const dotColor = tv({
  variants: {
    tone: {
      green: 'bg-green-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
      violet: 'bg-[#E97F18]',
      zinc: 'bg-[#92929D]',
    },
  },
})

type BadgeVariants = VariantProps<typeof badge>

export interface BadgeProps extends Omit<ComponentProps<'span'>, 'color'>, BadgeVariants {
  color?: BadgeVariants['tone']
}

export function Badge({ className, color = 'zinc', dot, children, ...props }: BadgeProps) {
  return (
    <span className={badge({ tone: color, dot, className })} {...props}>
      {dot ? <span className={dotColor({ tone: color, className: 'h-1.5 w-1.5 rounded-full' })} /> : null}
      {children}
    </span>
  )
}
