import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, BookOpen, Search, Plus, Check, BarChart3, MoreHorizontal, X, Clock, Users, GraduationCap } from "lucide-react";
import { FilterPill } from "@/components/ui/filter-pill";
import { PageHeader } from "@/components/layout/PageHeader";
import { Calendar } from "@/components/ui/calendar";
import { getExamsData, type ExamCard, type ExamDayRow } from "@/data/exams";
import { format, setMonth, setDate, startOfMonth } from "date-fns";
import { cn } from "@/lib/utils";

const tones = {
  purple: { bg: "bg-violet-100", chipBg: "bg-white", text: "text-foreground" },
  yellow: { bg: "bg-amber-100", chipBg: "bg-white", text: "text-foreground" },
  pink: { bg: "bg-rose-100", chipBg: "bg-white", text: "text-foreground" },
  blue: { bg: "bg-sky-100", chipBg: "bg-white", text: "text-foreground" },
  green: { bg: "bg-emerald-100", chipBg: "bg-white", text: "text-foreground" },
  orange: { bg: "bg-orange-100", chipBg: "bg-white", text: "text-foreground" },
};

const monthsList = ["January", "February", "March", "April", "May", "June", "July"];

// Mock session storage to keep added exams alive during the session
let sessionExams: Record<number, ExamDayRow[]> = {};

export function ExamsContent() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 1, 6)); // Feb 6, 2025
  const selectedDay = selectedDate.getDate();
  const selectedMonthIdx = selectedDate.getMonth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ExamDayRow[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to selected day
  useEffect(() => {
    if (isLoading) return;
    const element = document.getElementById(`day-row-${selectedDay}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedDay, isLoading]);

  // Sync data with month selection + Merge with Session Exams
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const mockData = getExamsData(selectedMonthIdx);
      const sessionData = sessionExams[selectedMonthIdx] || [];
      
      // Merge session data with mock data
      const merged = [...mockData];
      sessionData.forEach(sessionRow => {
        const existingIdx = merged.findIndex(r => r.day === sessionRow.day);
        if (existingIdx > -1) {
          merged[existingIdx] = { 
            ...merged[existingIdx], 
            exams: [...merged[existingIdx].exams, ...sessionRow.exams] 
          };
        } else {
          merged.push(sessionRow);
        }
      });

      setData(merged.sort((a, b) => a.day - b.day));
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedMonthIdx]);

  const handleAddExam = (newExam: ExamCard, day: number) => {
    // 1. Update Session Storage
    if (!sessionExams[selectedMonthIdx]) sessionExams[selectedMonthIdx] = [];
    const monthSession = sessionExams[selectedMonthIdx];
    const existingRowIdx = monthSession.findIndex(r => r.day === day);
    
    if (existingRowIdx > -1) {
      monthSession[existingRowIdx].exams.push(newExam);
    } else {
      monthSession.push({ day, exams: [newExam] });
    }

    // 2. Update UI State for instant feedback
    setData(prev => {
      const existingRow = prev.find(r => r.day === day);
      if (existingRow) {
        return prev.map(r => r.day === day ? { ...r, exams: [...r.exams, newExam] } : r);
      } else {
        return [...prev, { day, exams: [newExam] }].sort((a, b) => a.day - b.day);
      }
    });
    
    setIsAddModalOpen(false);
  };

  const handleMonthChange = (idx: number) => {
    setSelectedDate(prev => setMonth(startOfMonth(prev), idx));
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-panel rounded-r-[24px]">
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

      <div className="px-8 pt-6 pb-5 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Exams</h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            On the exams page, you can easily track exam schedules and monitor student performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground/70 hover:bg-muted/80">
            <Search className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-full bg-foreground text-white text-sm font-medium flex items-center gap-1.5 hover:bg-foreground/90 transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Add new exam
          </button>
        </div>
      </div>

      {isAddModalOpen && (
        <CreateExamModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSave={(ex) => handleAddExam(ex, selectedDay)} 
          selectedDay={selectedDay}
          monthName={monthsList[selectedMonthIdx]}
        />
      )}

      <div className="px-8 pb-8 flex-1 grid grid-cols-[1fr_360px] gap-6">
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold">Exam Calendar</h2>
            <FilterPill />
          </div>

          {/* Month Tabs — Linked to selectedMonthIdx */}
          <div className="flex items-center gap-2 mb-6">
            <button 
              onClick={() => handleMonthChange(selectedMonthIdx - 1)}
              disabled={selectedMonthIdx === 0}
              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center disabled:opacity-50 transition-opacity"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {monthsList.map((m, idx) => (
              <button
                key={m}
                onClick={() => handleMonthChange(idx)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${idx === selectedMonthIdx ? "bg-foreground text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {m.slice(0, 3)}
              </button>
            ))}
            <button 
              onClick={() => handleMonthChange(Math.min(monthsList.length - 1, selectedMonthIdx + 1))}
              disabled={selectedMonthIdx === monthsList.length - 1}
              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center disabled:opacity-50 transition-opacity"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div 
            ref={listContainerRef}
            className={`space-y-5 transition-opacity duration-300 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar ${isLoading ? "opacity-40 pointer-events-none" : "opacity-100"}`}
          >
            {data.length === 0 ? (
               <div className="py-10 text-center text-muted-foreground border border-dashed rounded-2xl">No exams scheduled for {monthsList[selectedMonthIdx]}.</div>
            ) : (
              data.map((row) => (
                <div key={row.day} id={`day-row-${row.day}`}>
                  <DayRowComp row={row} selectedDay={selectedDay} />
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <MiniCalendar 
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            data={data}
          />
          <UpcomingExams data={data} />
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
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${isCurrent ? "bg-foreground text-white" : "text-muted-foreground"}`}>
          {row.day}
        </div>
      </div>
      {row.exams.length === 0 ? (
        <div className="flex-1 py-4 border-t border-border/60 text-sm text-muted-foreground">{row.label}</div>
      ) : (
        <div className="flex-1 grid grid-cols-3 gap-3">
          {row.exams.map((e, i) => <ExamCardComp key={i} exam={e} />)}
        </div>
      )}
    </div>
  );
}

function ExamCardComp({ exam }: { exam: ExamCard }) {
  const tone = tones[exam.tone];
  return (
    <div className={`${tone.bg} rounded-2xl p-3 flex flex-col gap-2`}>
      <div className="flex items-center gap-2 px-1">
        <span className="px-2 py-1 rounded-md bg-white text-[11px] font-semibold">{exam.classId}</span>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{exam.className}</span>
          <span className="text-xs text-muted-foreground">{exam.time}</span>
        </div>
      </div>
      <div className="bg-white rounded-xl p-2.5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-foreground/70" strokeWidth={2} />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-medium">{exam.subject}</p>
          <p className="text-xs text-muted-foreground">{exam.grade}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/70 text-[11px]">
            <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} /> Confirmed
          </span>
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/70 text-[11px]">
             <Check className={`w-2 h-2 text-white rounded-full ${exam.confirmed > 0 ? "bg-emerald-500" : "bg-muted-foreground/30"}`} strokeWidth={4} /> {exam.confirmed}/{exam.totalStudents}
          </span>
        </div>
        <button className="text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

function MiniCalendar({ selectedDate, onSelectDate, data }: { selectedDate: Date; onSelectDate: (d: Date) => void; data: ExamDayRow[] }) {
  
  const renderDots = (day: number) => {
    const row = data.find(r => r.day === day);
    if (!row || row.exams.length === 0) return null;
    const tonesSet = new Set(row.exams.map(e => e.tone));
    return (
      <div className="flex items-center justify-center gap-0.5 mt-auto pb-1">
        {(tonesSet.has('purple') || tonesSet.has('blue')) && <span className="w-1 h-1 rounded-full bg-sky-500" />}
        {(tonesSet.has('yellow') || tonesSet.has('orange')) && <span className="w-1 h-1 rounded-full bg-orange-500" />}
        {(tonesSet.has('pink') || tonesSet.has('green')) && <span className="w-1 h-1 rounded-full bg-foreground" />}
      </div>
    );
  };

  return (
    <div className="border border-border/60 rounded-[28px] p-4 bg-white shadow-sm">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onSelectDate(date)}
        month={selectedDate}
        onMonthChange={onSelectDate}
        className="p-0"
        components={{
          DayContent: ({ date }) => {
            const day = date.getDate();
            const isToday = format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
            return (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <span className={cn(
                  "text-sm transition-colors",
                  isToday && "text-primary font-bold underline"
                )}>
                  {day}
                </span>
                {renderDots(day)}
              </div>
            );
          }
        }}
      />

      <div className="flex items-center gap-2 mt-4 px-2 text-xs text-muted-foreground border-t border-border/40 pt-4">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
        <span><span className="font-semibold text-foreground">{data.reduce((acc, r) => acc + r.exams.length, 0)}</span> Exams for this month</span>
      </div>
    </div>
  );
}

function UpcomingExams({ data }: { data: ExamDayRow[] }) {
  const allExams = data.flatMap(row => row.exams.map(e => ({ ...e, day: row.day })));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Upcoming exams</h3>
        <FilterPill />
      </div>
      <div className="space-y-3">
        {allExams.length === 0 ? (
          <div className="py-4 text-center text-xs text-muted-foreground border border-dashed rounded-xl">No upcoming exams.</div>
        ) : (
          allExams.slice(0, 3).map((ex, i) => (
            <UpcomingCard key={i} tone={ex.tone} classId={ex.classId} subject={ex.subject} date={`Day ${ex.day} · ${ex.time}`} days={Math.max(1, ex.day - 5)} />
          ))
        )}
      </div>
    </div>
  );
}

function UpcomingCard({ tone, classId, subject, date, days }: { tone: string; classId: string; subject: string; date: string; days: number }) {
  const toneBg = tones[tone as keyof typeof tones]?.bg || "bg-muted";
  return (
    <div className={`${toneBg} rounded-2xl p-4 flex items-start gap-3 opacity-90`}>
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

function CreateExamModal({ onClose, onSave, selectedDay, monthName }: { onClose: () => void; onSave: (ex: ExamCard) => void; selectedDay: number; monthName: string }) {
  const [formData, setFormData] = useState({
    subject: "",
    classId: "302",
    time: "08:00 am",
    grade: "Grade 12",
    confirmed: 25,
    totalStudents: 30,
    tone: "purple" as ExamCard["tone"]
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Add New Exam</h2>
            <p className="text-xs text-muted-foreground mt-1">For {monthName} {selectedDay}, 2025</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Exam Details</label>
            <div className="relative">
              <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Subject (e.g. Advanced Math)"
                className="w-full pl-10 pr-4 py-3 bg-muted/50 rounded-2xl border-none text-sm focus:ring-2 focus:ring-foreground transition-all"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Class ID</label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="302"
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 rounded-2xl border-none text-sm focus:ring-2 focus:ring-foreground"
                  value={formData.classId}
                  onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Confirmed</label>
              <div className="relative">
                <Check className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="number" 
                  placeholder="25"
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 rounded-2xl border-none text-sm focus:ring-2 focus:ring-foreground"
                  value={formData.confirmed}
                  onChange={(e) => setFormData({ ...formData, confirmed: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Total Students</label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="number" 
                  placeholder="30"
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 rounded-2xl border-none text-sm focus:ring-2 focus:ring-foreground"
                  value={formData.totalStudents}
                  onChange={(e) => setFormData({ ...formData, totalStudents: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Select Tone</label>
            <div className="flex gap-2">
              {(["purple", "yellow", "pink", "blue", "green", "orange"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFormData({ ...formData, tone: t })}
                  className={`w-8 h-8 rounded-full border-4 transition-all ${tones[t as keyof typeof tones].bg} ${formData.tone === t ? "border-foreground scale-110 shadow-lg" : "border-transparent"}`}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              if (!formData.subject) return;
              onSave({
                ...formData,
                className: `Class ${formData.classId}`
              });
            }}
            disabled={!formData.subject}
            className="w-full py-4 bg-foreground text-white rounded-2xl font-bold mt-4 hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-foreground/10 active:scale-[0.98]"
          >
            Create Exam Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
