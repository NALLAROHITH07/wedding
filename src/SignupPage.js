// src/SignupPage.js
import React, { useState } from "react";
import "./SignupPage.css";

const SignupPage = () => {
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(API_BASE + "/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to signup");
      localStorage.setItem("token", data.token);
      localStorage.setItem("authName", data.user?.name || name);
      setSuccessMessage("Signed up successfully! Redirecting to login...");
      setTimeout(() => {
        try {
          localStorage.setItem("openLogin", "true");
        } catch {}
        const url = new URL(window.location);
        url.searchParams.delete('page');
        window.location.href = url.toString();
      }, 2000);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup-page">
      {successMessage && (
        <div className="success-toast" style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
          background: '#10b981', color: '#fff', padding: '10px 16px', borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 1000
        }}>
          {successMessage}
        </div>
      )}
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create your account</h1>
          <p>Join Catalyst Wedding and start planning in style</p>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Mobile Number</label>
            <input 
              type="tel" 
              placeholder="10-digit mobile number" 
              value={mobile} 
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Password</label>
            <div className="password-field">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Create a password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-row">
            <label>Confirm Password</label>
            <div className="password-field">
              <input 
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="button" className="toggle-btn" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button className="signup-btn" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;


