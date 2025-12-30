import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function RegistrationForm() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD COURSE ================= */
  useEffect(() => {
    if (!token || !user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:4000/course/${courseId}`)
      .then(res => {
        if (res.data.status === "success") {
          setCourse(res.data.data);
        } else {
          toast.error(res.data.error || "Course not found");
        }
      })
      .catch(() => toast.error("Failed to load course"));
  }, [courseId, navigate, token, user]);

  /* ================= REGISTER ================= */
  const register = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:4000/student/register-to-course",
        {
          courseId,
          name: user.name,
          mobileNo: user.mobile_no, // ✅ FIXED (matches backend)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === "success") {
        toast.success("Registered successfully");
        navigate("/my-courses");
      } else {
        toast.error(res.data.error);
      }
    } catch (err) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return null;

  return (
    <div className="container mt-5">
      {/* ================= COURSE DETAILS ================= */}
      <table className="table table-bordered w-50 mx-auto mb-4">
        <tbody>
          <tr>
            <th>Course Name</th>
            <td>{course.courseName}</td>
          </tr>
          <tr>
            <th>Fees</th>
            <td>₹{course.fees}</td>
          </tr>
          <tr>
            <th>Start Date</th>
            <td>
              {new Date(course.startDate).toLocaleDateString("en-IN")}
            </td>
          </tr>
          <tr>
            <th>End Date</th>
            <td>
              {new Date(course.endDate).toLocaleDateString("en-IN")}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ================= STUDENT DETAILS ================= */}
      <div className="card shadow mx-auto" style={{ maxWidth: 450 }}>
        <div className="card-body">
          <h4 className="text-center mb-4">
            Confirm Course Registration
          </h4>

          <input
            className="form-control mb-3"
            value={user.name}
            readOnly
          />

          <input
            className="form-control mb-3"
            value={user.email}
            readOnly
          />

          <input
            className="form-control mb-4"
            value={user.mobile_no} // ✅ FIXED
            readOnly
          />

          <button
            className="btn btn-success w-100"
            onClick={register}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
