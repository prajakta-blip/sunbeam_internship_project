import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <ul className="navbar-nav mx-auto">

        <li className="nav-item">
          <Link className="nav-link" to="/admin">Dashboard</Link>
        </li>

        {/* COURSES */}
        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
          >
            Courses
          </span>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/admin/courses">
                Get All Courses
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/course/add">
                Add Course
              </Link>
            </li>
          </ul>
        </li>

        {/* VIDEOS */}
        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
          >
            Videos
          </span>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/admin/videos">
                Get All Videos
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/video/add">
                Add Video
              </Link>
            </li>
          </ul>
        </li>

        {/* STUDENTS */}
        <li className="nav-item">
          <Link className="nav-link" to="/admin/students">
            Students
          </Link>
        </li>

      </ul>
    </nav>
  );
}
