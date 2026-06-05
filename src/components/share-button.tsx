import { useState } from 'react'
import { Check, Copy, Share2 } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { Button } from './ui/button'

const inlineActions = tv({ base: 'flex items-center gap-1.5 sm:gap-2' })
const stackedActions = tv({ base: 'flex flex-col gap-2' })
const whatsappButton = tv({
  base: 'border-green-700 text-green-400 hover:bg-green-500/10',
})

type ShareButtonProps = {
  slug: string
  /** Toolbar: compact buttons on sm+ only. Page: full-width buttons on mobile only. */
  placement?: 'toolbar' | 'page'
}

export function ShareButton({ slug, placement = 'toolbar' }: ShareButtonProps) {
  const url = `${window.location.origin}/event/${slug}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(`Join my event on SquadPlan: ${url}`)}`
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  if (placement === 'page') {
    return (
      <div className={`${stackedActions()} sm:hidden`}>
        <Button variant="outline" className="w-full justify-center" onClick={copyLink}>
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Guest link copied!' : 'Copy guest link'}
        </Button>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button variant="outline" className={`w-full justify-center ${whatsappButton()}`}>
            <Share2 className="h-4 w-4" />
            Share on WhatsApp
          </Button>
        </a>
      </div>
    )
  }

  return (
    <div className={`${inlineActions()} hidden sm:flex`}>
      <Button variant="outline" size="sm" onClick={copyLink} aria-label={copied ? 'Link copied' : 'Copy link'}>
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
      <a href={waUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className={whatsappButton()} aria-label="Share on WhatsApp">
          <Share2 className="h-4 w-4" />
          WhatsApp
        </Button>
      </a>
    </div>
  )
}
