import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import { invitation, venueLocation } from '../config'
import { useInView } from '../hooks/useInView'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const goldIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="
    width: 44px; height: 44px;
    background: linear-gradient(145deg, #e8d48b, #c9a227);
    border: 3px solid #f7f0e3;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 8px 24px rgba(201,162,39,0.5);
    display: flex; align-items: center; justify-content: center;
  "><span style="transform: rotate(45deg); font-size: 18px;">🎓</span></div>`,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -44],
})

export default function LocationMap() {
  const mapRef = useRef(null)
  const containerRef = useRef(null)
  const [sectionRef, mapVisible] = useInView(0.1)

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !mapVisible) return

    const map = L.map(containerRef.current, {
      center: [venueLocation.lat, venueLocation.lng],
      zoom: venueLocation.zoom,
      scrollWheelZoom: false,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map)

    L.marker([venueLocation.lat, venueLocation.lng], { icon: goldIcon })
      .addTo(map)
      .bindPopup(
        `<strong style="color:#e8d48b">${invitation.venue}</strong><br/><span style="opacity:0.85">${invitation.address}</span>`,
      )

    mapRef.current = map
    setTimeout(() => map.invalidateSize(), 300)

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [mapVisible])

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${venueLocation.lat},${venueLocation.lng}`

  return (
    <section id="location" ref={sectionRef} className="relative z-10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          icon={MapPin}
          title="Find Us There"
          subtitle="Megenagna Across — tap for directions"
        />

        <Reveal variant="scale" delay={150} duration={800}>
          <div className="glass-card glow-ring overflow-hidden rounded-2xl p-2 sm:p-3">
            <div
              ref={containerRef}
              className="h-[320px] w-full rounded-xl sm:h-[420px]"
              role="img"
              aria-label={`Map showing ${invitation.venue}`}
            />
          </div>
        </Reveal>

        <Reveal variant="up" delay={300} className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-[family-name:var(--font-sans)] text-sm text-[#0a0f1a]"
          >
            <Navigation className="h-4 w-4" />
            Get Directions
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#c9a227]/25 px-5 py-2.5 font-[family-name:var(--font-sans)] text-sm text-[#f7f0e3]/70 transition hover:border-[#c9a227]/50 hover:text-[#e8d48b]"
          >
            <ExternalLink className="h-4 w-4" />
            Open in Maps
          </a>
        </Reveal>
      </div>
    </section>
  )
}
