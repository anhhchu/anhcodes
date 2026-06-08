"use client";

import React, { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

// ===== Types and Interfaces =====
export interface iTestimonial {
  name: string;
  designation: string;
  description: string;
}

interface iCarouselProps {
  items: React.ReactElement<{
    testimonial: iTestimonial;
    index: number;
    layout?: boolean;
    onCardClose: () => void;
  }>[];
  initialScroll?: number;
}

// ===== Inline icons (palette-aware, no external dependency) =====
type IconProps = React.SVGProps<SVGSVGElement>;

const ArrowLeftIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CloseIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const QuoteIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M7.5 8C5.6 8 4 9.6 4 11.5S5.6 15 7.5 15c.3 0 .6 0 .9-.1-.4 1.4-1.5 2.5-2.9 3-.3.1-.5.4-.4.7.1.3.4.5.7.4 2.8-.8 4.7-3.4 4.7-6.4V11.5C10.5 9.6 9.4 8 7.5 8Zm9 0C14.6 8 13 9.6 13 11.5S14.6 15 16.5 15c.3 0 .6 0 .9-.1-.4 1.4-1.5 2.5-2.9 3-.3.1-.5.4-.4.7.1.3.4.5.7.4 2.8-.8 4.7-3.4 4.7-6.4V11.5C19.5 9.6 18.4 8 16.5 8Z" />
  </svg>
);

// ===== Custom Hooks =====
const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      onOutsideClick();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

// Derive up to two initials from a person's name for the monogram avatar.
const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

// ===== Components =====
const Monogram = ({ name, large = false }: { name: string; large?: boolean }) => (
  <div
    className={cn(
      "flex flex-none items-center justify-center rounded-full border border-line bg-canvas",
      large ? "h-[90px] w-[90px] md:h-[150px] md:w-[150px]" : "h-12 w-12",
    )}
  >
    <span
      className={cn(
        "font-display font-semibold tracking-tight text-ink",
        large ? "text-3xl md:text-5xl" : "text-base",
      )}
    >
      {getInitials(name)}
    </span>
  </div>
);

const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handleScrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 16;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className="relative mt-2 w-full">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-5 [scrollbar-width:none]"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="flex flex-row justify-start gap-4">
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
              key={`card-${index}`}
              className="rounded-3xl last:pr-[5%] md:last:pr-[20%]"
            >
              {React.cloneElement(item, {
                onCardClose: () => handleCardClose(index),
              })}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          aria-label="Previous testimonial"
          className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-ink transition-colors duration-200 hover:bg-ink/80 disabled:opacity-40"
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
        >
          <ArrowLeftIcon className="h-5 w-5 text-canvas" />
        </button>
        <button
          aria-label="Next testimonial"
          className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-ink transition-colors duration-200 hover:bg-ink/80 disabled:opacity-40"
          onClick={handleScrollRight}
          disabled={!canScrollRight}
        >
          <ArrowRightIcon className="h-5 w-5 text-canvas" />
        </button>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
  layout = false,
  onCardClose = () => {},
}: {
  testimonial: iTestimonial;
  index: number;
  layout?: boolean;
  onCardClose?: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCollapse();
      }
    };

    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
    }

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50 h-screen overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-ink/40 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              ref={containerRef}
              layoutId={layout ? `card-${testimonial.name}` : undefined}
              className="relative z-[60] mx-auto h-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-surface p-6 md:mt-10 md:p-12"
            >
              <button
                aria-label="Close"
                className="sticky top-0 ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-ink"
                onClick={handleCollapse}
              >
                <CloseIcon className="h-5 w-5 text-canvas" />
              </button>
              <Monogram name={testimonial.name} />
              <p className="mt-6 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                {testimonial.name}
              </p>
              <p className="mt-1 text-sm italic text-muted">
                {testimonial.designation}
              </p>
              <div className="relative mt-8 text-lg leading-relaxed text-ink/80 md:text-xl">
                <QuoteIcon className="mb-3 h-7 w-7 text-line" />
                {testimonial.description}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${testimonial.name}` : undefined}
        onClick={handleExpand}
        aria-label={`Read ${testimonial.name}'s testimonial`}
        whileHover={{
          rotate: index % 2 === 0 ? 1.5 : -1.5,
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <div className="relative z-10 flex h-[420px] w-72 flex-col items-center justify-center overflow-hidden rounded-3xl border border-line bg-surface px-7 text-center shadow-sm md:h-[440px] md:w-80">
          <Monogram name={testimonial.name} large />
          <QuoteIcon className="mt-6 h-6 w-6 text-line" />
          <p className="mt-2 text-balance text-base leading-relaxed text-ink/80 md:text-lg">
            {testimonial.description.length > 150
              ? `${testimonial.description.slice(0, 150).trimEnd()}…`
              : testimonial.description}
          </p>
          <p className="mt-5 font-display text-lg font-medium tracking-tight text-ink">
            {testimonial.name}
          </p>
          <p className="mt-1 text-sm italic text-muted">
            {testimonial.designation.length > 32
              ? `${testimonial.designation.slice(0, 32).trimEnd()}…`
              : testimonial.designation}
          </p>
        </div>
      </motion.button>
    </>
  );
};

export { Carousel, TestimonialCard, Monogram };
