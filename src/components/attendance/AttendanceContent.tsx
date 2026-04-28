import { Bell, MessageCircle, Search, ChevronRight, ChevronLeft, Clock, SlidersHorizontal, Check, X, RotateCw } from "lucide-react";

type Student = { initials: string; name: string; color: string };

const attendanceList: Student[] = [
  { initials: "JW", name: "James Wilson", color: "bg-emerald-100 text-emerald-700" },
  { initials: "EC", name: "Emily Carter", color: "bg-emerald-100 text-emerald-700" },
  { initials: "SA", name: "Sarah Anderson", color: "bg-pink-100 text-pink-700" },
  { initials: "DR", name: "Daniel Roberts", color: "bg-red-100 text-red-700" },
  { initials: "OB", name: "Olivia Brown", color: "bg-orange-100 text-orange-700" },
  { initials: "MJ", name: "Matthew Johnson", color: "bg-purple-100 text-purple-700" },
  { initials: "LM", name: "Laura Miller", color: "bg-emerald-100 text-emerald-700" },
  { initials: "AT", name: "Andrew Taylor", color: "bg-foreground/10 text-foreground" },
  { initials: "SH", name: "Sophie Harris", color: "bg-emerald-100 text-emerald-700" },
  { initials: "JM", name: "Jessica Moore", color: "bg-emerald-100 text-emerald-700" },
  { initials: "RC", name: "Ryan Clark", color: "bg-emerald-100 text-emerald-700" },
  { initials: "EL", name: "Emma Lewis", color: "bg-purple-100 text-purple-700" },
];

const absences: Student[] = [
  { initials: "HT", name: "Hannah Turner", color: "bg-orange-100 text-orange-700" },
  { initials: "NW", name: "Nicholas White", color: "bg-blue-100 text-blue-700" },
  { initials: "VH", name: "Victoria Hall", color: "bg-emerald-100 text-emerald-700" },
  { initials: "KA", name: "Kevin Adams", color: "bg-foreground/10 text-foreground" },
];

const delayed: Student[] = [
  { initials: "LM", name: "Laura Miller", color: "bg-emerald-100 text-emerald-700" },
  { initials: "EL", name: "Emma Lewis", color: "bg-purple-100 text-purple-700" },
];

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
// 5 weeks layout matching February image (starts Friday with 1)
const calendar: (number | null)[][] = [
  [null, null, null, null, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, 31],
];

const highlightedDays = new Set([1, 2, 5, 6, 8, 9]);
const selectedDay = 9;

export function AttendanceContent() {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-panel rounded-r-[24px]">
      {/* Top bar */}
      <header className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-border/60">
        <nav className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Maham</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          <Clock className="w-3.5 h-3.5 text-foreground" />
          <span className="text-foreground font-medium">Attendance</span>
        </nav>
        <div className="flex items-center gap-2">
          <IconBtn><Bell className="w-4 h-4" strokeWidth={1.75} /></IconBtn>
          <IconBtn dot><MessageCircle className="w-4 h-4" strokeWidth={1.75} /></IconBtn>
          <IconBtn><Search className="w-4 h-4" strokeWidth={1.75} /></IconBtn>
        </div>
      </header>

      {/* Title */}
      <div className="px-8 pt-6 pb-5">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Attendance</h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          On the attendance page, you can easily track student attendance and monitor absences.
        </p>
      </div>

      {/* Toolbar */}
      <div className="px-8 flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-base font-semibold">February</span>
            <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <button className="ml-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted text-sm">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            <span className="w-5 h-5 rounded-full bg-foreground text-white text-[11px] flex items-center justify-center font-medium">1</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-full bg-foreground text-white text-sm font-medium flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-foreground" strokeWidth={3} />
            </span>
            Class 302
          </button>
          <button className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground hover:bg-muted/80">Class 303</button>
          <button className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground hover:bg-muted/80">Class 304</button>
        </div>
      </div>

      {/* Main grid */}
      <div className="px-8 pb-8 flex-1 grid grid-cols-[1fr_260px_260px_260px] gap-6">
        {/* Calendar + summary cards */}
        <div className="flex flex-col gap-4">
          <CalendarBlock />
          <SummaryCard
            type="success"
            value="23/24"
            label="Attendance"
          />
          <SummaryCard type="danger" value="1/24" label="Absences" />
          <SummaryCard type="delay" value="1/24" label="Delayed" />
        </div>

        {/* Attendance column */}
        <StudentColumn
          icon={<Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />}
          title="Attendance"
          count={23}
          students={attendanceList}
        />

        {/* Absences */}
        <StudentColumn
          icon={<X className="w-3.5 h-3.5 text-danger" strokeWidth={3} />}
          title="Absences"
          count={1}
          students={absences}
        />

        {/* Delayed */}
        <StudentColumn
          icon={<RotateCw className="w-3.5 h-3.5 text-delay" strokeWidth={2.5} />}
          title="Delayed"
          count={1}
          students={delayed}
        />
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

function CalendarBlock() {
  return (
    <div className="grid grid-cols-7 gap-y-1 text-sm">
      {weekDays.map((d) => (
        <div key={d} className="text-center text-muted-foreground text-xs pb-2">
          {d}
        </div>
      ))}
      {calendar.flat().map((day, i) => {
        if (day === null) return <div key={i} />;
        const isSelected = day === selectedDay;
        const isHighlighted = highlightedDays.has(day);
        return (
          <div key={i} className="flex justify-center items-center py-1.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors ${
                isSelected
                  ? "bg-foreground text-white font-semibold"
                  : isHighlighted
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground/70"
              }`}
            >
              {day}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SummaryCard({
  type,
  value,
  label,
}: {
  type: "success" | "danger" | "delay";
  value: string;
  label: string;
}) {
  const styles = {
    success: {
      bg: "bg-success-soft-bg",
      icon: "bg-white text-success",
      iconEl: <Check className="w-4 h-4" strokeWidth={3} />,
      bars: "bg-emerald-400",
    },
    danger: {
      bg: "bg-danger-soft",
      icon: "bg-white text-danger",
      iconEl: <X className="w-4 h-4" strokeWidth={3} />,
      bars: "bg-orange-500",
    },
    delay: {
      bg: "bg-delay-soft",
      icon: "bg-white text-delay",
      iconEl: <RotateCw className="w-4 h-4" strokeWidth={2.5} />,
      bars: "bg-delay",
    },
  }[type];

  // Bar pattern: 24 bars, with the relevant ones colored at end
  const totalBars = 24;
  const coloredCount = type === "success" ? 23 : 1;
  const colorPositions = type === "success"
    ? new Set(Array.from({ length: 23 }, (_, i) => i))
    : type === "danger"
    ? new Set([22])
    : new Set([21]);

  return (
    <div className={`${styles.bg} rounded-2xl p-4 flex items-center gap-4`}>
      <div className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center`}>
        {styles.iconEl}
      </div>
      <div className="flex-1">
        <p className="text-xl font-bold text-foreground leading-tight">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <div className="flex items-end gap-[2px] h-8">
        {Array.from({ length: totalBars }).map((_, i) => (
          <div
            key={i}
            className={`w-[3px] h-full rounded-full ${
              colorPositions.has(i) ? styles.bars : "bg-foreground/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function StudentColumn({
  icon,
  title,
  count,
  students,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  students: Student[];
}) {
  return (
    <div className="border-l border-border/60 pl-6">
      <div className="flex items-center gap-2 mb-4 pb-3">
        {icon}
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="ml-auto w-6 h-6 rounded-full bg-foreground text-white text-[11px] flex items-center justify-center font-medium">
          {count}
        </span>
      </div>
      <ul className="space-y-1">
        {students.map((s, i) => (
          <li
            key={i}
            className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-muted/60 cursor-pointer group"
          >
            <div className={`w-7 h-7 rounded-full ${s.color} flex items-center justify-center text-[10px] font-semibold`}>
              {s.initials}
            </div>
            <span className="text-sm text-foreground flex-1">{s.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100" />
          </li>
        ))}
      </ul>
    </div>
  );
}
