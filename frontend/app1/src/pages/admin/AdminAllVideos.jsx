import { useEffect, useState } from "react";
import { getAllVideos } from "../../services/videoService";
import { getAllCoursesAdmin } from "../../services/courseService";

export default function AdminAllVideos() {
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    loadCourses();
    loadVideos();
  }, []);

  const loadCourses = async () => {
    const res = await getAllCoursesAdmin();
    if (res.status === "success") {
      setCourses(res.data);
    }
  };

  const loadVideos = async (courseId = "") => {
    const res = await getAllVideos(courseId);
    if (res.status === "success") {
      setVideos(res.data);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedCourse(value);
    loadVideos(value);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">All Videos</h3>

      {/* FILTER */}
      <div className="mb-3" style={{ maxWidth: 300 }}>
        <label className="form-label">Filter by Course</label>
        <select
          className="form-select"
          value={selectedCourse}
          onChange={handleFilterChange}
        >
          <option value="">All Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.courseName}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Title</th>
            <th>Description</th>
            <th>YouTube URL</th>
            <th>Added At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {videos.length > 0 ? (
            videos.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.courseName}</td>
                <td>{v.title}</td>
                <td>{v.description}</td>
                <td>
                  <a href={v.youtubeURL} target="_blank" rel="noreferrer">
                    Watch
                  </a>
                </td>
                <td>
                  {new Date(v.added_at).toLocaleDateString("en-IN")}
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No videos found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
