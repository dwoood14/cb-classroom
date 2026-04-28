import { Sidebar } from "@/components/attendance/Sidebar";
import { AttendanceContent } from "@/components/attendance/AttendanceContent";

const Index = () => {
  return (
    <div className="min-h-screen bg-app-bg p-6 flex items-center justify-center">
      <div className="w-full max-w-[1400px] flex bg-panel rounded-[24px] shadow-sm overflow-hidden">
        <Sidebar />
        <AttendanceContent />
      </div>
    </div>
  );
};

export default Index;
