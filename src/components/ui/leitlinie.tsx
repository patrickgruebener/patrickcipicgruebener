interface LeitlinieProps {
  className?: string;
}

/** The one 4px brand gradient line per page or graphic. Decorative, hidden from assistive tech. */
export function Leitlinie({ className = '' }: LeitlinieProps) {
  return <hr aria-hidden="true" className={`m-0 h-1 border-0 bg-brand-gradient ${className}`} />;
}
