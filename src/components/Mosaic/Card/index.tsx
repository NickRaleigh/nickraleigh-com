import { Picture } from "@/types/base";
import Image from "next/image";
import { bem } from "@/utils/helpers";

type CardProps = {
  readonly imgs: Picture[];
  readonly flip?: boolean;
  // The soft blurred color wash sitting behind the split-column half of the
  // card in the design file (rect67/rect436: #E8A33D for Overture, #1872BB
  // for Westwood) — not part of any pane's own image, so it's drawn here.
  readonly glow: "amber" | "blue";
};

const PANE_CLASSES = ["full", "colB-top", "colB-bottom", "colC-top", "colC-bottom"] as const;

export function Card({ imgs, flip = false, glow }: CardProps) {
  return (
    <div className={bem("mosaic-wrap", { mirror: flip, [glow]: true })}>
      <span className="mosaic-wrap__glow" aria-hidden="true" />
      <div className={bem("mosaic", { mirror: flip })}>
        {imgs.map((m, a) => (
          <span key={m.src} className={bem("mosaic__pane", { [PANE_CLASSES[a]]: true })}>
            <Image src={m.src} alt={m.alt} width={m.width} height={m.height} />
          </span>
        ))}
      </div>
    </div>
  );
}
