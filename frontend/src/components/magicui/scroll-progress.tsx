'use client';

import { cn } from '../../lib/utils';
import { motion, type MotionProps, useScroll } from 'motion/react';
import React from 'react';

type ScrollProgressProps = Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>;

export const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();

    return (
      <motion.div
        ref={ref}
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-stone-400',
          className,
        )}
        style={{
          scaleX: scrollYProgress,
        }}
        {...props}
      />
    );
  },
);

ScrollProgress.displayName = 'ScrollProgress';
