import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

// Important modifiers: unlayered rules in globals.css (button reset, *:focus-visible) beat Tailwind
// utilities. They stay untouched because /lernraum and /dasneuewir rely on them.
const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-[3px]! focus-visible:outline-brand-blue!';

// Primary: solid blue, white text, gradient only as 3px bottom edge (moodboard .btn)
const PRIMARY =
  'relative overflow-hidden rounded-[3px] bg-brand-blue! font-[650] text-white no-underline ' +
  'transition-colors hover:bg-brand-blue-dark! motion-reduce:transition-none ' +
  "after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-brand-gradient after:content-['']";

// Secondary: text link with green underline (moodboard .link-2)
const SECONDARY =
  'font-semibold text-ink underline decoration-brand-green decoration-2 underline-offset-[5px]';

// Ghost: quiet text action without underline, for tertiary actions
const GHOST = 'font-semibold text-ink-2 hover:text-ink transition-colors motion-reduce:transition-none';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: PRIMARY,
  secondary: SECONDARY,
  ghost: GHOST,
};

// Moodboard knows two sizes: header (sm) and default (md). lg maps to the default.
const PRIMARY_SIZES: Record<ButtonSize, string> = {
  sm: 'px-[18px] pt-[10px] pb-[11px] text-[15px]',
  md: 'px-6 pt-[14px] pb-[15px] text-[17px]',
  lg: 'px-6 pt-[14px] pb-[15px] text-[17px]',
};

const TEXT_SIZES: Record<ButtonSize, string> = {
  sm: 'text-[15px]',
  md: 'text-[17px]',
  lg: 'text-[17px]',
};

/** Class names for a button look, usable on links (`<Link className={buttonStyles()}>`). */
export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className = '',
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  const sizes = variant === 'primary' ? PRIMARY_SIZES : TEXT_SIZES;
  return `inline-flex items-center justify-center gap-2.5 font-text cursor-pointer ${FOCUS} ${VARIANTS[variant]} ${sizes[size]} ${className}`.trim();
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', asChild, children, ...props }, ref) => {
    // asChild is accepted for API compatibility but not forwarded to the DOM
    void asChild;
    return (
      <button ref={ref} className={buttonStyles({ variant, size, className })} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
