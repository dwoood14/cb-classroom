export type Activity = {
  title: string;
  time: string;
  tone: string;
  iconBg: string;
  icon: string; // icon name string — resolved to <Icon> in the View layer
};

export type ActivityDayRow = { day: number; label?: string; events: Activity[]; badge?: number };

export const activityDays: ActivityDayRow[] = [
  {
    day: 1,
    events: [
      { title: "Assignment Sent", time: "6:45 am", tone: "bg-violet-100", iconBg: "bg-white text-foreground", icon: "FileText" },
      { title: "Absent from class", time: "6:00 am", tone: "bg-amber-100", iconBg: "bg-white text-foreground", icon: "Calendar" },
    ],
  },
  { day: 2, label: "No events.", events: [] },
  {
    day: 3,
    events: [
      { title: "Assignment edited", time: "6:45 am", tone: "bg-rose-100", iconBg: "bg-white text-foreground", icon: "Pencil" },
      { title: "Present in class", time: "6:00 am", tone: "bg-emerald-100", iconBg: "bg-white text-foreground", icon: "CheckCircle2" },
      { title: "Lesson Viewed", time: "6:45 am", tone: "bg-sky-100", iconBg: "bg-white text-foreground", icon: "Eye" },
    ],
  },
  { day: 4, label: "Weekend", events: [] },
  { day: 5, label: "Weekend", events: [] },
  {
    day: 6,
    events: [
      { title: "PDF / file downloaded", time: "6:45 am", tone: "bg-violet-100", iconBg: "bg-white text-foreground", icon: "Download" },
      { title: "Changed account Password", time: "6:45 am", tone: "bg-sky-100", iconBg: "bg-white text-foreground", icon: "Fingerprint" },
    ],
  },
  { day: 7, label: "No events.", events: [] },
  { day: 8, label: "No events.", events: [] },
  {
    day: 9,
    badge: 9,
    events: [
      { title: "Exam viewed", time: "6:45 am", tone: "bg-violet-100", iconBg: "bg-white text-foreground", icon: "Pencil" },
      { title: "Present in class", time: "6:00 am", tone: "bg-emerald-100", iconBg: "bg-white text-foreground", icon: "CheckCircle2" },
      { title: "Joined live session", time: "6:45 am", tone: "bg-violet-100", iconBg: "bg-white text-foreground", icon: "Monitor" },
      { title: "Study plan viewed", time: "6:00 am", tone: "bg-rose-100", iconBg: "bg-white text-foreground", icon: "ListChecks" },
    ],
  },
];
