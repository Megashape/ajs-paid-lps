import { Star } from 'lucide-react'

/** Visual 5★ row — no review counts, no Google/Yelp/BBB brand wording. */
export function StarRow({
  size = 14,
  className = 'text-amber-400',
}: {
  size?: number
  className?: string
}) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="fill-current shrink-0"
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  )
}
