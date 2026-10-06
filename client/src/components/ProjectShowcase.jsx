import { useEffect, useRef, useState } from 'react'
import './ProjectShowcase.css'

const projects = [
  { name: 'Malabar Honey', video: '/previews/honey-scroll.mp4', poster: '/previews/honey-0.jpg' },
  { name: 'Jersey007', video: '/previews/jersey-scroll.mp4', poster: '/previews/jersey-0.jpg' },
  { name: 'Novexa Business Setup', video: '/previews/novexa-scroll.mp4', poster: '/previews/novexa-poster.jpg' },
]

export default function ProjectShowcase() {
  const [index, setIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const player = useRef(null)
  const project = projects[index]

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(preference.matches)
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const video = player.current
    if (reducedMotion) {
      video.pause()
      return
    }
    // Preserve the recording's timing, and pause when it isn't being viewed.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.1 })
    const onVisibility = () => {
      if (document.hidden) video.pause()
      else {
        const rect = video.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight) video.play().catch(() => {})
      }
    }
    observer.observe(video)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [index, reducedMotion])

  return (
    <div className="project-walkthrough">
      <div className="project-walkthrough-caption">
        <span>SELECTED WORK · 0{index + 1} / 03</span>
        <b>{project.name}</b>
      </div>
      <div className="project-walkthrough-window">
        <video
          key={project.video}
          ref={player}
          src={project.video}
          poster={project.poster}
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          aria-label={`${project.name}: recorded homepage scrolling and animations`}
          onEnded={() => setIndex(current => (current + 1) % projects.length)}
        />
      </div>
    </div>
  )
}
