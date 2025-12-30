import { useState } from "react";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 later you can call backend API here
    const updatedUser = { ...user, name };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Profile updated successfully");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <div className="card p-4 shadow">
        <h4 className="text-center mb-3">Update Profile</h4>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />

          <button className="btn btn-primary w-100">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
