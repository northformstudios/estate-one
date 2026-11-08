import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Luxury architectural easing curve: confident, smooth, organic deceleration
export const LUXURY_EASE = [0.19, 1.0, 0.22, 1.0] as const;
export const LUXURY_EASE_GENTLE = [0.25, 0.1, 0.25, 1.0] as const;

interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'mask';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * Architectural Reveal:
 * Calm, slow, editorial entrance triggered smoothly on scroll.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.85,
  className = '',
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount: threshold }}
        transition={{ duration: 0.2, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const getVariants = () => {
    switch (direction) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -24 },
          visible: { opacity: 1, y: 0 },
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0 },
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 },
        };
      case 'mask':
        return {
          hidden: { opacity: 0, clipPath: 'inset(12% 0% 0% 0%)', y: 16 },
          visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', y: 0 },
        };
      case 'up':
      default:
        return {
          hidden: { opacity: 0, y: 28 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * Stagger Container:
 * Orchestrates child entrances with a calculated rhythmic cadence.
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  initialDelay = 0,
  className = '',
  threshold = 0.12,
  once = true,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: initialDelay,
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export function StaggerItem({ children, className = '', yOffset = 20 }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.75,
            ease: LUXURY_EASE,
          },
        },
      };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

interface TypographyRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * Confident Editorial Typography Reveal:
 * Glides words upward from a masked baseline, mirroring luxury print monographs.
 */
export function TypographyReveal({
  children,
  as = 'h2',
  className = '',
  delay = 0,
  once = true,
}: TypographyRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = children.split(' ');

  if (shouldReduceMotion) {
    const Tag = as as any;
    return <Tag className={className}>{children}</Tag>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: 0.035,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: LUXURY_EASE,
      },
    },
  };

  const Component = as as any;

  return (
    <Component className={`${className} inline-block`}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.3 }}
        variants={containerVariants}
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-0"
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden py-[0.06em] -my-[0.06em]">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}

interface ArchitecturalImageMaskProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

/**
 * Architectural Image Mask:
 * Expands gently with a subtle de-scale from 1.08 to 1.0.
 */
export function ArchitecturalImageMask({
  src,
  alt,
  className = '',
  aspectRatio = '16/9',
  priority = false,
}: ArchitecturalImageMaskProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-neutral-900 ${className}`}
      style={{ aspectRatio }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
        whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1.0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1.1,
          ease: LUXURY_EASE_GENTLE,
        }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
