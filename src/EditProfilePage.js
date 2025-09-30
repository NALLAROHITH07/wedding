import React, { useEffect, useState } from "react";
import "./VendorSignupPage.css";

function EditProfilePage() {
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(API_BASE + "/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setForm({ name: data.user.name || "", email: data.user.email || "", mobile: data.user.mobile || "" });
      })
      .finally(() => setLoading(false));
  }, [API_BASE]);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch(API_BASE + "/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update");
      localStorage.setItem("authName", data.user?.name || form.name);
      setToast("Profile updated successfully");
      setTimeout(() => setToast(""), 2000);
    } catch (e) {
      setToast(e.message);
      setTimeout(() => setToast(""), 2000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div className="signup-container">
      {toast && (
        <div className="success-toast" style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
          background: '#10b981', color: '#fff', padding: '10px 16px', borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 1000
        }}>{toast}</div>
      )}
      <div className="signup-card" style={{ transition: 'transform .2s ease', animation: 'fadeIn .15s ease-out' }}>
        <h2>Edit Profile</h2>
        <p className="signup-subtitle">Update your details</p>
        <form onSubmit={onSave}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mobile</label>
              <input type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} required />
            </div>
          </div>
          <button disabled={saving} className="vendor-primary-btn" style={{ width: '100%', marginTop: 12 }}>{saving ? 'Saving...' : 'Save Changes'}</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;


