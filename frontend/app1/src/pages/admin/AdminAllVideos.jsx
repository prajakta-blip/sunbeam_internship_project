import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllVideos,
  deleteVideo,
} from "../../services/adminVideoService";
import { toast } from "react-toastify";

export default function AdminAllVideos() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate(); // ✅ FIX 1

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const res = await getAllVideos();
    if (res.status === "success") {
      setVideos(res.data);
    }
  };

  // ✅ FIX 2
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    const res = await deleteVideo(id);
    if (res.status === "success") {
      toast.success("Video deleted successfully");
      loadVideos(); // refresh list
    } else {
      toast.error("Failed to delete video");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">All Videos</h3>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Title</th>
            <th>Description</th>
            <th>YouTube URL</th>
            <th>Added At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.courseName}</td>
              <td>{v.title}</td>
              <td>{v.description}</td>
              <td>
                <a href={v.youtubeURL} target="_blank" rel="noreferrer">
                  Watch
                </a>
              </td>
              <td>
                {new Date(v.added_at).toLocaleDateString("en-IN")}
              </td>
              <td>
                {/* ✅ EDIT */}
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    navigate(`/admin/video/edit/${v.id}`)
                  }
                >
                  Edit
                </button>

                {/* ✅ DELETE */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(v.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
