import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";

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

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
