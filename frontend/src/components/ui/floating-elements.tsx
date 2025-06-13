import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FloatingElement({ 
  children, 
  className, 
  delay = 0, 
  duration = 3 
}: FloatingElementProps) {
  return (
    <div
      className={cn(
        "animate-float",
        className
      )}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  )
}

interface OrbitingElementProps {
  children: React.ReactNode
  className?: string
  radius?: number
  duration?: number
  delay?: number
}

export function OrbitingElement({
  children,
  className,
  radius = 50,
  duration = 20,
  delay = 0
}: OrbitingElementProps) {
  return (
    <div
      className={cn(
        "absolute animate-orbit",
        className
      )}
      style={{
        "--radius": `${radius}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}