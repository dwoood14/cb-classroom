import { Bell, MessageCircle, Search, ChevronRight, Clock, SlidersHorizontal, Plus, Check, ChevronDown, MoreHorizontal, Pencil } from "lucide-react";

const hours = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
const days = ["1 - Mon", "2 - Tue", "3 - Wed", "4 - Thur", "5 - Fri", "6 - Sat", "7 - Sun"];

type Event = {
  dayIdx: number;
  startHour: number; // 6..15
  durationHours: number;
  title: string;
  time: string;
  tone: "purple" | "blue" | "yellow" | "green" | "indigo" | "pink";
  confirmed?: boolean;
};

const events: Event[] = [
  // Tue
  { dayIdx: 1, startHour: 7, durationHours: 1, title: "Math Exam", time: "7:00am - 7:40am", tone: "purple" },
  { dayIdx: 1, startHour: 7.5, durationHours: 1.5, title: "Art Exam", time: "7:30am - 9:00am", tone: "blue" },
  { dayIdx: 1, startHour: 10, durationHours: 1, title: "Physics Exam", time: "10:00am - 10:40am", tone: "indigo" },
  { dayIdx: 1, startHour: 10.83, durationHours: 1.5, title: "Sport Exam", time: "10:50am - 12:10pm", tone: "yellow", confirmed: true },
  // Thur
  { dayIdx: 3, startHour: 9, durationHours: 1, title: "Math Exam", time: "7:00am - 7:40am", tone: "purple" },
  { dayIdx: 3, startHour: 10, durationHours: 1.5, title: "Computer Exam", time: "7:30am - 9:00am", tone: "green", confirmed: true },
  // Sat
  { dayIdx: 5, startHour: 8, durationHours: 1, title: "Physics Exam", time: "10:00am - 10:40am", tone: "indigo" },
  { dayIdx: 5, startHour: 8.83, durationHours: 1.5, title: "Sport Exam", time: "10:50am - 12:10pm", tone: "pink", confirmed: true },
];

const toneStyles: Record<Event["tone"], string> = {
  purple: "bg-violet-100",
  blue: "bg-sky-100",
  indigo: "bg-indigo-100",
  yellow: "bg-amber-100",
  green: "bg-emerald-100",
  pink: "bg-rose-100",
};

const ROW_HEIGHT = 80; // px per hour
const START_HOUR = 6;

const filters = ["Math", "Art", "Physics", "Sport"];

export function ScheduleContent() {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-panel rounded-r-[24px]">
      {/* Top bar */}
      <header className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-border/60">
        <nav className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Maham</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          <Clock className="w-3.5 h-3.5 text-foreground" />
          <span className="text-foreground font-medium">Schedule</span>
        </nav>
        <div className="flex items-center gap-2">
          <IconBtn><Bell className="w-4 h-4" strokeWidth={1.75} /></IconBtn>
          <IconBtn dot><MessageCircle className="w-4 h-4" strokeWidth={1.75} /></IconBtn>
          <IconBtn><Search className="w-4 h-4" strokeWidth={1.75} /></IconBtn>
        </div>
      </header>

      {/* Toolbar */}
      <div className="px-8 pt-6 pb-4 flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold tracking-tight">01-07 January 2025</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="px-4 py-2 rounded-full bg-foreground text-white text-sm font-medium flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-foreground" strokeWidth={3} />
            </span>
            All
          </button>
          {filters.map((f) => (
            <button key={f} className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground hover:bg-muted/80">
              {f}
            </button>
          ))}
          <button className="px-4 py-2 rounded-full bg-muted text-sm text-foreground flex items-center gap-1.5">
            This week <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="px-4 py-2 rounded-full bg-muted text-sm text-foreground flex items-center gap-1.5">
            All <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="ml-2 flex items-center gap-2 px-3.5 py-2 rounded-full bg-muted text-sm">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            <span className="w-5 h-5 rounded-full bg-foreground text-white text-[11px] flex items-center justify-center font-medium">1</span>
          </button>
          <button className="px-4 py-2 rounded-full bg-foreground text-white text-sm font-medium flex items-center gap-1.5">
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="px-8 pb-8 overflow-x-auto">
        <div className="min-w-[1100px]">
          {/* Day headers */}
          <div className="grid" style={{ gridTemplateColumns: "70px repeat(7, 1fr)" }}>
            <div />
            {days.map((d, i) => (
              <div
                key={d}
                className={`text-center text-sm py-3 ${
                  i === 1
                    ? "bg-foreground text-white rounded-t-md font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="grid relative" style={{ gridTemplateColumns: "70px repeat(7, 1fr)" }}>
            {/* Time column */}
            <div className="flex flex-col">
              {hours.map((h) => (
                <div
                  key={h}
                  className="text-xs text-muted-foreground pr-3 text-right"
                  style={{ height: ROW_HEIGHT }}
                >
                  <span className="-translate-y-1.5 inline-block">{h}</span>
                </div>
              ))}
            </div>

            {/* Day columns */}
            {days.map((_, dayIdx) => (
              <div
                key={dayIdx}
                className={`relative border-l border-border/50 ${dayIdx === 5 ? "bg-muted/30" : ""}`}
              >
                {hours.map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-border/40"
                    style={{ height: ROW_HEIGHT }}
                  />
                ))}

                {/* Events */}
                {events
                  .filter((e) => e.dayIdx === dayIdx)
                  .map((e, idx) => {
                    const top = (e.startHour - START_HOUR) * ROW_HEIGHT;
                    const height = e.durationHours * ROW_HEIGHT - 4;
                    return (
                      <div
                        key={idx}
                        className={`absolute left-1.5 right-1.5 ${toneStyles[e.tone]} rounded-md p-2.5 flex flex-col gap-1.5 overflow-hidden`}
                        style={{ top, height }}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="leading-tight">
                            <p className="text-[13px] font-semibold text-foreground">{e.title}</p>
                            <p className="text-[11px] text-muted-foreground">{e.time}</p>
                          </div>
                          <button className="text-muted-foreground shrink-0">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {e.confirmed && (
                          <div className="mt-auto flex items-center justify-between">
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-[10px]">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center">
                                <Check className="w-1.5 h-1.5 text-white" strokeWidth={5} />
                              </span>
                              Confirmed
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}

                {/* Current time indicator on Tue */}
                {dayIdx === 1 && (
                  <div
                    className="absolute left-0 right-0 z-10 flex items-center"
                    style={{ top: (8.67 - START_HOUR) * ROW_HEIGHT }}
                  >
                    <span className="bg-foreground text-white text-[11px] font-medium px-2 py-0.5 rounded-md -translate-x-2">
                      8:40
                    </span>
                    <div className="flex-1 h-px bg-foreground" />
                  </div>
                )}

                {/* Pencil markers at bottom (around 14:30) */}
                {[1, 2, 3, 4, 6].includes(dayIdx) && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{ top: (14.5 - START_HOUR) * ROW_HEIGHT }}
                  >
                    <PencilDot dayIdx={dayIdx} />
                  </div>
                )}
                {dayIdx === 2 && (
                  <div
                    className="absolute left-[70%] -translate-x-1/2"
                    style={{ top: (14.5 - START_HOUR) * ROW_HEIGHT }}
                  >
                    <PencilDot dayIdx={2} variant />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IconBtn({ children, dot }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <button className="relative w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground/80">
      {children}
      {dot && <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />}
    </button>
  );
}

function PencilDot({ dayIdx, variant }: { dayIdx: number; variant?: boolean }) {
  const colors = ["bg-amber-100 text-amber-700", "bg-sky-100 text-sky-700", "bg-indigo-100 text-indigo-600", "bg-indigo-100 text-indigo-600", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-600"];
  const color = variant ? "bg-indigo-100 text-indigo-600" : colors[dayIdx] ?? "bg-muted text-foreground";
  return (
    <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center`}>
      <Pencil className="w-3 h-3" strokeWidth={2} />
    </div>
  );
}
