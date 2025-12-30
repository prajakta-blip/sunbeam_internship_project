import { useState } from "react";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 later connect backend API
    toast.success("Password changed successfully");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <div className="card p-4 shadow">
        <h4 className="text-center mb-3">Change Password</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-warning w-100">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
