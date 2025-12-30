import axios from "axios";
import config from "./config";

const BASE_URL = "http://localhost:4000/course";

/* 🔐 AUTH HEADER */
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* ================= STUDENT ================= */
export const getActiveCourses = async () => {
  const res = await axios.get(`${BASE_URL}/all-active-courses`);
  return res.data;
};

/* ================= ADMIN ================= */
export const getAllCoursesAdmin = async () => {
  const res = await axios.get(`${BASE_URL}/all-courses`, authHeader());
  return res.data;
};

export const addCourse = async (data) => {
  const res = await axios.post(`${BASE_URL}/add`, data, authHeader());
  return res.data;
};

export const updateCourse = async (id, data) => {
  const res = await axios.put(
    `${BASE_URL}/update/${id}`,
    data,
    authHeader()
  );
  return res.data;
};


export const deleteCourse = async (id) => {
  const res = await axios.delete(`${BASE_URL}/delete/${id}`, authHeader());
  return res.data;
};

/* ================= FILTER DROPDOWN (ADMIN STUDENTS) ================= */
export const getActiveCoursesForFilter = async () => {
  const res = await axios.get(`${BASE_URL}/all-active-courses`);
  return res.data;
};

export const getCourseById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};
