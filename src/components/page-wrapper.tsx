import { type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const wrapper = tv({ base: 'max-w-[1216px] mx-auto px-6 py-10' })

export function PageWrapper({ children }: { children: ReactNode }) {
  return <div className={wrapper()}>{children}</div>
}
