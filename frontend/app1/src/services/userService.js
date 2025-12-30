import axios from "axios";
import config from "./config";

/* ================= LOGIN ================= */
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      `${config.BASE_URL}/auth/signin`,
      { email, password }
    );
    return res.data;
  } catch {
    return { status: "error", error: "Invalid email or password" };
  }
};

/* ================= REGISTER ================= */
export const registerUser = async (name, email, password, mobile) => {
  try {
    const res = await axios.post(
      `${config.BASE_URL}/auth/register`,
      {
        name,
        email,
        password,
        mobile_no: mobile,
        course_id: null // can assign later
      }
    );
    return res.data;
  } catch {
    return { status: "error", error: "Registration failed" };
  }
};
