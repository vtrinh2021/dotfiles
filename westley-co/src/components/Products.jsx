// Card layout adapted from the 21st.dev "Commerce Hero" category grid:
// rounded tiles, centered illustration, notched corner chip with an arrow.
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import {
  BarIllustration,
  DropperIllustration,
  JarIllustration,
  KitIllustration,
} from '../art.jsx'

const products = [
  {
    name: 'Cleansing Bar No. 01',
    blurb: 'Oatmeal wash bar for beard and face',
    price: '$18',
    badge: null,
    Art: BarIllustration,
  },
  {
    name: 'Recovery Cream No. 04',
    blurb: 'Daily barrier cream for the skin underneath',
    price: '$34',
    badge: 'Bestseller',
    Art: JarIllustration,
  },
  {
    name: 'Scalp Serum No. 07',
    blurb: 'Leave-in treatment for flaking scalps',
    price: '$38',
    badge: null,
    Art: DropperIllustration,
  },
  {
    name: 'The Full Ritual',
    blurb: 'All three, boxed. Save $11',
    price: '$79',
    badge: 'Kit',
    Art: KitIllustration,
  },
]

export default function Products() {
  return (
    <section id="shop" className="mx-auto w-full max-w-7xl px-4 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="eyebrow text-brass-deep">The range</p>
          <h2 className="font-display mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
            Three formulas. One shelf.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          Small catalog on purpose. Each formula covers one job in the ritual,
          and the kit covers all of them.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.name}
            className="group relative min-h-[360px] overflow-hidden rounded-3xl bg-parchment-deep transition-shadow duration-500 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
          >
            <a href="#shop" className="absolute inset-0 z-20 p-6" aria-label={`${product.name}, ${product.price}`}>
              {product.badge && (
                <span className="absolute left-6 top-6 rounded-full bg-ink px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-parchment">
                  {product.badge}
                </span>
              )}
              <div className="absolute inset-x-0 top-4 bottom-32 flex items-center justify-center p-8">
                <product.Art className="h-full max-h-[170px] w-auto transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="absolute inset-x-6 bottom-6 pr-16">
                <h3 className="font-display text-xl font-medium leading-tight">{product.name}</h3>
                <p className="mt-1 text-xs text-ink-soft">{product.blurb}</p>
                <p className="mt-2 text-sm font-semibold">{product.price}</p>
              </div>
              <div className="absolute bottom-0 right-0 z-10 flex h-16 w-16 items-center justify-center rounded-tl-2xl border-l border-t border-ink/10 bg-parchment">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-oat transition-all duration-300 group-hover:scale-110 group-hover:bg-ink group-hover:text-parchment">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
