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

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Fees</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.courseName}</td>
              <td>₹{c.fees}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/admin/course/edit/${c.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
