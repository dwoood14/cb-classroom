import { useState, useEffect } from "react";

import { ChevronRight, ChevronLeft, BookOpen, Search, Plus, Check, BarChart3, MoreHorizontal } from "lucide-react";
import { IconBtn } from "@/components/ui/icon-btn";
import { FilterPill } from "@/components/ui/filter-pill";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalendarGrid } from "@/components/ui/calendar-grid";
import { examDays, type ExamCard, type ExamDayRow } from "@/data/exams";

const tones = {
  purple: { bg: "bg-violet-100", chipBg: "bg-white", text: "text-foreground" },
  yellow: { bg: "bg-amber-100", chipBg: "bg-white", text: "text-foreground" },
  pink: { bg: "bg-rose-100", chipBg: "bg-white", text: "text-foreground" },
  blue: { bg: "bg-sky-100", chipBg: "bg-white", text: "text-foreground" },
  green: { bg: "bg-emerald-100", chipBg: "bg-white", text: "text-foreground" },
  orange: { bg: "bg-orange-100", chipBg: "bg-white", text: "text-foreground" },
};

const months = ["Jan", "Feb", "March", "April", "May", "June", "Jul"];

const dotsOrange = new Set([1, 5, 20, 26, 29]);
const dotsBlue = new Set([9]);
const dotsBlack = new Set([14, 30]);

export function ExamsContent() {
  const [selectedDay, setSelectedDay] = useState(6);
  const [selectedMonth, setSelectedMonth] = useState("Feb");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API fetch delay
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
            <span className="text-muted-foreground">Maham</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <BookOpen className="w-3.5 h-3.5 text-foreground" />
            <span className="text-foreground font-medium">Exams</span>
          </>
        }
      />

      {/* Title row */}
      <div className="px-8 pt-6 pb-5 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Exams</h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            On the attendance page, you can easily track student attendance and monitor absences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground/70 hover:bg-muted/80">
            <Search className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button className="px-4 py-2 rounded-full bg-foreground text-white text-sm font-medium flex items-center gap-1.5">
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Add new exam
          </button>
        </div>
      </div>

      {/* Body grid: calendar on left, sidebar mini-cal + upcoming on right */}
      <div className="px-8 pb-8 flex-1 grid grid-cols-[1fr_360px] gap-6">
        {/* LEFT — Exam Calendar */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold">Exam Calendar</h2>
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
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${m === selectedMonth ? "bg-foreground text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
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
            {examDays.map((row) => (
              <DayRowComp key={row.day} row={row} selectedDay={selectedDay} />
            ))}
          </div>
        </section>

        {/* RIGHT */}
        <aside className="flex flex-col gap-6">
          <MiniCalendar selectedDay={selectedDay} onSelectDay={setSelectedDay} />
          <UpcomingExams />
        </aside>
      </div>
    </div>
  );
}



function DayRowComp({ row, selectedDay }: { row: ExamDayRow; selectedDay: number }) {
  const isCurrent = row.day === selectedDay;
  return (
    <div className="flex gap-5 items-start">
      <div className="w-8 flex justify-center pt-3 shrink-0">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${isCurrent ? "bg-foreground text-white" : "text-muted-foreground"
            }`}
        >
          {row.day}
        </div>
      </div>
      {row.exams.length === 0 ? (
        <div className="flex-1 py-4 border-t border-border/60 text-sm text-muted-foreground">
          {row.label}
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-3 gap-3">
          {row.exams.map((e, i) => (
            <ExamCardComp key={i} exam={e} />
          ))}
        </div>
      )}
    </div>
  );
}

function ExamCardComp({ exam }: { exam: ExamCard }) {
  const tone = tones[exam.tone];
  return (
    <div className={`${tone.bg} rounded-2xl p-3 flex flex-col gap-2`}>
      {/* Header chip */}
      <div className="flex items-center gap-2 px-1">
        <span className="px-2 py-1 rounded-md bg-white text-[11px] font-semibold">{exam.classId}</span>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{exam.className}</span>
          <span className="text-xs text-muted-foreground">{exam.time}</span>
        </div>
      </div>

      {/* Subject */}
      <div className="bg-white rounded-xl p-2.5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-foreground/70" strokeWidth={2} />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-medium">{exam.subject}</p>
          <p className="text-xs text-muted-foreground">{exam.grade}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/70 text-[11px]">
            <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />
            Confirmed
          </span>
          {exam.confirmed > 0 && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/70 text-[11px]">
              <span className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-2 h-2 text-white" strokeWidth={4} />
              </span>
              {exam.confirmed}
            </span>
          )}
        </div>
        <button className="text-muted-foreground">
          <MoreHorizontal className="w-4 h-4" />
        </button>
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
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors ${isSelected ? "bg-foreground text-white font-semibold" : "text-muted-foreground/80"
                }`}
            >
              {day}
            </div>
            <div className="h-1.5 flex items-center justify-center gap-0.5">
              {dotsOrange.has(day) && <span className="w-1 h-1 rounded-full bg-orange-500" />}
              {dotsBlue.has(day) && <span className="w-1 h-1 rounded-full bg-sky-500" />}
              {dotsBlack.has(day) && <span className="w-1 h-1 rounded-full bg-foreground" />}
            </div>
          </button>
        )}
      />

      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
        <span><span className="font-semibold text-foreground">9</span> Exams for this month</span>
      </div>
    </div>
  );
}

function UpcomingExams() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Upcoming exams</h3>
        <FilterPill />
      </div>
      <div className="space-y-3">
        <UpcomingCard tone="bg-violet-200" classId="302" subject="Math Exam" date="10 Feb · 7:30am → 9:00am" days={4} />
        <UpcomingCard tone="bg-emerald-200" classId="303" subject="English Exam" date="11 Feb · 7:30am → 9:00am" days={5} />
      </div>
    </div>
  );
}

function UpcomingCard({ tone, classId, subject, date, days }: { tone: string; classId: string; subject: string; date: string; days: number }) {
  return (
    <div className={`${tone} rounded-2xl p-4 flex items-start gap-3`}>
      <span className="px-2 py-1 rounded-md bg-white text-[11px] font-semibold">{classId}</span>
      <div className="flex-1 leading-tight">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{subject}</p>
          <span className="px-2 py-1 rounded-full bg-white/70 text-[11px] font-medium">{days} Days left</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{date}</p>
        <div className="flex justify-end mt-2">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
