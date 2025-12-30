import { Link } from "react-router-dom";
import courseImages from "../utils/courseImages";

function CourseCard({ id, title, fee }) {
  return (
    <div className="col-md-4 mt-3">
      <div className="card shadow h-100">
        <img
          src={courseImages[title]}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
          alt={title}
        />

        <div className="card-body">
          <h5>{title}</h5>
          <p><b>Fees:</b> ₹{fee}</p>

          <Link to={`/course/${id}`} className="btn btn-primary">
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
