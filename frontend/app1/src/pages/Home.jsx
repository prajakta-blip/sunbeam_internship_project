import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActiveCourses } from "../services/courseService";
import courseImages from "../utils/courseImages";

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getActiveCourses().then((res) => {
      if (res.status === "success") setCourses(res.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-5">Available Courses</h3>

      <div className="row justify-content-center">
        {courses.map((course) => (
          <div key={course.id} className="col-md-3 mb-4">
            <div className="card shadow-sm h-100 text-center">
              <img
              src={courseImages[course.courseName]}
              className="card-img-top"
              style={{ height: "160px", objectFit: "contain" }}
              alt={course.courseName}
            />

              <div className="card-body">
                <h6>{course.courseName}</h6>
                <p style={{ fontSize: "13px" }}>
                  Starts on:{" "}
                  {new Date(course.startDate).toLocaleDateString("en-IN")}
                </p>
                <Link
                  to={`/course/${course.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
