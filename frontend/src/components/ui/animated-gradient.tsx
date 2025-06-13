import { cn } from "@/lib/utils"

interface AnimatedGradientProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedGradient({ children, className }: AnimatedGradientProps) {
  return (
    <div
      className={cn(
        "relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:400%_400%] animate-gradient-x",
        className
      )}
    >
      {children}
    </div>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x bg-[length:400%_400%]",
        className
      )}
    >
      {children}
    </span>
  )
}