import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (!token || user?.role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
