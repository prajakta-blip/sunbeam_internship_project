import axios from "axios";
import config from "./config";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* ================= GET ALL STUDENTS ================= */
export const getAllStudents = async () => {
  const res = await axios.get(
    `${config.BASE_URL}/admin/students`,
    authHeader()
  );
  return res.data;
};

/* ================= FILTER STUDENTS BY COURSE ================= */
export const getStudentsByCourse = async (courseId) => {
  const res = await axios.get(
    `${config.BASE_URL}/admin/students?courseId=${courseId}`,
    authHeader()
  );
  return res.data;
};
