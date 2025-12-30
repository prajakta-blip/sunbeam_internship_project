import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCoursesAdmin, deleteCourse } from "../../services/courseService";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await getAllCoursesAdmin();
    if (res.status === "success") setCourses(res.data);
  };
    const getExpireDays = (endDate) => {
      const today = new Date();
      const end = new Date(endDate);

      const diffTime = end - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays > 0 ? diffDays : 0;
    };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      await deleteCourse(id);
      loadCourses();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h4>All Courses</h4>
        <button
          className="btn btn-success"
          onClick={() => navigate("/admin/course/add")}
        >
          + Add Course
        </button>
      </div>

      <table className="table table-bordered table-striped">
  <thead className="table-dark">
    <tr>
      <th>ID</th>
      <th>Course Name</th>
      <th>Description</th>
      <th>Fees</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Expire Days</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
  {courses.map(c => (
    <tr key={c.id}>
  <td>{c.id}</td>
  <td>{c.courseName}</td>
  <td>{c.description}</td>
  <td>₹{c.fees}</td>
  <td>{new Date(c.startDate).toLocaleDateString()}</td>
  <td>{new Date(c.endDate).toLocaleDateString()}</td>
  <td>{c.expireDays}</td>
  <td>
    <button className="btn btn-warning btn-sm me-2">✏️</button>
    <button className="btn btn-danger btn-sm">🗑️</button>
  </td>
</tr>

  ))}
</tbody>

</table>

    </>
  );
}
