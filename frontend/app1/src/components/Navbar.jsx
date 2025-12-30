import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/sunbeam-logo.png";

function Navbar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 🔥 ROLE-BASED HOME NAVIGATION
  const goHome = () => {
    if (user?.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info px-4">
      {/* LOGO */}
      <button
        className="navbar-brand d-flex align-items-center btn btn-link text-white text-decoration-none"
        onClick={goHome}
      >
        <img src={logo} height="30" className="me-2" alt="Sunbeam" />
        <strong>Sunbeam</strong>
      </button>

      {/* LEFT MENU */}
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <button
            className="nav-link btn btn-link text-white text-decoration-none"
            onClick={goHome}
          >
            Home
          </button>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>

        {/* STUDENT ONLY */}
        {user?.role === "STUDENT" && (
          <li className="nav-item">
            <Link className="nav-link" to="/my-courses">
              My Courses
            </Link>
          </li>
        )}
      </ul>

      {/* RIGHT BUTTON */}
      {!user ? (
        <Link className="btn btn-light" to="/login">
          Login
        </Link>
      ) : (
        <button className="btn btn-outline-light" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
