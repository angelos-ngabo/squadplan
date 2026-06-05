import * as DialogPrimitive from '@radix-ui/react-dialog'
import { type ComponentProps, type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const overlay = tv({ base: 'fixed inset-0 z-50 bg-black/70' })
const content = tv({
  base: 'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-[#1b1b1f] p-6 shadow-xl',
})
const title = tv({ base: 'text-lg font-semibold text-white' })
const description = tv({ base: 'mt-1 text-sm text-[#92929D]' })

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactNode
  title: string
  description?: string
  children: ReactNode
}

export function Dialog({ open, onOpenChange, trigger, title: dialogTitle, description: dialogDescription, children }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger> : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={overlay()} />
        <DialogPrimitive.Content className={content()}>
          <DialogPrimitive.Title className={title()}>{dialogTitle}</DialogPrimitive.Title>
          {dialogDescription ? (
            <DialogPrimitive.Description className={description()}>{dialogDescription}</DialogPrimitive.Description>
          ) : null}
          <div className="mt-4">{children}</div>
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg p-1 text-[#92929D] hover:bg-white/10 hover:text-white">
            <span className="sr-only">Close</span>
            ×
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export function DialogClose({ asChild = false, children, ...props }: ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close asChild={asChild} {...props}>
      {children}
    </DialogPrimitive.Close>
  )
}
