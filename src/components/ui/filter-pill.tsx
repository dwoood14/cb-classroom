import * as React from "react"
import { SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FilterPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number
}

const FilterPill = React.forwardRef<HTMLButtonElement, FilterPillProps>(
  ({ className, count = 1, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted text-sm transition-colors hover:bg-muted/80",
          className
        )}
        {...props}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Filter</span>
        {count > 0 && (
          <span className="w-5 h-5 rounded-full bg-foreground text-white text-[11px] flex items-center justify-center font-medium">
            {count}
          </span>
        )}
      </button>
    )
  }
)
FilterPill.displayName = "FilterPill"

export { FilterPill }
