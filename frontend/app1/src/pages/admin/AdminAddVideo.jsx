import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addVideo } from "../../services/adminVideoService";
import { getAllCoursesAdmin } from "../../services/courseService";

export default function AdminAddVideo() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseId: "",
    title: "",
    youtubeURL: "",
    description: "",
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await getAllCoursesAdmin();
    if (res.status === "success") setCourses(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.courseId) {
      toast.error("Please select a course");
      return;
    }

    const res = await addVideo(form);

    if (res.status === "success") {
      toast.success("Video added successfully");
      navigate("/admin/videos");
    } else {
      toast.error("Failed to add video");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <div className="card shadow p-4">
        <h4 className="text-center mb-3">Add New Video</h4>

        <form onSubmit={handleSubmit}>
          <select
            className="form-control mb-2"
            name="courseId"
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.courseName}
              </option>
            ))}
          </select>

          <input
            className="form-control mb-2"
            name="title"
            placeholder="Video Title"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="youtubeURL"
            placeholder="YouTube URL"
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            Add Video
          </button>
        </form>
      </div>
    </div>
  );
}
