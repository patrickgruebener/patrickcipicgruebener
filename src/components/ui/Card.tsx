import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Kept for compatibility. Cards carry no hover effect in the Werkstatt style. */
  hover?: boolean;
  /** Recommended package: 2px blue frame instead of the hairline (moodboard .pkg.rec-pkg). */
  highlighted?: boolean;
}

// Hairline frame, 4px radius, no shadow (moodboard .pkg)
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hover, highlighted = false, children, ...props }, ref) => {
    // hover is accepted for API compatibility, cards have no hover effect
    void hover;
    const frame = highlighted ? 'border-2 border-brand-blue' : 'border border-line';

    return (
      <div ref={ref} className={`rounded-[4px] bg-paper text-ink ${frame} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`grid gap-3 p-6 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

/** Short blue note above a card title, e.g. the audience of a package. */
export function CardFlag({ className = '', children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`text-[13px] font-bold text-brand-blue ${className}`} {...props}>
      {children}
    </span>
  );
}

interface CardPriceProps extends HTMLAttributes<HTMLDivElement> {
  unit?: string;
}

/** Price set in the display face with a small text unit (moodboard .pkg .price). */
export function CardPrice({ unit, className = '', children, ...props }: CardPriceProps) {
  return (
    <div
      className={`font-display text-[64px] leading-none font-[820] tabular-nums ${className}`}
      {...props}
    >
      {children}
      {unit && <small className="ml-1.5 font-text text-[15px] font-normal text-ink-2">{unit}</small>}
    </div>
  );
}
