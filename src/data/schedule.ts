export type Event = {
  dayIdx: number;
  startHour: number; // 6..15
  durationHours: number;
  title: string;
  time: string;
  tone: "purple" | "blue" | "yellow" | "green" | "indigo" | "pink";
  confirmed?: boolean;
};

export const scheduleEvents: Event[] = [
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
