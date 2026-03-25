"use client";
// import {RotatingText} from "@/components/ui/rotating-text";

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

export const HeroParallax = ({
  title,
  description,
  products,
}: {
  title: string;
  description: string;
  products: Product[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = {
    stiffness: 300,
    damping: 30,
    bounce: 0,
  };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -700]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.12], [40, 0]),
    springConfig
  );

  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.12], [-10, 0]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.12], [0.3, 1]),
    springConfig
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.12], [-300, 0]),
    springConfig
  );

  return (
    <section
      ref={ref}
      className={`
        relative overflow-hidden antialiased
        flex flex-col
        py-16 md:py-24
        [perspective:1000px] [transform-style:preserve-3d]
        min-h-[180vh] md:min-h-[200vh]
      `}
    >
      <Header title={title} description={description} />

      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="mt-6 md:mt-10"
      >
        <motion.div className="mb-6 md:mb-8 flex flex-row-reverse gap-4 md:gap-8">
          {firstRow.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>

        <motion.div className="mb-6 md:mb-8 flex flex-row gap-4 md:gap-8">
          {secondRow.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              translate={translateXReverse}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row-reverse gap-4 md:gap-8">
          {thirdRow.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pt-4 pb-8 md:pb-12 z-50">
      <h1 className="text-3xl font-bold md:text-6xl dark:text-white">
        {title}
      </h1>

      <p className="mt-4 max-w-2xl text-sm md:mt-6 md:text-lg dark:text-neutral-200">
        {description}
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -12 }}
      className={`
        group/product relative shrink-0 overflow-hidden rounded-2xl
        h-56 w-[16rem]
        sm:h-64 sm:w-[18rem]
        md:h-72 md:w-[22rem]
        lg:h-80 lg:w-[26rem]
      `}
    >
      <div className="block h-full w-full">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover object-left-top"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover/product:opacity-100" />

      <h2 className="absolute bottom-4 left-4 text-white opacity-0 transition-opacity duration-300 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
};