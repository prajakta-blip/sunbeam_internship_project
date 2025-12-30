import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import courseImages from "../utils/courseImages";
import { toast } from "react-toastify";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      const res = await getCourseById(id);
      if (res.status === "success") {
        setCourse(res.data);
      } else {
        toast.error("Course not found");
      }
    } catch {
      toast.error("Failed to load course");
    }
  };

  const goToRegistrationForm = () => {
    if (!user) {
      toast.info("Please login to register");
      navigate("/login");
      return;
    }
    navigate(`/register/${id}`);
  };

  if (!course) return null;

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={courseImages[course.courseName]}
            className="img-fluid shadow"
            style={{ maxHeight: 360, objectFit: "contain" }}
            alt={course.courseName}
          />
        </div>

        <div className="col-md-6">
          <h3>{course.courseName}</h3>
          <p>{course.description}</p>

          <p><b>Start Date:</b> {new Date(course.startDate).toLocaleDateString("en-IN")}</p>
          <p><b>End Date:</b> {new Date(course.endDate).toLocaleDateString("en-IN")}</p>
          <p><b>Fees:</b> ₹{course.fees}</p>

         {user?.role === "ADMIN" && (
  <button className="btn btn-secondary" disabled>
    Admin cannot register
  </button>
)}

{user?.role === "STUDENT" && (
  <button className="btn btn-success" onClick={goToRegistrationForm}>
    Register to Course
  </button>
)}


          {!user && (
            <button
              className="btn btn-warning"
              onClick={() => navigate("/login")}
            >
              Please login to register
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
