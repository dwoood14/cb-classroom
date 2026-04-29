import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-app-bg p-6 flex items-center justify-center">
      <div className="w-full max-w-[1400px] flex bg-panel rounded-[24px] shadow-sm overflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
