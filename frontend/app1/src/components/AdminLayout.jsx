import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <>
      {/* Student top navbar */}
      <Navbar />

      {/* Admin blue navbar */}
      <AdminNavbar />

      {/* Admin content */}
      <div className="container mt-4">
        {children}
      </div>
    </>
  );
}
