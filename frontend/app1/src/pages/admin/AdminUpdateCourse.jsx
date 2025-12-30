import { useEffect, useState } from "react";
import { getAllCoursesAdmin, updateCourse } from "../../services/courseService";

export default function AdminUpdateCourse() {
  const [courses, setCourses] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await getAllCoursesAdmin();
    if (res.status === "success") {
      setCourses(res.data);
    }
  };

  const handleUpdate = async () => {
    if (!selectedId || !courseName.trim()) {
      alert("Select course and enter new name");
      return;
    }

    await updateCourse(selectedId, { courseName });
    alert("Course updated successfully");
    setCourseName("");
    loadCourses();
  };

  return (
    <div className="container">
      <h3 className="mb-3">Update Course</h3>

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

      <input
        className="form-control mb-3"
        placeholder="New Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />

      <button className="btn btn-warning" onClick={handleUpdate}>
        Update Course
      </button>
    </div>
  );
}
