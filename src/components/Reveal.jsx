import { useInView } from '../hooks/useInView'

const variants = {
  up: 'reveal-up',
  down: 'reveal-down',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
  fade: 'reveal-fade',
}

export default function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  duration = 700,
  as: Tag = 'div',
}) {
  const [ref, visible] = useInView()
  const animClass = variants[variant] || variants.up

  return (
    <Tag
      ref={ref}
      className={`${animClass} ${visible ? 'is-visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </Tag>
  )
}
