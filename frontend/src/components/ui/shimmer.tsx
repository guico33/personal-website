import { cn } from "@/lib/utils"

interface ShimmerProps {
  children: React.ReactNode
  className?: string
}

export function Shimmer({ children, className }: ShimmerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        className
      )}
    >
      {children}
    </div>
  )
}

// Add the keyframe to the CSS
export const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
`