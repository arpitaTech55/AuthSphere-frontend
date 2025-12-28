import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    // Frontend validation
    if (!name || !email || !password) {
      return handleError("Name, Email and Password are required");
    }

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        return handleError("Unexpected server response");
      }

      const { success, msg, error } = result;

      if (success) {
        handleSuccess(msg);
        setTimeout(() => navigate("/login"), 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message || error?.message || "Signup failed";
        handleError(details);
      } else {
        handleError(msg || "Signup failed");
      }
    } catch (err) {
      handleError(err.message || "Network error");
    }
  };

  return (
    <div className="container">
      <h2><b>Signup</b></h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            value={signupInfo.name}
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            value={signupInfo.email}
            onChange={handleChange}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            value={signupInfo.password}
            onChange={handleChange}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="d-grid gap-3 col-10 mx-auto mb-2">
          <button className="btn btn-primary" type="submit">Signup</button>
        </div>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
