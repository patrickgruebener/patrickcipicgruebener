import { useId } from 'react';

export interface FlowDimension {
  /** Index of the first step the dimension line spans (0-based). */
  from: number;
  /** Index of the last step the dimension line spans (0-based, inclusive). */
  to: number;
  label: string;
}

interface FlowSketchProps {
  steps: string[];
  /** Text after the dashed continuation, e.g. "ihr macht weiter". */
  tail?: string;
  dimensions?: FlowDimension[];
  /** Accessible description of the whole sequence. */
  label: string;
  className?: string;
}

// Geometry taken 1:1 from the moodboard flow SVG (viewBox 580 x 250 for 4 steps, 2 dimensions)
const X0 = 20;
const STEP = 100;
const TAIL = 140;
const BAR_Y = 96;
const TICK_TOP = 80;
const TICK_BOTTOM = 126;
const DIM_Y0 = 160;
const DIM_GAP = 40;
const INK = '#0B1233';
const INK_2 = '#4A5372';
const STOPS = ['#0426CB', '#0060BF', '#0A86AF', '#3DA899', '#65C87A'];

const stepX = (index: number) => X0 + index * STEP;

/** Depth of the dotted extension line below each step boundary. */
function extensionDepths(dimensions: FlowDimension[]): Map<number, number> {
  const depths = new Map<number, number>();
  dimensions.forEach((dim, index) => {
    const y = DIM_Y0 + index * DIM_GAP + 6;
    for (const x of [stepX(dim.from), stepX(dim.to + 1)]) {
      depths.set(x, Math.max(depths.get(x) ?? 0, y));
    }
  });
  return depths;
}

/** Process sketch: gradient progress bar, step ticks and dimension lines instead of number circles. */
export function FlowSketch({ steps, tail, dimensions = [], label, className = '' }: FlowSketchProps) {
  const uid = useId().replace(/:/g, '');
  const gradientId = `flow-grad-${uid}`;
  const arrowId = `flow-arrow-${uid}`;
  const barEnd = stepX(steps.length);
  const width = barEnd + (tail ? TAIL : 0) + X0;
  const height = DIM_Y0 + dimensions.length * DIM_GAP + 10;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        className="block h-auto w-full min-w-[520px] sm:min-w-0"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            {STOPS.map((color, i) => (
              <stop key={color} offset={i / (STOPS.length - 1)} stopColor={color} />
            ))}
          </linearGradient>
          <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9" fill="none" stroke={INK} strokeWidth="1.2" />
          </marker>
        </defs>
        <g fill={INK} className="font-text">
          <rect x={X0} y={BAR_Y} width={barEnd - X0} height="14" fill={`url(#${gradientId})`} />
          {tail && (
            <>
              <line x1={barEnd} y1={BAR_Y + 7} x2={barEnd + TAIL} y2={BAR_Y + 7} stroke={INK} strokeWidth="1.2" strokeDasharray="4 4" />
              <text x={barEnd + TAIL / 2} y="88" textAnchor="middle" fontSize="14" fill={INK_2}>{tail}</text>
            </>
          )}
          <g stroke={INK} strokeWidth="1.2">
            {[...steps.keys(), steps.length].map((i) => (
              <line key={i} x1={stepX(i)} y1={TICK_TOP} x2={stepX(i)} y2={TICK_BOTTOM} />
            ))}
          </g>
          {steps.map((step, i) => (
            <g key={step} textAnchor="middle">
              <text x={stepX(i) + STEP / 2} y="44" fontSize="12" fill={INK_2} className="font-mono-brand">{i + 1}</text>
              <text x={stepX(i) + STEP / 2} y="70" fontSize="15" fontWeight="700">{step}</text>
            </g>
          ))}
          {dimensions.map((dim, i) => {
            const y = DIM_Y0 + i * DIM_GAP;
            const x1 = stepX(dim.from);
            const x2 = stepX(dim.to + 1);
            return (
              <g key={dim.label}>
                <line x1={x1} y1={y} x2={x2} y2={y} stroke={INK} strokeWidth="1" markerStart={`url(#${arrowId})`} markerEnd={`url(#${arrowId})`} />
                <text x={(x1 + x2) / 2} y={y + 22} textAnchor="middle" fontSize="13" fill={INK_2}>{dim.label}</text>
              </g>
            );
          })}
          {[...extensionDepths(dimensions)].map(([x, y]) => (
            <line key={x} x1={x} y1={TICK_BOTTOM} x2={x} y2={y} stroke={INK} strokeWidth=".6" strokeDasharray="2 3" />
          ))}
        </g>
      </svg>
    </div>
  );
}
