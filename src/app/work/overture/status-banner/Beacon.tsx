/* ==========================================================================
   Beacon.tsx
   --------------------------------------------------------------------------
   Pulsing beacon dot. Ported from nr-symfony's status-banner/Beacon.tsx;
   the pulse is pure CSS (status-banner-demo.scss) so it honours
   prefers-reduced-motion.
   ========================================================================== */

interface BeaconProps {
  color?: string;
}

export function Beacon({ color }: BeaconProps) {
  const style = color ? { background: color } : undefined;

  return (
    <span className="sb__beacon" aria-hidden="true">
      <span className="sb__beacon__ring" style={style} />
      <span className="sb__beacon__dot" style={style} />
    </span>
  );
}
