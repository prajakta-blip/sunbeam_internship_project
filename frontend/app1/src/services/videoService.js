import axios from "axios";

const BASE_URL = "http://localhost:4000/video";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllVideos = async (courseId = "") => {
  const url = courseId
    ? `${BASE_URL}/all-videos?courseId=${courseId}`
    : `${BASE_URL}/all-videos`;

  const res = await axios.get(url, authHeader());
  return res.data;
};
