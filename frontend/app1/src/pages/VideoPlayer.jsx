import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function VideoPlayer() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 🔴 If user refreshes page or state is missing
  useEffect(() => {
    if (!state) {
      navigate(-1);
    }
  }, [state, navigate]);

  if (!state) return null;

  // ✅ Convert YouTube URL → Embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";

    // already embed
    if (url.includes("embed")) return url;

    // watch?v=
    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // youtu.be/
    if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h4 className="mb-3">{state.title}</h4>

      <iframe
        width="100%"
        height="450"
        src={getEmbedUrl(state.youtubeURL)}
        title={state.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoPlayer;
