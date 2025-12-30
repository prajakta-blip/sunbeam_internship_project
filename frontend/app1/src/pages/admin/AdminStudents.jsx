import { useEffect, useState } from "react";
import {
  getAllStudents,
  getStudentsByCourse,
} from "../../services/adminStudentService";
import { getAllCoursesAdmin } from "../../services/courseService";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("ALL");

  useEffect(() => {
    loadCourses();
    loadAllStudents(); // ✅ LOAD ALL ON PAGE LOAD
  }, []);

  const loadCourses = async () => {
    const res = await getAllCoursesAdmin();
    if (res.status === "success") setCourses(res.data);
  };

  const loadAllStudents = async () => {
    const res = await getAllStudents();
    if (res.status === "success") setStudents(res.data);
  };

  const handleCourseChange = async (e) => {
    const value = e.target.value;
    setSelectedCourse(value);

    if (value === "ALL") {
      loadAllStudents();
    } else {
      const res = await getStudentsByCourse(value);
      if (res.status === "success") setStudents(res.data);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">All Students</h3>

      <div className="mb-3" style={{ maxWidth: 300 }}>
        <label className="form-label">Filter by Course</label>
        <select
          className="form-select"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="ALL">All Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.courseName}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Reg No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Courses</th>
            <th>Mobile No</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr key={s.reg_no}>
                <td>{s.reg_no}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.courses || "N/A"}</td>
                <td>{s.mobile_no}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
