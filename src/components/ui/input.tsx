import { forwardRef, type ComponentProps, type FormEvent, type ChangeEvent } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const inputStyles = tv({
  base: 'w-full rounded-lg border border-white/10 bg-[#1b1b1f] px-3 py-2 text-sm text-white outline-none placeholder:text-[#92929D] focus:border-[#E97F18] disabled:opacity-50',
  variants: {
    variant: {
      default: '',
      suffix: 'pr-14',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputStyles> {}

function InputField(
  { className, variant, onChange, onInput, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  function handleInput(event: FormEvent<HTMLInputElement>) {
    onInput?.(event)
    onChange?.(event as ChangeEvent<HTMLInputElement>)
  }

  return (
    <input
      ref={ref}
      className={inputStyles({ variant, className })}
      onChange={onChange}
      onInput={handleInput}
      {...props}
    />
  )
}

export const Input = forwardRef(InputField)
Input.displayName = 'Input'
