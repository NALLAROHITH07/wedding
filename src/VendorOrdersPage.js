import React, { useEffect, useMemo, useState } from "react";
import "./VendorSignupPage.css";

function VendorOrdersPage() {
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
  const [status, setStatus] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const token = useMemo(() => localStorage.getItem("token"), []);

  const fetchOrders = async (s) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/vendor-orders?status=${encodeURIComponent(s)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(status); }, [status]);

  const updateStatus = async (id, next) => {
    try {
      const res = await fetch(`${API_BASE}/vendor-orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: next })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setToast(`Order ${next}`);
      setTimeout(() => setToast(""), 1500);
      fetchOrders(status);
    } catch (e) {
      setToast(e.message);
      setTimeout(() => setToast(""), 1500);
    }
  };

  return (
    <div className="signup-container">
      {toast && (
        <div className="success-toast" style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: '#fff', padding: '10px 16px', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 1000 }}>{toast}</div>
      )}
      <div className="signup-card" style={{ maxWidth: 1000 }}>
        <h2>Orders</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {['pending', 'accepted', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className="vendor-primary-btn"
              style={{ padding: '8px 12px', background: status === s ? 'linear-gradient(90deg, #7f5af0, #ff5470)' : '#f3f4f6', color: status === s ? '#fff' : '#111', border: status === s ? 'none' : '1px solid #e5e7eb' }}
            >{s[0].toUpperCase() + s.slice(1)}</button>
          ))}
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : orders.length === 0 ? (
          <div className="signup-subtitle">No {status} orders.</div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {orders.map(o => (
              <div key={o._id} style={{ border: '1px solid #eceef3', borderRadius: 12, padding: 12, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{o.fromName} • {o.fromPhone}</div>
                  <div style={{ color: '#6b7280' }}>{o.fromEmail}</div>
                  <div style={{ marginTop: 6 }}>{o.message}</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: '#6b7280' }}>For: {o.vendorName}</div>
                </div>
                {status === 'pending' && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="vendor-primary-btn" onClick={() => updateStatus(o._id, 'accepted')}>Accept</button>
                    <button className="vendor-primary-btn" style={{ background: '#f43f5e' }} onClick={() => updateStatus(o._id, 'rejected')}>Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorOrdersPage;
