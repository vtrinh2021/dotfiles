const columns = [
  {
    title: 'Shop',
    links: ['Cleansing Bar No. 01', 'Recovery Cream No. 04', 'Scalp Serum No. 07', 'The Full Ritual'],
  },
  {
    title: 'Learn',
    links: ['The formulary', 'Why beards itch', 'The ritual', 'Reviews'],
  },
  {
    title: 'Support',
    links: ['Shipping & returns', '60-day guarantee', 'Contact', 'FAQ'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-parchment">
      <div className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <img
              src="./westley-logo.webp"
              alt="Westley & Co"
              width="180"
              height="180"
              loading="lazy"
              className="w-40 rounded-2xl"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-parchment/60">
              Beard and scalp care built on five clinically studied botanicals.
              Formulated in small batches, printed in full on every label.
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow text-brass">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="text-sm text-parchment/70 transition-colors hover:text-parchment">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 border-t border-parchment/15 pt-6 text-xs text-parchment/50">
          <p>
            These statements have not been evaluated by the Food and Drug
            Administration. Our products are not intended to diagnose, treat,
            cure, or prevent any disease.
          </p>
          <p className="mt-3">© 2026 Westley &amp; Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
