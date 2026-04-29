import * as React from "react";

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// Encapsulated 5-week layout matching February prototype
const defaultCalendarLayout: (number | null)[][] = [
  [null, null, null, null, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, 31],
];

export interface CalendarGridProps {
  calendar?: (number | null)[][];
  selectedDay?: number;
  renderDay: (day: number, isSelected: boolean) => React.ReactNode;
}

export function CalendarGrid({
  calendar = defaultCalendarLayout,
  selectedDay,
  renderDay,
}: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-y-1 text-sm">
      {weekDays.map((d) => (
        <div key={d} className="text-center text-muted-foreground text-xs pb-2">
          {d}
        </div>
      ))}
      {calendar.flat().map((day, i) => {
        if (day === null) return <div key={i} />;
        return (
          <React.Fragment key={i}>
            {renderDay(day, day === selectedDay)}
          </React.Fragment>
        );
      })}
    </div>
  );
}
