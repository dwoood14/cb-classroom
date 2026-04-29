import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Attendance from "./pages/Attendance.tsx";
import Exams from "./pages/Exams.tsx";
import Schedule from "./pages/Schedule.tsx";
import Students from "./pages/Students.tsx";
import StudentActivity from "./pages/StudentActivity.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/attendance" replace />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/students" element={<Students />} />
          <Route path="/student-activity" element={<StudentActivity />} />
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
