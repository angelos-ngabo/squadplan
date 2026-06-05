import { forwardRef, type ChangeEvent, type ComponentProps, type FormEvent } from 'react'
import { tv } from 'tailwind-variants'

const textareaStyles = tv({
  base: 'w-full resize-none rounded-lg border border-white/10 bg-[#1b1b1f] px-3 py-2 text-sm text-white outline-none placeholder:text-[#92929D] focus:border-[#E97F18] disabled:opacity-50',
})

function TextareaField(
  { className, onChange, onInput, ...props }: ComponentProps<'textarea'>,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  function handleInput(event: FormEvent<HTMLTextAreaElement>) {
    onInput?.(event)
    onChange?.(event as ChangeEvent<HTMLTextAreaElement>)
  }

  return (
    <textarea
      ref={ref}
      className={textareaStyles({ className })}
      onChange={onChange}
      onInput={handleInput}
      {...props}
    />
  )
}

export const Textarea = forwardRef(TextareaField)
Textarea.displayName = 'Textarea'
