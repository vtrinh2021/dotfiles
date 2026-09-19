// Header adapted from 21st.dev "Commerce Hero" by @bankkroll:
// notched logo bar, inline nav, icon actions, slide-in mobile drawer.
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, ShoppingBasket, X } from 'lucide-react'

const navigation = [
  { name: 'Shop', href: '#shop' },
  { name: 'Ingredients', href: '#formulary' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
]

function Wordmark() {
  return (
    <a href="#top" className="font-display leading-none text-ink" aria-label="Westley & Co home">
      <span className="block text-2xl font-semibold tracking-tight">Westley</span>
      <span className="block text-[0.6rem] font-semibold tracking-[0.5em] text-ink-soft">&amp;CO</span>
    </a>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto w-full max-w-7xl px-3 pt-4 sm:px-4" id="top">
      <header className="flex items-center rounded-2xl bg-parchment-deep">
        <div className="flex w-full items-center gap-6 rounded-2xl rounded-br-2xl bg-parchment p-4 md:w-2/3 lg:w-3/5">
          <Wordmark />
          <nav className="hidden w-full items-center justify-between lg:flex" aria-label="Main">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {item.name}
              </a>
            ))}
            <button type="button" aria-label="Search" className="text-ink-soft transition-colors hover:text-ink">
              <Search className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Cart, 0 items" className="text-ink-soft transition-colors hover:text-ink">
              <ShoppingBasket className="h-5 w-5" />
            </button>
          </nav>
          <button
            type="button"
            className="ml-auto rounded-md p-2 text-ink lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <div className="ml-auto hidden items-center pr-4 md:flex">
          <a
            href="#shop"
            className="group flex items-center rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-sm font-medium text-parchment shadow-lg transition-shadow hover:shadow-xl"
          >
            Shop now
            <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-brass text-ink transition-transform duration-300 group-hover:scale-110">
              →
            </span>
          </a>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-[300px] bg-parchment p-6"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              role="dialog"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between border-b border-ink/10 pb-5">
                <Wordmark />
                <button
                  type="button"
                  className="rounded-md p-2 text-ink"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 py-5" aria-label="Mobile">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-parchment-deep"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <a
                href="#shop"
                onClick={() => setOpen(false)}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-medium text-parchment"
              >
                Shop now
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
