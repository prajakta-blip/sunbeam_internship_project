import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";

// STUDENT
import Home from "./pages/Home";
import About from "./pages/About";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCourses from "./pages/MyCourses";
import VideoPlayer from "./pages/VideoPlayer";
import RegistrationForm from "./pages/RegistrationForm";

// ADMIN
import AdminHome from "./pages/admin/AdminHome";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminUpdateCourse from "./pages/admin/AdminUpdateCourse";
import AdminDeleteCourse from "./pages/admin/AdminDeleteCourse";

function App() {
  return (
    <Routes>

      {/* ================= STUDENT ================= */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/course/:id" element={<Layout><CourseDetails /></Layout>} />
      <Route path="/register/:courseId" element={<Layout><RegistrationForm /></Layout>} />
      <Route path="/my-courses" element={<Layout><MyCourses /></Layout>} />
      <Route path="/video/:id" element={<Layout><VideoPlayer /></Layout>} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/courses"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminCourses />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/students"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminStudents />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/course/update"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminUpdateCourse />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/course/delete"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminDeleteCourse />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
