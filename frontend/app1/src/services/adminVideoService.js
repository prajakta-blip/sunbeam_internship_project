import axios from "axios";
import config from "./config";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllVideos = async (courseId) => {
  const url = courseId
    ? `${config.BASE_URL}/video/all-videos?courseId=${courseId}`
    : `${config.BASE_URL}/video/all-videos`;

  const res = await axios.get(url, authHeader());
  return res.data;
};

export const addVideo = async (data) => {
  const res = await axios.post(
    `${config.BASE_URL}/video/add`,
    data,
    authHeader()
  );
  return res.data;
};

export const getVideoById = async (id) => {
  const res = await axios.get(
    `${config.BASE_URL}/video/${id}`,
    authHeader()
  );
  return res.data;
};

export const updateVideo = async (id, data) => {
  const res = await axios.put(
    `${config.BASE_URL}/video/update/${id}`,
    data,
    authHeader()
  );
  return res.data;
};

/* ✅ ADD THIS */
export const deleteVideo = async (id) => {
  const res = await axios.delete(
    `${config.BASE_URL}/video/delete/${id}`,
    authHeader()
  );
  return res.data;
};
