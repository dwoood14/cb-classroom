import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Users, ChevronDown, FileText, Calendar as CalIcon, Pencil, CheckCircle2, Eye, Download, Fingerprint, Monitor, ListChecks, Check, X, Lock, MoreHorizontal } from "lucide-react";
import { IconBtn } from "@/components/ui/icon-btn";
import { FilterPill } from "@/components/ui/filter-pill";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalendarGrid } from "@/components/ui/calendar-grid";
import { activityDays, type Activity, type ActivityDayRow } from "@/data/activity";
import * as LucideIcons from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  FileText: LucideIcons.FileText,
  Calendar: LucideIcons.Calendar,
  Pencil: LucideIcons.Pencil,
  CheckCircle2: LucideIcons.CheckCircle2,
  Eye: LucideIcons.Eye,
  Download: LucideIcons.Download,
  Fingerprint: LucideIcons.Fingerprint,
  Monitor: LucideIcons.Monitor,
  ListChecks: LucideIcons.ListChecks,
};

import React from "react";

const months = ["Jan", "Feb", "March", "April", "May", "June", "Jul"];

const dotPresent = new Set([1, 2, 5, 7, 14]);
const dotAbsent = new Set([6]);
const dotEvents = new Set([9, 14, 20, 26, 29, 30]);

export function StudentActivityContent() {
  const [selectedDay, setSelectedDay] = useState(9);
  const [selectedMonth, setSelectedMonth] = useState("Feb");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedDay, selectedMonth]);
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-panel rounded-r-[24px]">
      {/* Top bar */}
      <PageHeader
        breadcrumbs={
          <>
            <span className="text-muted-foreground">Techerly</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Students</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Activity</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white text-[10px] font-medium">A</div>
            <span className="text-foreground font-medium flex items-center gap-1">Amirbaqian <ChevronDown className="w-3.5 h-3.5" /></span>
          </>
        }
      />

      <div className="px-8 pt-6 pb-8 flex-1 grid grid-cols-[1fr_360px] gap-8">
        {/* LEFT — Activity Calendar */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold">Activity Calendar</h2>
            <FilterPill />
          </div>

          {/* Month tabs */}
          <div className="flex items-center gap-2 mb-6">
            <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {months.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  m === selectedMonth ? "bg-foreground text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m}
              </button>
            ))}
            <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Day rows */}
          <div className={`space-y-5 transition-opacity duration-300 ${isLoading ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
            {activityDays.map((row) => (
              <DayRowComp key={row.day} row={row} selectedDay={selectedDay} />
            ))}
          </div>
        </section>

        {/* RIGHT */}
        <aside className="flex flex-col gap-6">
          <MiniCalendar selectedDay={selectedDay} onSelectDay={setSelectedDay} />
          <UpcomingEvents />
        </aside>
      </div>
    </div>
  );
}



function DayRowComp({ row, selectedDay }: { row: ActivityDayRow; selectedDay: number }) {
  const isCurrent = row.day === selectedDay;
  return (
    <div className="flex gap-5 items-start border-t border-border/60 pt-4">
      <div className="w-8 flex justify-center pt-2 shrink-0">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
            isCurrent ? "bg-foreground text-white" : "text-muted-foreground"
          }`}
        >
          {row.day}
        </div>
      </div>
      {row.events.length === 0 ? (
        <div className="flex-1 py-2 text-sm text-muted-foreground">{row.label}</div>
      ) : (
        <div className="flex-1 flex flex-wrap gap-3">
          {row.events.map((e, i) => (
            <ActivityChip key={i} ev={e} />
          ))}
        </div>
      )}
    </div>
  );
}

function ActivityChip({ ev }: { ev: Activity }) {
  const Icon = iconMap[ev.icon] ?? LucideIcons.FileText;
  return (
    <div className={`${ev.tone} rounded-xl p-2.5 pr-4 flex items-center gap-3 min-w-[200px]`}>
      <div className={`w-9 h-9 rounded-lg ${ev.iconBg} flex items-center justify-center`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-medium">{ev.title}</p>
        <p className="text-xs text-muted-foreground">{ev.time}</p>
      </div>
    </div>
  );
}

function MiniCalendar({ selectedDay, onSelectDay }: { selectedDay: number; onSelectDay: (d: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-base font-semibold">February</span>
          <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <FilterPill />
      </div>

      <CalendarGrid
        selectedDay={selectedDay}
        renderDay={(day, isSelected) => (
          <button
            onClick={() => onSelectDay(day)}
            className="flex flex-col justify-center items-center py-1 w-full cursor-pointer hover:bg-black/5 rounded-lg transition-colors"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors ${
                isSelected ? "bg-foreground text-white font-semibold" : "text-muted-foreground/80"
              }`}
            >
              {day}
            </div>
            <div className="h-1.5 flex items-center justify-center gap-0.5">
              {dotPresent.has(day) && <Check className="w-2 h-2 text-emerald-500" strokeWidth={4} />}
              {dotAbsent.has(day) && <X className="w-2 h-2 text-rose-500" strokeWidth={4} />}
              {dotEvents.has(day) && <span className="w-1 h-1 rounded-full bg-orange-500" />}
            </div>
          </button>
        )}
      />

      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />Present <span className="font-semibold text-foreground">6</span></span>
        <span className="flex items-center gap-1.5"><X className="w-3 h-3 text-rose-500" strokeWidth={3} />Absent <span className="font-semibold text-foreground">2</span></span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500" />Events <span className="font-semibold text-foreground">9</span></span>
      </div>
    </div>
  );
}

function UpcomingEvents() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Upcoming events</h3>
        <FilterPill />
      </div>
      <div className="space-y-3">
        <UpcomingCard tone="bg-violet-200" title="Math Exam" date="10 Feb · 7:30am → 9:00am" days={2} />
        <UpcomingCard tone="bg-amber-200" title="English Exam" date="10 Feb · 7:30am → 9:00am" days={2} />
        <UpcomingCard tone="bg-sky-200" title="Math Assignment" date="12 Feb · 7:30am → 9:00am" days={4} />
      </div>
    </div>
  );
}

function UpcomingCard({ tone, title, date, days }: { tone: string; title: string; date: string; days: number }) {
  return (
    <div className={`${tone} rounded-2xl p-4 flex flex-col gap-2`}>
      <div className="flex items-start justify-between">
        <div className="leading-tight">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{date}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-white/70 text-[11px] font-medium">{days} Days left</span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}
