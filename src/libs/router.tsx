import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminAddClassPage from "../pages/admin/class/AdminAddClassPage";
import AdminClassesPage from "../pages/admin/class/AdminClassesPage";
import AdminEditClassPage from "../pages/admin/class/AdminEditClassPage";
import AdminAddMajorPage from "../pages/admin/major/AdminAddMajorPage";
import AdminEditMajorPage from "../pages/admin/major/AdminEditMajorPage";
import AdminMajorsPage from "../pages/admin/major/AdminMajorsPage";
import AdminAddSchedulePage from "../pages/admin/schedule/AdminAddSchedulePage";
import AdminEditSchedulePage from "../pages/admin/schedule/AdminEditSchedulePage";
import AdminSchedulesPage from "../pages/admin/schedule/AdminSchedulesPage";
import AdminAddStudentPage from "../pages/admin/student/AdminAddStudentPage";
import AdminEditStudentPage from "../pages/admin/student/AdminEditStudentPage";
import AdminStudentsPage from "../pages/admin/student/AdminStudentsPage";
import AdminAddSubjectPage from "../pages/admin/subject/AdminAddSubjectPage";
import AdminEditSubjectPage from "../pages/admin/subject/AdminEditSubjectPage";
import AdminSubjectsPage from "../pages/admin/subject/AdminSubjectsPage";
import AdminAddTeacherPage from "../pages/admin/teacher/AdminAddTeacherPage";
import AdminEditTeacherPage from "../pages/admin/teacher/AdminEditTeacherPage";
import AdminTeachersPage from "../pages/admin/teacher/AdminTeachersPage";
import TeacherAbsenPage from "../pages/teacher/TeacherAbsenPage";
import AdminLayout from "../parents/AdminLayout";
import AppLayout from "../parents/AppLayout";
import TeacherLayout from "../parents/TeacherLayout";

export const router = createBrowserRouter([
  { path: "/login", Component: LoginPage },
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "/admin",
        Component: AdminLayout,
        children: [
          { path: "/admin/dashboard", Component: AdminDashboardPage },
          { path: "/admin/teachers", Component: AdminTeachersPage },
          { path: "/admin/teachers/add", Component: AdminAddTeacherPage },
          { path: "/admin/teachers/edit/:id", Component: AdminEditTeacherPage },
          { path: "/admin/majors", Component: AdminMajorsPage },
          { path: "/admin/majors/add", Component: AdminAddMajorPage },
          { path: "/admin/majors/edit/:id", Component: AdminEditMajorPage },
          { path: "/admin/classes", Component: AdminClassesPage },
          { path: "/admin/classes/add", Component: AdminAddClassPage },
          { path: "/admin/classes/edit/:id", Component: AdminEditClassPage },
          { path: "/admin/students", Component: AdminStudentsPage },
          { path: "/admin/students/add", Component: AdminAddStudentPage },
          { path: "/admin/students/edit/:id", Component: AdminEditStudentPage },
          { path: "/admin/subjects", Component: AdminSubjectsPage },
          { path: "/admin/subjects/add", Component: AdminAddSubjectPage },
          { path: "/admin/subjects/edit/:id", Component: AdminEditSubjectPage },
          { path: "/admin/schedules", Component: AdminSchedulesPage },
          { path: "/admin/schedules/add", Component: AdminAddSchedulePage },
          {
            path: "/admin/schedules/edit/:id",
            Component: AdminEditSchedulePage,
          },
        ],
      },
      {
        path: "/teacher",
        Component: TeacherLayout,
        children: [{ path: "/teacher/absen", Component: TeacherAbsenPage }],
      },
    ],
  },
]);
