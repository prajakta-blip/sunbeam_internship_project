import axios from "axios";
import config from "./config";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* ================= REGISTER TO COURSE ================= */
export const registerToCourse = async (courseId, name, mobileNo) => {
  const res = await axios.post(
    `${config.BASE_URL}/student/register-to-course`,
    { courseId, name, mobileNo },
    authHeader()
  );
  return res.data;
};

/* ================= MY COURSES ================= */
export const getMyCourses = async () => {
  const res = await axios.get(
    `${config.BASE_URL}/student/my-courses`,
    authHeader()
  );
  return res.data;
};

/* ================= MY COURSES WITH VIDEOS ================= */
export const getMyCoursesWithVideos = async () => {
  const res = await axios.get(
    `${config.BASE_URL}/student/my-course-with-videos`,
    authHeader()
  );
  return res.data;
};
