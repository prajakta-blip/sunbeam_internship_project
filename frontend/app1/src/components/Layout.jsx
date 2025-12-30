import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";

function Layout({ children }) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return (
    <>
      {/* STUDENT NAVBAR */}
      <Navbar />

      {/* ADMIN NAVBAR (ADMIN ONLY) */}
      {user?.role === "ADMIN" && <AdminNavbar />}

      {/* PAGE CONTENT */}
      <main className="container mt-4">
        {children}
      </main>
    </>
  );
}

export default Layout;
