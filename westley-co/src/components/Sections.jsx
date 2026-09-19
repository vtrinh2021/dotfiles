import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export function AnnouncementBar() {
  return (
    <p className="bg-ink py-2 text-center text-xs font-medium tracking-wide text-parchment">
      Free U.S. shipping over $50 · 60-day money-back guarantee
    </p>
  )
}

export function HeroIntro() {
  return (
    <motion.section
      className="mx-auto w-full max-w-7xl px-4 pb-16 pt-14 text-center sm:pt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <p className="eyebrow text-brass-deep">Beard &amp; scalp care</p>
      <h1 className="font-display mx-auto mt-5 max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        Beard care that starts with the skin.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
        Itch, flakes, and redness begin at the skin barrier. Westley &amp; Co
        rebuilds it with five clinically studied botanicals. No steroids, no
        fragrance, no guesswork.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#shop"
          className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-medium text-parchment shadow-lg transition-shadow hover:shadow-xl"
        >
          Shop the range
        </a>
        <a
          href="#formulary"
          className="inline-flex h-12 items-center rounded-full border border-ink/20 px-7 text-sm font-medium text-ink transition-colors hover:border-ink"
        >
          See the ingredients
        </a>
      </div>
      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-soft">
        <span className="flex text-brass" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </span>
        <span>4.8 average from 2,140 reviews</span>
      </div>
    </motion.section>
  )
}

const problems = [
  {
    title: 'The flakes',
    body: 'Beardruff is rarely dry skin. A yeast called Malassezia feeds on skin oil and sheds the surface in visible flakes.',
  },
  {
    title: 'The itch',
    body: 'A cracked skin barrier lets irritants through. Nerve endings answer with the itch you feel three days into growth.',
  },
  {
    title: 'The redness',
    body: 'Scratching plus inflammation leaves blotches at the cheek line. Covering it up with oil traps the cause underneath.',
  },
]

export function Problem() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:py-24">
      <motion.div {...rise} className="max-w-2xl">
        <p className="eyebrow text-brass-deep">Why your beard itches</p>
        <h2 className="font-display mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          The itch is skin, not stubble.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ink-soft">
          Most beard products condition hair and ignore what it grows from.
          We formulate for the surface underneath, where the actual problems
          live.
        </p>
      </motion.div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            {...rise}
            transition={{ ...rise.transition, delay: i * 0.1 }}
            className="rounded-3xl border border-ink/10 bg-parchment-deep/60 p-7"
          >
            <h3 className="font-display text-2xl font-medium">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const formulary = [
  {
    no: 'No. 01',
    name: 'Colloidal oatmeal',
    role: 'Calms itch on contact. An FDA-recognized skin protectant used in eczema care for decades.',
  },
  {
    no: 'No. 02',
    name: 'Tea tree leaf oil',
    role: 'Keeps Malassezia in check at a 5% concentration shown to reduce flaking in clinical trials.',
  },
  {
    no: 'No. 03',
    name: 'Niacinamide',
    role: 'Rebuilds the lipid barrier and evens redness, with visible change in four weeks of daily use.',
  },
  {
    no: 'No. 04',
    name: 'Plant squalane',
    role: 'Replaces lost skin lipids without clogging pores. Pressed from olives, identical to your own sebum.',
  },
  {
    no: 'No. 05',
    name: 'Panthenol',
    role: 'Pro-vitamin B5. Binds water into the skin and softens wiry hair from the follicle out.',
  },
]

export function Formulary() {
  return (
    <section id="formulary" className="bg-moss-deep py-20 text-parchment sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4">
        <motion.div {...rise} className="max-w-2xl">
          <p className="eyebrow text-brass">The formulary</p>
          <h2 className="font-display mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
            Five botanicals. Each one earns its line.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-parchment/70">
            Every ingredient is indexed, dosed at its studied concentration,
            and printed on the label. Nothing hides in a fragrance blend.
          </p>
        </motion.div>
        <div className="mt-12 divide-y divide-parchment/15 border-y border-parchment/15">
          {formulary.map((item, i) => (
            <motion.div
              key={item.no}
              {...rise}
              transition={{ ...rise.transition, delay: i * 0.06 }}
              className="grid gap-2 py-6 sm:grid-cols-[7rem_16rem_1fr] sm:gap-6"
            >
              <span className="font-display text-lg text-brass">{item.no}</span>
              <h3 className="font-display text-xl font-medium">{item.name}</h3>
              <p className="text-sm leading-relaxed text-parchment/70">{item.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    step: 'Wash',
    body: 'The Cleansing Bar lifts oil and loose flakes without stripping. Thirty seconds in the shower.',
  },
  {
    step: 'Treat',
    body: 'Recovery Cream on the skin under the beard, morning and night. Serum for the scalp if it flakes too.',
  },
  {
    step: 'Hold',
    body: 'Give it four weeks. Barriers rebuild on skin time, and most men see flakes stop by week two.',
  },
]

export function Ritual() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:py-24">
      <motion.div {...rise} className="max-w-2xl">
        <p className="eyebrow text-brass-deep">The ritual</p>
        <h2 className="font-display mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          Three steps. Ninety seconds a day.
        </h2>
      </motion.div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            {...rise}
            transition={{ ...rise.transition, delay: i * 0.1 }}
            className="rounded-3xl bg-parchment-deep/60 p-7"
          >
            <p className="font-display text-lg text-brass-deep">Step {i + 1}</p>
            <h3 className="font-display mt-1 text-2xl font-medium">{s.step}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function Guarantee() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:pb-24">
      <motion.div
        {...rise}
        className="rounded-3xl border border-brass/40 bg-parchment-deep/60 px-6 py-12 text-center sm:px-12"
      >
        <p className="eyebrow text-brass-deep">The Westley guarantee</p>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
          Sixty days. Use every product to the bottom of the jar.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          If your skin is not calmer by day sixty, write to us and we refund
          the order in full. Empty jars welcome. You pay nothing to return.
        </p>
        <a
          href="#shop"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-medium text-parchment shadow-lg transition-shadow hover:shadow-xl"
        >
          Start the ritual
        </a>
      </motion.div>
    </section>
  )
}
