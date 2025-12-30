import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCoursesWithVideos } from "../services/studentService";

function MyCourses() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyCoursesWithVideos().then(res => {
      if (res.status === "success") {
        setData(res.data);
      }
    });
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center">My Courses</h3>

      {data.map(item => (
        <div key={item.course.id} className="card mb-3">
          <div className="card-header fw-bold">
            {item.course.courseName}
          </div>

          <div className="card-body">
            {item.videos.length === 0 && (
              <p className="text-muted">No videos available</p>
            )}

            {item.videos.map(video => (
              <p
                key={video.id}
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() =>
                  navigate(`/video/${video.id}`, { state: video })
                }
              >
                ▶ {video.title}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyCourses;
