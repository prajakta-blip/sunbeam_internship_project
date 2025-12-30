import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/userService";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    const result = await registerUser(
      name,
      email,
      password,
      mobile
    );

    if (result.status === "success") {
      toast.success("User registered successfully");
      navigate("/login"); // ✅ redirect works now
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="container w-50 mt-4">
      <h3>Student Registration</h3>

      <input
        className="form-control mb-2"
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Mobile"
        onChange={e => setMobile(e.target.value)}
      />

      <button className="btn btn-success" onClick={signup}>
        Register
      </button>

      <p className="mt-3">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
