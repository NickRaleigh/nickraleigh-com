import { Picture } from "@/types/base";
import Image from "next/image";
import { bem } from "@/utils/helpers";

type CardProps = {
  readonly imgs: Picture[];
  readonly flip?: boolean;
};

export function Card({ imgs, flip = false }: CardProps) {
  return (
    <div className={bem("mosaic", { mirror: flip })}>
      {imgs.map((m, a) => (
        <span
          key={`${m}-${a}`}
          className={bem("mosaic__pane", {
            large: a === 0,
            fadeRight: a === 1,
            wide: a === 2,
            square: a === 3,
          })}
        >
          <Image
            className="nav__logo"
            src={m.src}
            alt={m.alt}
            width={m.width}
            height={m.height}
          />
        </span>
      ))}
    </div>
  );
}
