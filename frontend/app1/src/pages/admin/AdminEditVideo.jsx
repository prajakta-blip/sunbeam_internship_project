import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoById, updateVideo } from "../../services/adminVideoService";
import { getAllCoursesAdmin } from "../../services/courseService";
import { toast } from "react-toastify";

export default function AdminEditVideo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseId: "",
    title: "",
    youtubeURL: "",
    description: "",
  });

  useEffect(() => {
    loadVideo();
    loadCourses();
  }, []);

  const loadVideo = async () => {
    const res = await getVideoById(id);
    if (res.status === "success") {
      setForm(res.data);
    }
  };

  const loadCourses = async () => {
    const res = await getAllCoursesAdmin();
    if (res.status === "success") {
      setCourses(res.data);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateVideo(id, form);

    if (res.status === "success") {
      toast.success("Video updated successfully");
      navigate("/admin/videos");
    } else {
      toast.error("Failed to update video");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 450 }}>
      <div className="card shadow p-4">
        <h4 className="text-center mb-3">Edit Video</h4>

        <form onSubmit={handleSubmit}>
          <select
            className="form-select mb-2"
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.courseName}
              </option>
            ))}
          </select>

          <input
            className="form-control mb-2"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Video Title"
            required
          />

          <input
            className="form-control mb-2"
            name="youtubeURL"
            value={form.youtubeURL}
            onChange={handleChange}
            placeholder="YouTube URL"
            required
          />

          <textarea
            className="form-control mb-3"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
          />

          <button className="btn btn-primary w-100">
            Update Video
          </button>
        </form>
      </div>
    </div>
  );
}
