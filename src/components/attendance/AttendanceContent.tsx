import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Clock, Check, X, RotateCw } from "lucide-react";
import { IconBtn } from "@/components/ui/icon-btn";
import { FilterPill } from "@/components/ui/filter-pill";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalendarGrid } from "@/components/ui/calendar-grid";
import { dummyAttendanceData, getAttendanceData, type Student } from "@/data/attendance";

const monthsList = ["January", "February", "March", "April", "May", "June"];

export function AttendanceContent() {
  const [selectedDay, setSelectedDay] = useState<number>(9);
  const [selectedClass, setSelectedClass] = useState<string>("302");
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(() => getAttendanceData(9, "302"));

  // Dynamically calculate highlighted days based on class data keys
  const currentClassData = dummyAttendanceData[selectedClass] ?? dummyAttendanceData["302"];
  const highlightedDays = new Set(
    Object.keys(currentClassData)
      .filter((k) => k !== "default")
      .map(Number)
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(getAttendanceData(selectedDay, selectedClass));
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedDay, selectedClass, selectedMonthIdx]);
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-panel rounded-r-[24px]">
      {/* Top bar */}
      <PageHeader
        breadcrumbs={
          <>
            <span className="text-muted-foreground">Maham</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <Clock className="w-3.5 h-3.5 text-foreground" />
            <span className="text-foreground font-medium">Attendance</span>
          </>
        }
      />

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
            <button 
              onClick={() => setSelectedMonthIdx((prev) => Math.max(0, prev - 1))}
              disabled={selectedMonthIdx === 0}
              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-base font-semibold w-[80px] text-center">
              {monthsList[selectedMonthIdx]}
            </span>
            <button 
              onClick={() => setSelectedMonthIdx((prev) => Math.min(monthsList.length - 1, prev + 1))}
              disabled={selectedMonthIdx === monthsList.length - 1}
              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <FilterPill className="ml-6" />
        </div>
        <div className="flex items-center gap-2">
          {["302", "303", "304"].map((cls) => {
            const isActive = selectedClass === cls;
            return (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${isActive ? "bg-foreground text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                {isActive && (
                  <span className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-foreground" strokeWidth={3} />
                  </span>
                )}
                Class {cls}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main grid */}
      <div className={`px-8 pb-8 flex-1 grid grid-cols-[1fr_260px_260px_260px] gap-6 transition-opacity duration-300 ${isLoading ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
        {/* Calendar + summary cards */}
        <div className="flex flex-col gap-4">
          <CalendarGrid
            selectedDay={selectedDay}
            renderDay={(day, isSelected) => {
              const isHighlighted = highlightedDays.has(day);
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className="flex justify-center items-center py-1.5 w-full cursor-pointer hover:bg-black/5 rounded-lg transition-colors"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors ${isSelected
                      ? "bg-foreground text-white font-semibold"
                      : isHighlighted
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground/70"
                      }`}
                  >
                    {day}
                  </div>
                </button>
              );
            }}
          />
          <SummaryCard
            type="success"
            value={`${data.present.length}/24`}
            label="Attendance"
          />
          <SummaryCard type="danger" value={`${data.absent.length}/24`} label="Absences" />
          <SummaryCard type="delay" value={`${data.delayed.length}/24`} label="Delayed" />
        </div>

        {/* Attendance column */}
        <StudentColumn
          icon={<Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />}
          title="Attendance"
          count={data.present.length}
          students={data.present}
        />

        {/* Absences */}
        <StudentColumn
          icon={<X className="w-3.5 h-3.5 text-danger" strokeWidth={3} />}
          title="Absences"
          count={data.absent.length}
          students={data.absent}
        />

        {/* Delayed */}
        <StudentColumn
          icon={<RotateCw className="w-3.5 h-3.5 text-delay" strokeWidth={2.5} />}
          title="Delayed"
          count={data.delayed.length}
          students={data.delayed}
        />
      </div>
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
            className={`w-[3px] h-full rounded-full ${colorPositions.has(i) ? styles.bars : "bg-foreground/10"
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
