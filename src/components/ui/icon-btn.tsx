import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dot?: boolean
}

const IconBtn = React.forwardRef<HTMLButtonElement, IconBtnProps>(
  ({ className, children, dot, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground/80 transition-colors",
          className
        )}
        {...props}
      >
        {children}
        {dot && <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />}
      </button>
    )
  }
)
IconBtn.displayName = "IconBtn"

export { IconBtn }
