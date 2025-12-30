import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, updateCourse } from "../../services/courseService";
import { toast } from "react-toastify";

export default function AdminUpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    courseName: "",
    description: "",
    fees: "",
    startDate: "",
    endDate: "",
    videoExpireDays: ""
  });

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const res = await getCourseById(id);
    if (res.status === "success") {
      setForm(res.data);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateCourse(id, form);

    if (res.status === "success") {
      toast.success("Course updated successfully");
      navigate("/admin/courses");
    } else {
      toast.error("Failed to update course");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 450 }}>
      <div className="card shadow p-4">
        <h4 className="text-center mb-3">Update Course</h4>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            name="courseName"
            value={form.courseName}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="fees"
            type="number"
            value={form.fees}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="startDate"
            type="date"
            value={form.startDate?.slice(0, 10)}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="endDate"
            type="date"
            value={form.endDate?.slice(0, 10)}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="videoExpireDays"
            type="number"
            value={form.videoExpireDays}
            onChange={handleChange}
            required
          />

          <button className="btn btn-info w-100 text-white">
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
}
