import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/auth/signin", {
        email,
        password,
      });

      if (res.data.status === "success") {
  const { token, user } = res.data.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  toast.success("Login successful");

  // ✅ CLEAN REDIRECT
  if (user.role === "ADMIN") {
    navigate("/admin", { replace: true });
  } else {
    navigate("/", { replace: true });
  }
}
 else {
        toast.error(res.data.error);
      }
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h3 className="text-center mb-4">Login</h3>

      <input
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className="btn btn-success w-100" onClick={login}>
        Login
      </button>

      <p className="text-center mt-3">
        Not registered yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
