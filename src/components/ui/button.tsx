import { forwardRef, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'inline-flex items-center justify-center gap-1.5 rounded-[10px] text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default: 'bg-[#E97F18] text-white hover:bg-[#d56f10]',
      outline: 'border border-white/20 text-white hover:bg-white/10',
      ghost: 'text-[#92929D] hover:bg-white/10 hover:text-white',
    },
    size: {
      default: 'px-4 py-2',
      sm: 'px-3 py-1.5 text-xs',
      icon: 'p-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonStyles> {}

function ButtonField({ className, variant, size, ...props }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  return <button ref={ref} className={buttonStyles({ variant, size, className })} {...props} />
}

export const Button = forwardRef(ButtonField)
Button.displayName = 'Button'
