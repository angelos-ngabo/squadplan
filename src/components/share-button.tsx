import { useState } from 'react'
import { Check, Copy, Share2 } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { Button } from './ui/button'

const actions = tv({ base: 'flex items-center gap-2' })
const whatsappButton = tv({
  base: 'border-green-700 text-green-400 hover:bg-green-500/10',
})

export function ShareButton({ slug }: { slug: string }) {
  const url = `${window.location.origin}/event/${slug}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(`Join my event on SquadPlan: ${url}`)}`
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={actions()}>
      <Button variant="outline" size="sm" onClick={copyLink}>
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
      <a href={waUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className={whatsappButton()}>
          <Share2 className="h-4 w-4" />
          WhatsApp
        </Button>
      </a>
    </div>
  )
}
