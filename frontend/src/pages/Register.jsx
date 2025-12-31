import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./Auth.css";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("Registered Successfully");
    window.location.href = "/";
  };

  return (
    <div className="auth-container">
      <form className="auth-card slide-in" onSubmit={submit}>
        <h2>Create Account 🚀</h2>
        <p>Start managing customers efficiently</p>

        <input
          type="text"
          placeholder="Full Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Register</button>

        <span>
          Already have an account? <Link to="/">Login</Link>
        </span>
      </form>
    </div>
  );
}
