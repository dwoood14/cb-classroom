export type ExamCard = {
  classId: string;
  className: string;
  time: string;
  subject: string;
  grade: string;
  confirmed: number;
  totalStudents: number;
  tone: "purple" | "yellow" | "pink" | "blue" | "green" | "orange";
};

export type ExamDayRow = { day: number; label?: string; exams: ExamCard[] };

export const dummyExamsData: Record<number, ExamDayRow[]> = {
  0: [ // January
    {
      day: 15,
      exams: [
        { classId: "302", className: "Class 302", time: "10:00 am", subject: "Math Quiz", grade: "Grade 12", confirmed: 28, totalStudents: 30, tone: "purple" },
      ],
    },
  ],
  1: [ // February
    {
      day: 1,
      exams: [
        { classId: "302", className: "Class 302", time: "8:00 am", subject: "Math Exam", grade: "Grade 12", confirmed: 14, totalStudents: 30, tone: "purple" },
        { classId: "303", className: "Class 303", time: "9:00 am", subject: "Physics Exam", grade: "Grade 10", confirmed: 22, totalStudents: 30, tone: "yellow" },
      ],
    },
    { day: 2, label: "No exam.", exams: [] },
    {
      day: 3,
      exams: [
        { classId: "304", className: "Class 304", time: "8:00 am", subject: "Art Exam", grade: "Grade 9", confirmed: 10, totalStudents: 30, tone: "pink" },
        { classId: "302", className: "Class 302", time: "9:00 am", subject: "Math Exam", grade: "Grade 12", confirmed: 30, totalStudents: 30, tone: "blue" },
        { classId: "305", className: "Class 305", time: "10:00 am", subject: "English Exam", grade: "Grade 11", confirmed: 25, totalStudents: 30, tone: "green" },
      ],
    },
    { day: 4, label: "Weekend", exams: [] },
    { day: 5, label: "Weekend", exams: [] },
    {
      day: 6,
      exams: [
        { classId: "303", className: "Class 303", time: "8:00 am", subject: "Physics Exam", grade: "Grade 10", confirmed: 0, totalStudents: 30, tone: "yellow" },
      ],
    },
  ],
  2: [ // March
     {
      day: 10,
      exams: [
        { classId: "304", className: "Class 304", time: "11:00 am", subject: "Science", grade: "Grade 9", confirmed: 22, totalStudents: 30, tone: "orange" },
      ],
    },
  ]
};

export function getExamsData(monthIdx: number): ExamDayRow[] {
  return dummyExamsData[monthIdx] ?? [];
}
