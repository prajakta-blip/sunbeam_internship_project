import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        {user?.name || "Admin"}
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <button
            className="dropdown-item"
            onClick={() => navigate("/profile/update")}
          >
            Update Profile
          </button>
        </li>

        <li>
          <button
            className="dropdown-item"
            onClick={() => navigate("/profile/change-password")}
          >
            Change Password
          </button>
        </li>

        <li><hr className="dropdown-divider" /></li>

        <li>
          <button
            className="dropdown-item text-danger"
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
