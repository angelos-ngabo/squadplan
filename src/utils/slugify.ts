import { nanoid } from 'nanoid'

export function slugify(text: string) {
  const base = (text || 'event')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)

  return `${base || 'event'}-${nanoid(8)}`
}
