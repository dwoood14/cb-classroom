import { Sidebar } from "@/components/attendance/Sidebar";
import { ScheduleContent } from "@/components/schedule/ScheduleContent";

const Schedule = () => {
  return (
    <div className="min-h-screen bg-app-bg p-6 flex items-center justify-center">
      <div className="w-full max-w-[1400px] flex bg-panel rounded-[24px] shadow-sm overflow-hidden">
        <Sidebar activeLabel="Schedule" />
        <ScheduleContent />
      </div>
    </div>
  );
};

export default Schedule;
