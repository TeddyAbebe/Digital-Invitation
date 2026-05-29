import { telegram } from '../config'

function buildMessage({ name, message }) {
  return [
    '🎓 Graduation Wish',
    '',
    `From: ${name.trim()}`,
    '',
    message.trim(),
  ].join('\n')
}

/**
 * Opens a direct Telegram chat with @kalinata (personal DM, not a bot).
 * Guest taps Send once in Telegram — required by Telegram's platform rules.
 */
export function sendWish({ name, message }) {
  const text = encodeURIComponent(buildMessage({ name, message }))
  const url = `https://t.me/${telegram.username}?text=${text}`

  const opened = window.open(url, '_blank', 'noopener,noreferrer')

  // Mobile fallback if popup blocked
  if (!opened) {
    window.location.href = url
  }

  return { method: 'direct' }
}
