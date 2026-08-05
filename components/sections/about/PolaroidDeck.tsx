import Image from "next/image";
import AnimatedContent from "@/components/ui/AnimatedContent";

export interface PolaroidCard {
  src: string;
  caption: string;
  rotate: string;
  offset: string;
  zIndex: string;
}

export const PolaroidDeck = ({ cards }: { cards: PolaroidCard[] }) => {
  return (
    <div className="relative w-full h-[240px] sm:h-[300px] md:h-[350px] overflow-visible mt-8 md:mt-0">
      {cards.map(({ src, caption, rotate, offset, zIndex }, index) => (
        <AnimatedContent
          key={caption}
          delay={index * 0.1}
          direction="vertical"
          distance={40}
          className={`absolute ${offset} ${zIndex}`}
        >
          <div
            className={`bg-nb-canvas p-2.5 sm:p-3 pb-8 sm:pb-12 border-[4px] border-nb-ink shadow-[6px_6px_0_var(--nb-ink)] transition-all duration-300 hover:scale-110 hover:-translate-y-4 cursor-pointer ${rotate}`}
          >
            <div className="relative w-46 h-46 sm:w-36 sm:h-36 md:w-56 md:h-56 lg:w-60 lg:h-60 border-[3px] border-nb-ink overflow-hidden pointer-events-none">
              <Image
                src={src}
                alt={caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 150px, 200px"
              />
            </div>
            <p className="absolute bottom-2 left-0 right-0 text-center font-syne text-[10px] sm:text-xs lg:text-sm font-bold text-nb-ink tracking-wide">
              {caption}
            </p>
          </div>
        </AnimatedContent>
      ))}
    </div>
  );
};
