import React, { useState } from "react";
import "./SignupPage.css";
import "./VendorSignupPage.css";

function VendorSignupPage() {
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    category: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.password || form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(API_BASE + "/vendors/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.businessName,
          contactName: form.contactName,
          email: form.email,
          phone: form.phone,
          category: form.category,
          city: form.city,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to signup");
      localStorage.setItem("token", data.token);
      alert("Vendor account created successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Vendor Registration</h2>
        <p className="signup-subtitle">Create your vendor account</p>
        <form onSubmit={submit}>
          <div className="form-row">
            <div className="form-group">
              <label>Business Name</label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
                placeholder="Your company or brand"
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Person</label>
              <input
                type="text"
                value={form.contactName}
                onChange={(e) => updateField("contactName", e.target.value)}
                placeholder="Full name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@business.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="10-digit mobile"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="photographers">Photographers</option>
                <option value="makeup">Bridal Makeup</option>
                <option value="planners">Wedding Planners</option>
                <option value="decorators">Decorators</option>
                <option value="catering">Catering</option>
                <option value="venues">Venues</option>
                <option value="invitations">Invitations & Gifts</option>
              </select>
            </div>
            <div className="form-group">
              <label>City</label>
              <select
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                required
              >
                <option value="">Select city</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Chandigarh">Chandigarh</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                placeholder="Re-enter password"
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-login-btn vendor-primary-btn" style={{ width: '100%', marginTop: 12 }}>Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default VendorSignupPage;


