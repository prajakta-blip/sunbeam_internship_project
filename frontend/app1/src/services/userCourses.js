import axios from "axios";
import config from "./config";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export async function registerToCourse(courseId) {
  const res = await axios.post(
    `${config.BASE_URL}/student/register-to-course`,
    { courseId },
    authHeader()
  );
  return res.data;
}

export async function getMyCourses() {
  const res = await axios.get(
    `${config.BASE_URL}/student/my-courses`,
    authHeader()
  );
  return res.data;
}

export async function getVideosByCourse(courseId) {
  const res = await axios.get(
    `${config.BASE_URL}/video/course/${courseId}`
  );
  return res.data;
}
