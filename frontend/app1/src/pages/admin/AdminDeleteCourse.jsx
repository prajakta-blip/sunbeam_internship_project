import { useEffect, useState } from "react";
import { getAllCoursesAdmin, deleteCourse } from "../../services/courseService";

export default function AdminDeleteCourse() {
  const [courses, setCourses] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await getAllCoursesAdmin();
    if (res.status === "success") {
      setCourses(res.data);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) {
      alert("Select a course");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this course?")) return;

    await deleteCourse(selectedId);
    alert("Course deleted successfully");
    setSelectedId("");
    loadCourses();
  };

  return (
    <div className="container">
      <h3 className="text-danger mb-3">Delete Course</h3>

      <select
        className="form-select mb-3"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Select Course</option>
        {courses.map(c => (
          <option key={c.id} value={c.id}>
            {c.courseName}
          </option>
        ))}
      </select>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Course
      </button>
    </div>
  );
}
