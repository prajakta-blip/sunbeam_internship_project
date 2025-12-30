import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../../services/courseService";
import { toast } from "react-toastify";

export default function AdminAddCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    courseName: "",
    description: "",
    fees: "",
    startDate: "",
    endDate: "",
    expireDays: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      fees: Number(form.fees),
      expireDays: Number(form.expireDays)
    };

    const res = await addCourse(payload);

    if (res.status === "success") {
      toast.success("Course added successfully");
      navigate("/admin/courses");
    } else {
      toast.error(res.error || "Failed to add course");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 450 }}>
      <div className="card shadow p-4">
        <h4 className="text-center mb-3">Add New Course</h4>

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="courseName" placeholder="Course Name" onChange={handleChange} required />
          <input className="form-control mb-2" name="description" placeholder="Description" onChange={handleChange} required />
          <input className="form-control mb-2" name="fees" type="number" placeholder="Fees" onChange={handleChange} required />
          <input className="form-control mb-2" name="startDate" type="date" onChange={handleChange} required />
          <input className="form-control mb-2" name="endDate" type="date" onChange={handleChange} required />
          <input className="form-control mb-3" name="expireDays" type="number" placeholder="Video Expire Days" onChange={handleChange} required />

          <button className="btn btn-info w-100 text-white">
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}
