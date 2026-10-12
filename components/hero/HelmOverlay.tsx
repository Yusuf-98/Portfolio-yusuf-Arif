import {
  HELM_VIEWBOX,
  HELM_LATITUDE_LINES,
  HELM_MERIDIAN_LINES,
  HELM_OUTLINE_LEFT,
  HELM_OUTLINE_RIGHT,
  HELM_Y_TOP,
  HELM_Y_BOTTOM,
  HELM_N_BANDS,
} from './helmGeometry';

// --- Helm Wireframe Overlay ---

type HelmOverlayProps = {
  className?: string;
  cycleDurationMs?: number;
};

const HOLOGRAM = '#414651';

// --- Geometry helpers ---
function pointsToPath(points: [number, number][]) {
  return points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');
}

function bandForLevel(level: number) {
  return Math.min(HELM_N_BANDS - 1, Math.floor(level * HELM_N_BANDS));
}

function bandForY(y: number) {
  const level = (y - HELM_Y_TOP) / (HELM_Y_BOTTOM - HELM_Y_TOP);
  return bandForLevel(Math.max(0, Math.min(1, level)));
}

// --- Band paths ---
const bandPaths = new Map<
  string,
  { band: number; width: number; d: string[] }
>();

function addPath(band: number, width: number, d: string) {
  const key = `${band}-${width}`;
  const entry = bandPaths.get(key) ?? { band, width, d: [] };
  entry.d.push(d);
  bandPaths.set(key, entry);
}

function addSegments(points: [number, number][], width: number) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    addPath(
      bandForY((y1 + y2) / 2),
      width,
      `M${x1.toFixed(2)},${y1.toFixed(2)} L${x2.toFixed(2)},${y2.toFixed(2)}`
    );
  }
}

HELM_LATITUDE_LINES.forEach((line) =>
  addPath(bandForLevel(line.level), 1.5, pointsToPath(line.points))
);
HELM_MERIDIAN_LINES.forEach((line) =>
  addSegments(line.points, line.isRim ? 3 : 1.5)
);
addSegments(HELM_OUTLINE_LEFT, 3);
addSegments(HELM_OUTLINE_RIGHT, 3);

const PATHS = [...bandPaths.values()].map((p) => ({
  key: `${p.band}-${p.width}`,
  band: p.band,
  width: p.width,
  d: p.d.join(' '),
}));

// --- Band keyframes ---
const PEAK_SPAN = HELM_N_BANDS + 1;

function bandOpacity(band: number, peak: number) {
  return Math.max(0, 1 - 0.5 * Math.abs(band - peak));
}

function bandKeyframes(band: number) {
  const center = ((band + 1) / PEAK_SPAN) * 100;
  const half = (2 / PEAK_SPAN) * 100;
  const stops: [number, number][] = [[0, bandOpacity(band, -1)]];
  if (center - half > 0) stops.push([center - half, 0]);
  stops.push([center, 1]);
  if (center + half < 100) stops.push([center + half, 0]);
  stops.push([100, bandOpacity(band, HELM_N_BANDS)]);
  const body = stops
    .map(([at, op]) => `${at.toFixed(3)}%{opacity:${op.toFixed(3)}}`)
    .join('');
  return `@keyframes helm-band-${band}{${body}}`;
}

const KEYFRAMES = Array.from({ length: HELM_N_BANDS }, (_, b) =>
  bandKeyframes(b)
).join('');

export default function HelmOverlay({
  className,
  cycleDurationMs = 3600,
}: HelmOverlayProps) {
  return (
    <svg
      viewBox={`0 0 ${HELM_VIEWBOX.width} ${HELM_VIEWBOX.height}`}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      preserveAspectRatio='xMidYMid meet'
    >
      {/* Band animation */}
      <style>{KEYFRAMES}</style>

      {/* Wireframe bands */}
      {PATHS.map((p) => (
        <path
          key={p.key}
          d={p.d}
          stroke={HOLOGRAM}
          strokeWidth={p.width}
          fill='none'
          strokeLinecap='round'
          style={{
            opacity: 0,
            animation: `helm-band-${p.band} ${cycleDurationMs}ms linear infinite`,
          }}
        />
      ))}
    </svg>
  );
}
