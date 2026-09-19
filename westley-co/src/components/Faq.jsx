import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Who is this for?',
    a: 'Men with itch, flakes, or redness under a beard or on the scalp. If your skin is calm and you only want shine or hold, a styling product serves you better than we do.',
  },
  {
    q: 'How fast does it work?',
    a: 'Itch settles within days because oatmeal works on contact. Flakes take one to two weeks. Redness follows the barrier, so give it the full four weeks before you judge.',
  },
  {
    q: 'Is it safe for sensitive skin?',
    a: 'The formulas are fragrance-free, steroid-free, and pH-matched to skin. Tea tree oil is dosed at the studied 5%, below common irritation thresholds. Patch test on the inner arm if your skin reacts to new products.',
  },
  {
    q: 'What did you leave out?',
    a: 'Fragrance, essential-oil blends, drying alcohols, sulfates, and menthol. Cooling tingles read as relief while irritating the barrier you are trying to repair.',
  },
  {
    q: 'What if it does not work for me?',
    a: 'Every order carries the 60-day guarantee. Write to support@westleyandco.com with your order number and we refund in full, empty jars included.',
  },
]

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="font-display text-lg font-medium sm:text-xl">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-brass-deep"
        >
          <Plus className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-10 text-sm leading-relaxed text-ink-soft">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-20 sm:py-24">
      <p className="eyebrow text-center text-brass-deep">Questions</p>
      <h2 className="font-display mt-4 text-center text-4xl font-medium tracking-tight sm:text-5xl">
        Before you ask
      </h2>
      <div className="mt-10 border-t border-ink/10">
        {faqs.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  )
}
