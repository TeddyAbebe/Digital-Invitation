import { useState } from 'react'
import { Heart, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { sendWish } from '../utils/wishes'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

export default function WishForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !message.trim()) {
      setError('Please enter your name and a message.')
      return
    }

    setStatus('sending')
    try {
      sendWish({ name, message })
      setStatus('sent')
      setName('')
      setMessage('')
    } catch {
      setStatus('idle')
      setError('Could not send. Please try again.')
    }
  }

  return (
    <section id="wishes" className="relative z-10 px-6 py-20 pb-28">
      <div className="mx-auto max-w-xl">
        <SectionHeader
          icon={Heart}
          title="Send Your Wishes"
          subtitle="Share your love and congratulations"
        />

        <Reveal variant="scale" delay={200} duration={700}>
          <form onSubmit={handleSubmit} className="glass-card glow-ring rounded-2xl p-6 sm:p-8">
            <Reveal variant="up" delay={300}>
              <label className="mb-2 block font-[family-name:var(--font-sans)] text-xs tracking-[0.2em] text-[#e8d48b]/70 uppercase">
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                maxLength={80}
                className="input-glow mb-5 w-full rounded-xl border border-[#c9a227]/25 bg-[#0a0f1a]/60 px-4 py-3 font-[family-name:var(--font-sans)] text-[#f7f0e3] outline-none transition placeholder:text-[#f7f0e3]/30 focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20"
              />
            </Reveal>

            <Reveal variant="up" delay={400}>
              <label className="mb-2 block font-[family-name:var(--font-sans)] text-xs tracking-[0.2em] text-[#e8d48b]/70 uppercase">
                Your message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Congratulations on this incredible milestone..."
                rows={5}
                maxLength={1000}
                className="input-glow mb-6 w-full resize-none rounded-xl border border-[#c9a227]/25 bg-[#0a0f1a]/60 px-4 py-3 font-[family-name:var(--font-sans)] text-[#f7f0e3] outline-none transition placeholder:text-[#f7f0e3]/30 focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20"
              />
            </Reveal>

            {error && (
              <p className="alert-shake mb-4 rounded-lg border border-red-400/30 bg-red-950/40 px-3 py-2 text-sm leading-relaxed text-red-200/95" role="alert">
                {error}
              </p>
            )}

            {status === 'sent' && (
              <p className="success-slide mb-4 flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-200/95">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Thank you! Your wish has been sent.
              </p>
            )}

            <Reveal variant="up" delay={500}>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-gold flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-[family-name:var(--font-sans)] font-medium disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Wish
                  </>
                )}
              </button>
            </Reveal>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
