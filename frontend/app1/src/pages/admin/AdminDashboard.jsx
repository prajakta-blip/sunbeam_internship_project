import { useEffect, useState } from "react";
import { getActiveCourses } from "../../services/courseService";

import img1 from "../../assets/sunbeam1.png";
import img2 from "../../assets/sunbeam2.png";
import img3 from "../../assets/sunbeam3.png";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getActiveCourses().then(res => {
      if (res.status === "success") setCourses(res.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>

      <div className="row my-4">
        {[img1, img2, img3].map((img, i) => (
          <div className="col-md-4" key={i}>
            <img src={img} className="img-fluid rounded shadow" />
          </div>
        ))}
      </div>

      <h4>Courses</h4>
      <div className="row">
        {courses.map(c => (
          <div key={c.id} className="col-md-4">
            <div className="card p-3 shadow">
              <h5>{c.courseName}</h5>
              <p>{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
