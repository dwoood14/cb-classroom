import {
  Home,
  BookOpen,
  Clock,
  GraduationCap,
  ClipboardList,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  FileText,
  Sparkles,
  Building2,
  Tv,
  Settings,
  PanelLeft,
  Activity,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mainMenu = [
  { icon: Home, label: "Overview", to: "/", shortcut: true },
  { icon: BookOpen, label: "Class Preparation", to: "/class-preparation" },
  { icon: Clock, label: "Attendance", to: "/" },
  { icon: GraduationCap, label: "Exams", to: "/exams" },
  { icon: ClipboardList, label: "Assignment management", to: "/assignments" },
  { icon: Calendar, label: "Schedule", to: "/schedule" },
  { icon: Users, label: "Students", to: "/students" },
  { icon: Activity, label: "Student Activity", to: "/student-activity" },
  { icon: MessageSquare, label: "Messages", to: "/messages", badge: 2 },
  { icon: BarChart3, label: "Analytics", to: "/analytics" },
  { icon: FileText, label: "Reports", to: "/reports" },
];

const settingsMenu = [
  { icon: Sparkles, label: "School News", to: "/news" },
  { icon: Building2, label: "School Activities", to: "/activities" },
  { icon: Tv, label: "What's New", to: "/whats-new" },
];

export function Sidebar({ activeLabel }: { activeLabel?: string }) {
  return (
    <aside className="w-[260px] shrink-0 flex flex-col bg-gradient-to-b from-sidebar-tint via-white to-white p-4 rounded-l-[24px]">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-[2.5px] border-white border-t-transparent border-b-transparent" />
        </div>
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/70 hover:bg-black/5">
          <PanelLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-6">
        <p className="text-xs text-muted-foreground px-3 mb-2">Main menu</p>
        <nav className="space-y-1">
          {mainMenu.map((item) => (
            <MenuItem key={item.label} {...item} active={activeLabel === item.label} />
          ))}
        </nav>
      </div>

      <div className="mb-6">
        <p className="text-xs text-muted-foreground px-3 mb-2">Settings and news</p>
        <nav className="space-y-1">
          {settingsMenu.map((item) => (
            <MenuItem key={item.label} {...item} active={activeLabel === item.label} />
          ))}
        </nav>
      </div>

      <div className="flex-1" />

      <div className="space-y-3">
        <MenuItem icon={Settings} label="Settings" to="/settings" active={activeLabel === "Settings"} />
        <div className="pt-2">
          <p className="text-xs text-muted-foreground px-3 mb-2">Account</p>
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 overflow-hidden flex items-center justify-center text-white text-xs font-medium">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Amirbaqian</p>
              <p className="text-xs text-muted-foreground">Teacher</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MenuItem({
  icon: Icon,
  label,
  active,
  badge,
  shortcut,
  to,
}: {
  icon: any;
  label: string;
  active?: boolean;
  badge?: number;
  shortcut?: boolean;
  to?: string;
}) {
  const className = `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
    active
      ? "bg-white shadow-sm text-foreground font-medium"
      : "text-foreground/75 hover:bg-black/5"
  }`;

  const content = (
    <>
      <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.75} />
      <span className="flex-1 text-left">{label}</span>
      {shortcut && (
        <span className="flex items-center gap-1">
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">⌘</kbd>
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-foreground text-white font-mono">M</kbd>
        </span>
      )}
      {badge && (
        <span className="text-[11px] w-5 h-5 rounded-full bg-foreground text-white flex items-center justify-center font-medium">
          {badge}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <NavLink to={to} className={className}>
        {content}
      </NavLink>
    );
  }
  return <button className={className}>{content}</button>;
}
