import { ChevronRight, Home, Info, TrendingUp, Activity as ActivityIcon, ChevronDown, RotateCw, X, Check, Search as SearchIcon, BarChart3 } from "lucide-react";
import { IconBtn } from "@/components/ui/icon-btn";
import { FilterPill } from "@/components/ui/filter-pill";
import { PageHeader } from "@/components/layout/PageHeader";

export function StudentsContent() {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-panel rounded-r-[24px]">
      {/* Top bar */}
      <PageHeader
        breadcrumbs={
          <>
            <span className="text-muted-foreground">Techerly</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <Home className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Students overview</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-foreground font-medium">Amir Baghian</span>
          </>
        }
      />

      {/* Profile header */}
      <div className="px-8 pt-6 pb-5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 overflow-hidden flex items-center justify-center text-white text-xs font-medium">A</div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Amirbaqian
              <ChevronDown className="w-5 h-5" />
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-2 ml-1">
            Amir here's take a look at your performance and analytics.
          </p>
        </div>
        <FilterPill />
      </div>

      {/* Stat cards */}
      <div className="px-8 grid grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<TrendingUp className="w-4 h-4 text-violet-500" />}
          title="Growth"
          value="+10%"
          subtitle="Students in total"
          chart={
            <svg viewBox="0 0 120 60" className="w-32 h-12">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(265 60% 60%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(265 60% 60%)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 50 L20 45 L40 38 L60 30 L80 22 L100 12 L120 5" stroke="hsl(265 60% 60%)" strokeWidth="2" fill="none" />
              <path d="M0 50 L20 45 L40 38 L60 30 L80 22 L100 12 L120 5 L120 60 L0 60 Z" fill="url(#g1)" />
            </svg>
          }
        />
        <StatCard
          icon={<ActivityIcon className="w-4 h-4 text-sky-500" />}
          title="Exams"
          rightLink="Check Exams"
          value="19.32"
          subtitle="Average score"
          chart={
            <div className="flex items-end gap-1 h-12">
              {[40, 25, 35, 50, 30].map((h, i) => (
                <div key={i} className="w-2 rounded-sm bg-sky-400" style={{ height: `${h}px` }} />
              ))}
            </div>
          }
        />
        <ActivityCard />
      </div>

      {/* Assignments */}
      <div className="px-8 mb-8">
        <h2 className="text-base font-semibold mb-4">Assignments</h2>
        <div className="grid grid-cols-4 gap-3">
          <AssignmentTile tone="bg-violet-100" iconBg="bg-white text-violet-500" icon={<SearchIcon className="w-4 h-4" />} label="Not-checked" />
          <AssignmentTile tone="bg-orange-50" iconBg="bg-white text-orange-500" icon={<RotateCw className="w-4 h-4" />} label="Not-deliverd" />
          <AssignmentTile tone="bg-amber-50" iconBg="bg-white text-amber-500" icon={<X className="w-4 h-4" strokeWidth={2.5} />} label="Not-completed" />
          <AssignmentTile tone="bg-emerald-50" iconBg="bg-white text-emerald-500" icon={<Check className="w-4 h-4" strokeWidth={2.5} />} label="Completed" />
        </div>
      </div>

      {/* Last assignments */}
      <div className="px-8 mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-semibold">Last assignments</h2>
          <FilterPill />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs border-b border-border/60">
              <th className="text-left font-normal py-3">Assignment name</th>
              <th className="text-left font-normal py-3">Time</th>
              <th className="text-right font-normal py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Equations & Expressions – Page 32", time: "12 hours ago", status: "Not-deliverd", tone: "bg-orange-50 text-orange-600", icon: <RotateCw className="w-3 h-3" /> },
              { name: "Algebra Practice – Page 43", time: "23 hours ago", status: "Complete", tone: "bg-emerald-50 text-emerald-600", icon: <Check className="w-3 h-3" strokeWidth={3} /> },
              { name: "Geometry Exercises – Page 21", time: "2 days ago", status: "Complete", tone: "bg-emerald-50 text-emerald-600", icon: <Check className="w-3 h-3" strokeWidth={3} /> },
              { name: "Fractions & Decimals – Page 40", time: "3 days ago", status: "Complete", tone: "bg-emerald-50 text-emerald-600", icon: <Check className="w-3 h-3" strokeWidth={3} /> },
              { name: "Problem Solving – Page 62", time: "5 days ago", status: "Not Completed", tone: "bg-amber-50 text-amber-600", icon: <X className="w-3 h-3" strokeWidth={3} /> },
              { name: "Math Drills – Page 21", time: "5 days ago", status: "Not Checked", tone: "bg-violet-50 text-violet-600", icon: <SearchIcon className="w-3 h-3" /> },
            ].map((row, i) => (
              <tr key={i} className="border-b border-border/40 last:border-0">
                <td className="py-3.5">{row.name}</td>
                <td className="py-3.5 text-muted-foreground">{row.time}</td>
                <td className="py-3.5 text-right">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${row.tone}`}>
                    {row.icon}
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student exams */}
      <div className="px-8 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-semibold">Student exams</h2>
          <FilterPill />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs border-b border-border/60">
              <th className="text-left font-normal py-3">Date</th>
              <th className="text-left font-normal py-3">Exam title</th>
              <th className="text-left font-normal py-3">Score</th>
              <th className="text-left font-normal py-3">Rank in exam</th>
              <th className="text-right font-normal py-3">Growth from last exam</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4">June 9, 2024</td>
              <td className="py-4">Final Math Exam</td>
              <td className="py-4">19.75</td>
              <td className="py-4">#7</td>
              <td className="py-4 text-right">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-orange-50 text-orange-600">
                  😟 -23%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}



function StatCard({ icon, title, rightLink, value, subtitle, chart }: { icon: React.ReactNode; title: string; rightLink?: string; value: string; subtitle: string; chart: React.ReactNode }) {
  return (
    <div className="border border-border/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">{icon}</div>
          <span className="text-sm font-medium">{title}</span>
        </div>
        {rightLink && <span className="text-xs text-muted-foreground">{rightLink}</span>}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            {subtitle} <Info className="w-3 h-3" />
          </p>
        </div>
        {chart}
      </div>
    </div>
  );
}

function ActivityCard() {
  return (
    <div className="border border-border/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-sm font-medium">Activity</span>
        </div>
        <span className="text-xs text-muted-foreground">Check Status</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: 8, label: "Present", color: "bg-emerald-500" },
          { value: 3, label: "Absent", color: "bg-rose-500" },
          { value: 12, label: "Events", color: "bg-amber-500" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold tracking-tight">{s.value}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssignmentTile({ tone, iconBg, icon, label }: { tone: string; iconBg: string; icon: React.ReactNode; label: string }) {
  return (
    <button className={`${tone} rounded-2xl p-4 flex items-center gap-3 hover:opacity-90`}>
      <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>{icon}</div>
      <div className="flex-1 text-left">
        <p className="text-lg font-bold">23/32</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}
