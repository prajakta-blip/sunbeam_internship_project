import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <>
      {/* TOP CYAN STUDENT NAVBAR */}
      <Navbar />

      {/* BLUE ADMIN NAVBAR */}
      <AdminNavbar />

      {/* ADMIN PAGE CONTENT */}
      <div className="container mt-4">
        {children}
      </div>
    </>
  );
}
