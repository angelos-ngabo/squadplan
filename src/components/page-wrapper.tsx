import { type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const wrapper = tv({ base: 'mx-auto max-w-[1216px] px-4 py-6 sm:px-6 sm:py-10' })

export function PageWrapper({ children }: { children: ReactNode }) {
  return <div className={wrapper()}>{children}</div>
}
