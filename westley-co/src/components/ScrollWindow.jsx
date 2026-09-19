// Adapted from 21st.dev "Smooth Scroll Hero" by @ishamsu.
// Changes from the original: scroll progress is measured against this
// section's own ref (the original read global scrollY, which only works at
// the top of a page), the clip window opens onto an inline SVG scene instead
// of remote photos, an overlay caption fades in as the window opens, and the
// whole effect collapses to a static full frame under reduced motion.
import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { heroDesktop, heroMobile } from '../art.jsx'

export default function ScrollWindow() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const clipStart = useTransform(scrollYProgress, [0, 0.85], [30, 0])
  const clipEnd = useTransform(scrollYProgress, [0, 0.85], [70, 100])
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`
  const backgroundSize = useTransform(scrollYProgress, [0, 1], ['165%', '100%'])
  const captionOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1])
  const captionY = useTransform(scrollYProgress, [0.55, 0.85], [28, 0])

  const frameStyle = reduceMotion
    ? {}
    : { clipPath, willChange: 'transform, opacity' }
  const sizeStyle = reduceMotion ? { backgroundSize: 'cover' } : { backgroundSize }

  return (
    <section ref={ref} className="relative w-full" style={{ height: 'calc(1100px + 100vh)' }} aria-label="The formulary">
      <motion.div className="sticky top-0 h-screen w-full overflow-hidden bg-moss-deep" style={frameStyle}>
        <motion.div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url("${heroMobile}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            ...sizeStyle,
          }}
        />
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url("${heroDesktop}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            ...sizeStyle,
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
          style={{ background: 'linear-gradient(to top, rgba(20,31,25,0.92), rgba(20,31,25,0))' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 pb-14 text-center"
          style={reduceMotion ? {} : { opacity: captionOpacity, y: captionY }}
        >
          <p className="eyebrow text-brass">The short version</p>
          <p className="font-display mx-auto mt-3 max-w-xl px-6 text-2xl text-parchment sm:text-3xl">
            Five botanicals. One job: calm the skin underneath.
          </p>
          <a
            href="#formulary"
            className="mt-6 inline-flex h-11 items-center rounded-full border border-parchment/40 px-6 text-sm font-medium text-parchment transition-colors hover:bg-parchment hover:text-ink"
          >
            Read the formulary
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
