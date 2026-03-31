"use client";

import HeroHeader from "@/components/ui/hero-header";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

type HeroSectionWithParallaxProps = {
  products: Product[];
};

function useViewportWidth() {
  const [width, setWidth] = React.useState<number>(0);

  React.useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return width;
}

export default function HeroSectionWithParallax({
  products,
}: HeroSectionWithParallaxProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative z-20">
        <HeroHeader />
      </div>

      {/* <div
        className={`
          pointer-events-none relative z-10
          -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-40 xl:-mt-48
        `}
      >
        <HeroParallax products={products} />
      </div> */}

    </section>
  );
}

export const HeroParallax = ({
  products,
}: {
  products: Product[];
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const viewportWidth = useViewportWidth();
  const [measuredHeight, setMeasuredHeight] = React.useState<number>(0);

  const isMobile = viewportWidth > 0 && viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1280;

  const filledProducts = React.useMemo(() => {
    if (products.length === 0) return [];

    const targetCount = isMobile ? 15 : 21;
    const repeated: Product[] = [];

    let i = 0;
    while (repeated.length < targetCount) {
      const product = products[i % products.length];
      repeated.push({
        ...product,
        id: repeated.length,
      });
      i += 1;
    }

    return repeated;
  }, [products, isMobile]);

  const firstRow = isMobile
    ? filledProducts.slice(0, 5)
    : filledProducts.slice(0, 7);

  const secondRow = isMobile
    ? filledProducts.slice(5, 10)
    : filledProducts.slice(7, 14);

  const thirdRow = isMobile
    ? filledProducts.slice(10, 15)
    : filledProducts.slice(14, 21);

  const scrollOffset = isMobile
  ? ["start 0.9", "end start"]
  : isTablet
  ? ["start 0.85", "end start"]
  : ["start 0.8", "end start"];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end start"],
  });

  const springConfig = {
    stiffness: 220,
    damping: 28,
    bounce: 0,
  };

  const forwardStart = isMobile ? 0 : isTablet ? -200 : -320;
  const forwardEnd = isMobile ? 280 : isTablet ? 620 : 980;

  const reverseStart = 0;
  const reverseEnd = isMobile ? -220 : isTablet ? -460 : -760;

  const rotateXStart = isMobile ? 30 : isTablet ? 20 : 26;
  const rotateZStart = isMobile ? -20 : isTablet ? -10 : -13;

  const opacityStart = isMobile ? 0.75 : 0.58;
  const translateYStart = -200;
  const translateYEnd = isMobile ? 50 : isTablet ? 150 : 220;

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [forwardStart, forwardEnd]),
    springConfig
  );

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [reverseStart, reverseEnd]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.14], [rotateXStart, 0]),
    springConfig
  );

  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.14], [rotateZStart, 0]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.12], [opacityStart, 1]),
    springConfig
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.14], [translateYStart, translateYEnd]),
    springConfig
  );

  React.useEffect(() => {
    if (!innerRef.current) return;

    const element = innerRef.current;

    const updateHeight = () => {
      const rect = element.getBoundingClientRect();
      const buffer = isMobile ? 40 : isTablet ? 60 : 80;
      setMeasuredHeight(Math.ceil(rect.height + translateYEnd + buffer));
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(element);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [translateYEnd, isMobile, isTablet, filledProducts.length]);

  const fallbackHeight = isMobile ? 520 : isTablet ? 760 : 980;

  const parallaxInnerClasses = isMobile
    ? `
        relative left-[-10%] w-[135%] origin-center
      `
    : isTablet
    ? `
        relative left-[-16%] w-[150%] origin-center
      `
    : `
        relative left-[-22%] w-[168%] origin-center
      `;

  const rowGapClasses = isMobile
    ? "gap-3"
    : isTablet
    ? "gap-5"
    : "gap-6 xl:gap-8";

  const secondRowOffsetClasses = isMobile
    ? "mb-4 ml-4 flex flex-row"
    : isTablet
    ? "mb-5 ml-8 flex flex-row"
    : "mb-6 ml-12 flex flex-row xl:ml-16";

  const thirdRowOffsetClasses = isMobile
    ? "ml-2 flex flex-row-reverse"
    : isTablet
    ? "ml-6 flex flex-row-reverse"
    : "ml-8 flex flex-row-reverse xl:ml-12";

  return (
    <section
      ref={ref}
      style={{ height: measuredHeight || fallbackHeight }}
      className={`
        relative w-full
        [perspective:1200px] [transform-style:preserve-3d]
      `}
    >
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className={parallaxInnerClasses}
      >
        <div ref={innerRef}>
          <motion.div
            className={`
              mb-4 flex flex-row-reverse
              ${rowGapClasses}
            `}
          >
            {firstRow.map((product, index) => (
              <ProductCard
                key={`row1-${product.id}-${index}`}
                product={product}
                translate={translateX}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </motion.div>

          <motion.div
            className={`
              ${secondRowOffsetClasses}
              ${rowGapClasses}
            `}
          >
            {secondRow.map((product, index) => (
              <ProductCard
                key={`row2-${product.id}-${index}`}
                product={product}
                translate={translateXReverse}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </motion.div>

          <motion.div
            className={`
              ${thirdRowOffsetClasses}
              ${rowGapClasses}
            `}
          >
            {thirdRow.map((product, index) => (
              <ProductCard
                key={`row3-${product.id}-${index}`}
                product={product}
                translate={translateX}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export const ProductCard = ({
  product,
  translate,
  isMobile,
  isTablet,
}: {
  product: Product;
  translate: MotionValue<number>;
  isMobile: boolean;
  isTablet: boolean;
}) => {
  const width = isMobile
    ? "clamp(8.5rem, 30vw, 11rem)"
    : isTablet
    ? "clamp(11rem, 20vw, 16rem)"
    : "clamp(16rem, 20vw, 28rem)";

  const height = isMobile
    ? "clamp(5.75rem, 18vw, 7.5rem)"
    : isTablet
    ? "clamp(7.5rem, 13vw, 10.5rem)"
    : "clamp(10.5rem, 15vw, 18rem)";

  return (
    <motion.div
      style={{
        x: translate,
        width,
        height,
      }}
      whileHover={isMobile ? undefined : { y: -12 }}
      className={`
        group/product relative shrink-0 overflow-hidden
        rounded-[1rem] md:rounded-[1.25rem] lg:rounded-[1.5rem]
        shadow-[0_18px_42px_rgba(0,0,0,0.18)]
        lg:shadow-[0_22px_60px_rgba(0,0,0,0.22)]
        will-change-transform
      `}
    >
      <div className="relative h-full w-full">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-black/18" />

      <div
        className={`
          pointer-events-none absolute inset-0 bg-black/50
          opacity-0 transition-opacity duration-300
          group-hover/product:opacity-100
        `}
      />

      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 lg:p-5">
        <h2
          className={`
            translate-y-2 text-sm font-medium text-white opacity-0
            transition-all duration-300
            group-hover/product:translate-y-0
            group-hover/product:opacity-100
            md:text-base lg:text-lg
          `}
        >
          {product.title}
        </h2>
      </div>
    </motion.div>
  );
};