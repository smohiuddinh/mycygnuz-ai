'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const WHATSAPP_E164 = '923332357372'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      role="complementary"
      aria-label="WhatsApp contact"
    >
      <div
        id="whatsapp-float-panel"
        inert={!open}
        className={cn(
          'origin-bottom-right overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 p-4 text-white shadow-2xl backdrop-blur-md transition-all duration-200',
          open
            ? 'pointer-events-auto max-h-64 w-[min(100vw-2.5rem,20rem)] scale-100 opacity-100'
            : 'pointer-events-none max-h-0 w-[min(100vw-2.5rem,20rem)] scale-95 opacity-0'
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-white">Chat on WhatsApp</p>
            <p className="mt-1 text-xs text-zinc-400">
              Reach us for questions or project inquiries.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <WhatsAppIcon className="size-5" />
          Start chat
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        aria-expanded={open}
        aria-controls="whatsapp-float-panel"
        aria-label={open ? 'Close WhatsApp contact' : 'Open WhatsApp contact'}
      >
        {open ? (
          <X className="size-7" aria-hidden />
        ) : (
          <WhatsAppIcon className="size-7" />
        )}
      </button>
    </div>
  )
}
