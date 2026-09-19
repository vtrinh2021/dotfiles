// Marquee pattern from 21st.dev "Testimonials 13" (auto-scroll, pause on
// hover), rebuilt in plain CSS so it ships without extra dependencies.
import { Star } from 'lucide-react'

const reviews = [
  {
    quote: 'Two weeks in and the flakes at my cheek line are gone. First product that treated it like skin.',
    name: 'Marcus T.',
    detail: '4 months on the ritual',
  },
  {
    quote: 'I stopped scratching in meetings. My beard also sits flatter, which I did not expect.',
    name: 'Devon R.',
    detail: 'Recovery Cream No. 04',
  },
  {
    quote: 'The bar replaced two washes and a scrub. My bathroom shelf finally fits my razor again.',
    name: 'Sam K.',
    detail: 'Cleansing Bar No. 01',
  },
  {
    quote: 'Dermatologist shrugged at my beardruff. Sixty days of this and I stopped wearing dark shirts to hide it.',
    name: 'Andre W.',
    detail: 'The Full Ritual',
  },
  {
    quote: 'No smell, no grease, sinks in before my coffee brews. That is the whole review.',
    name: 'Paul N.',
    detail: 'Recovery Cream No. 04',
  },
  {
    quote: 'Scalp serum ended a decade of white specks on black hoodies. I bought three backups.',
    name: 'Jerome L.',
    detail: 'Scalp Serum No. 07',
  },
]

function ReviewCard({ review }) {
  return (
    <figure className="w-[320px] shrink-0 rounded-3xl border border-ink/10 bg-parchment p-6">
      <div className="flex text-brass" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-ink">{review.quote}</blockquote>
      <figcaption className="mt-4 text-xs text-ink-soft">
        <span className="font-semibold text-ink">{review.name}</span> · Verified buyer · {review.detail}
      </figcaption>
    </figure>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-parchment-deep/60 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4">
        <p className="eyebrow text-brass-deep">Reviews</p>
        <h2 className="font-display mt-4 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
          2,140 men checked their collars.
        </h2>
      </div>
      <div className="marquee mt-12 overflow-hidden" aria-label="Customer reviews">
        <div className="marquee-track flex w-max gap-5 px-4">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
