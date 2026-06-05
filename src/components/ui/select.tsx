import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import { tv } from 'tailwind-variants'

const trigger = tv({
  base: 'flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#1b1b1f] px-3 py-2 text-sm text-white outline-none focus:border-[#E97F18]',
})

const content = tv({
  base: 'z-50 overflow-hidden rounded-lg border border-white/10 bg-[#1b1b1f] shadow-lg',
})

const item = tv({
  base: 'relative flex cursor-pointer select-none items-center rounded px-8 py-2 text-sm text-[#92929D] outline-none data-[highlighted]:bg-[#141416] data-[highlighted]:text-white',
})

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
}

export function Select({ value, onValueChange, placeholder, options }: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className={trigger()}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4 text-[#92929D]" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={content()}>
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item key={option.value} value={option.value} className={item()}>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
