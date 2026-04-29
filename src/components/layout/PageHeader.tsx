import * as React from "react"
import { Bell, MessageCircle, Search } from "lucide-react"
import { IconBtn } from "@/components/ui/icon-btn"

export function PageHeader({ breadcrumbs }: { breadcrumbs: React.ReactNode }) {
  return (
    <header className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-border/60">
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbs}
      </nav>
      <div className="flex items-center gap-2">
        <IconBtn><Bell className="w-4 h-4" strokeWidth={1.75} /></IconBtn>
        <IconBtn dot><MessageCircle className="w-4 h-4" strokeWidth={1.75} /></IconBtn>
        <IconBtn><Search className="w-4 h-4" strokeWidth={1.75} /></IconBtn>
      </div>
    </header>
  )
}
