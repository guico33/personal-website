import * as React from "react"
import { cn } from "../../lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        "py-16 px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
)
Section.displayName = "Section"

export { Section }