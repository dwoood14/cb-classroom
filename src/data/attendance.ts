export type Student = { initials: string; name: string; color: string };

export const attendanceList: Student[] = [
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

export const absences: Student[] = [
  { initials: "HT", name: "Hannah Turner", color: "bg-orange-100 text-orange-700" },
  { initials: "NW", name: "Nicholas White", color: "bg-blue-100 text-blue-700" },
  { initials: "VH", name: "Victoria Hall", color: "bg-emerald-100 text-emerald-700" },
  { initials: "KA", name: "Kevin Adams", color: "bg-foreground/10 text-foreground" },
];

export const delayed: Student[] = [
  { initials: "LM", name: "Laura Miller", color: "bg-emerald-100 text-emerald-700" },
  { initials: "EL", name: "Emma Lewis", color: "bg-purple-100 text-purple-700" },
];

export const dummyAttendanceData: Record<string, any> = {
  "302": {
    "1": { present: attendanceList.slice(0, 5), absent: [], delayed: [] },
    "2": { present: attendanceList.slice(0, 10), absent: absences, delayed: [] },
    "5": { present: attendanceList, absent: [], delayed: delayed },
    "6": { present: attendanceList.slice(0, 12), absent: [], delayed: [] },
    "8": { present: attendanceList.slice(0, 8), absent: absences, delayed: delayed },
    "9": {
      present: [
        { initials: "AM", name: "Amina Mahmood", color: "bg-violet-100 text-violet-700" },
        { initials: "SJ", "name": "Saad Jamil", "color": "bg-orange-100 text-orange-700" },
      ],
      absent: absences,
      delayed: delayed,
    },
    "10": {
      present: [
        { initials: "SJ", "name": "Saad Jamil", "color": "bg-orange-100 text-orange-700" },
      ],
      absent: [
        { initials: "AM", "name": "Amina Mahmood", color: "bg-violet-100 text-violet-700" },
        ...absences
      ],
      delayed: [],
    },
    default: {
      present: attendanceList,
      absent: absences,
      delayed: delayed,
    }
  },
  "303": {
    "9": {
      present: attendanceList.slice(0, 5),
      absent: [attendanceList[5], attendanceList[6]],
      delayed: [absences[0]],
    },
    default: {
      present: attendanceList.slice(2, 8),
      absent: [absences[1], absences[2]],
      delayed: [delayed[0]],
    }
  },
  "304": {
    "9": {
      present: attendanceList.slice(4, 10),
      absent: [absences[2]],
      delayed: [],
    },
    default: {
      present: attendanceList.slice(0, 3),
      absent: absences.slice(0, 3),
      delayed: delayed,
    }
  }
};

// Data access function — swap this fetch() call when real API is ready
export function getAttendanceData(day: number, classId: string) {
  const classData = dummyAttendanceData[classId] ?? dummyAttendanceData["302"];
  return classData[day.toString()] ?? classData["default"];
}
