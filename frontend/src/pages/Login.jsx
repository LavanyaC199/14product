import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="auth-container">
      <form className="auth-card fade-in" onSubmit={submit}>
        <h2>Welcome Back 👋</h2>
        <p>Login to your CRM dashboard</p>

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

        <button type="submit">Login</button>

        <span>
          Don’t have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}


