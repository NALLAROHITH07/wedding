import React, { useEffect, useState } from "react";
import "./VendorDetailPage.css";

function VendorMyServicesPage() {
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [toast, setToast] = useState("");
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(API_BASE + "/vendor-services/mine", { headers: { Authorization: `Bearer ${token}` } })
      .then(async (r) => {
        if (r.status === 401) {
          setUnauthorized(true);
          return { services: [] };
        }
        return r.json();
      })
      .then((d) => setServices(d.services || []))
      .catch(() => setUnauthorized(true))
      .finally(() => setLoading(false));
  }, [API_BASE]);

  const startEdit = (svc) => { setEditing(svc._id); setDraft({ ...svc, venueTypes: (svc.venueTypes||[]).join(', '), features: (svc.features||[]).join(', ') }); };
  const cancelEdit = () => { setEditing(null); setDraft({}); };
  const updateField = (k, v) => setDraft(p => ({ ...p, [k]: v }));
  const save = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/vendor-services/${editing}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...draft,
          venueTypes: draft.venueTypes ? draft.venueTypes.split(',').map(s=>s.trim()) : [],
          features: draft.features ? draft.features.split(',').map(s=>s.trim()) : []
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      setServices(s => s.map(x => x._id === editing ? data.service : x));
      setToast('Service updated');
      setTimeout(()=>setToast(''),1500);
      cancelEdit();
    } catch (e) {
      setToast(e.message);
      setTimeout(()=>setToast(''),1500);
    }
  };
  const remove = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/vendor-services/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      setServices(s => s.filter(x => x._id !== id));
      setToast('Service deleted');
      setTimeout(()=>setToast(''),1500);
    } catch (e) {
      setToast(e.message);
      setTimeout(()=>setToast(''),1500);
    }
  };

  return (
    <div className="signup-container">
      {toast && (
        <div className="success-toast floating-toast">{toast}</div>
      )}
      <div className="signup-card" style={{ maxWidth: 1100 }}>
        <h2>My Services</h2>
        {loading ? (
          <div style={{ padding: 16 }}>Loading...</div>
        ) : unauthorized ? (
          <p className="signup-subtitle">You must be logged in as a vendor to view your services.</p>
        ) : services.length === 0 ? (
          <div>
            <p className="signup-subtitle">No services yet.</p>
            <div style={{ marginTop: 12 }}>
              <a className="vendor-primary-btn" href="/?page=vendor-add-service" target="_blank" rel="noreferrer">Add Service</a>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {services.map((s, idx) => (
              <div key={s._id} className="image-card" style={{ animation: 'fadeIn .3s ease-out both', animationDelay: `${idx * 40}ms`, position: 'relative' }}>
                <img className="image-main" src={s.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800'} alt={s.name} />
                <div className="image-gradient" />
                <div className="image-caption">
                  {editing === s._id ? (
                    <>
                      <input value={draft.name||''} onChange={e=>updateField('name', e.target.value)} className="inline-input" />
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginTop:6 }}>
                        <input value={draft.city||''} onChange={e=>updateField('city', e.target.value)} className="inline-input" placeholder="City" />
                        <input value={draft.location||''} onChange={e=>updateField('location', e.target.value)} className="inline-input" placeholder="Location" />
                      </div>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginTop:6 }}>
                        <input value={draft.price||''} onChange={e=>updateField('price', e.target.value)} className="inline-input" placeholder="Price" />
                        <input value={draft.image||''} onChange={e=>updateField('image', e.target.value)} className="inline-input" placeholder="Image URL" />
                      </div>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginTop:6 }}>
                        <input value={draft.vegPrice||''} onChange={e=>updateField('vegPrice', e.target.value)} className="inline-input" placeholder="Veg Price" />
                        <input value={draft.nonVegPrice||''} onChange={e=>updateField('nonVegPrice', e.target.value)} className="inline-input" placeholder="Non-Veg Price" />
                      </div>
                      <input value={draft.venueTypes||''} onChange={e=>updateField('venueTypes', e.target.value)} className="inline-input" placeholder="Venue Types (comma separated)" style={{ marginTop:6 }} />
                      <input value={draft.features||''} onChange={e=>updateField('features', e.target.value)} className="inline-input" placeholder="Features (comma separated)" style={{ marginTop:6 }} />
                      <div style={{ display:'flex', gap:8, marginTop:8 }}>
                        <button className="vendor-primary-btn" onClick={save}>Save</button>
                        <button className="vendor-primary-btn" style={{ background:'#f43f5e' }} onClick={cancelEdit}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="vendor-title" style={{ fontSize: 20 }}>{s.name}</h3>
                      <p className="vendor-sub" style={{ marginTop: 2 }}>{s.city}{s.location ? ` • ${s.location}` : ''}</p>
                      {s.price && <div className="vendor-price" style={{ fontSize: 16 }}>{s.price}</div>}
                      {(s.vegPrice || s.nonVegPrice) && (
                        <div className="vendor-dual-price" style={{ fontSize: 13 }}>
                          {s.vegPrice && <div><span className="price-label">Veg</span> <span className="price-value">{s.vegPrice}</span></div>}
                          {s.nonVegPrice && <div><span className="price-label">Non-veg</span> <span className="price-value">{s.nonVegPrice}</span></div>}
                        </div>
                      )}
                      <div style={{ display:'flex', gap:8, marginTop:8 }}>
                        <button className="vendor-primary-btn" onClick={()=>startEdit(s)}>Edit</button>
                        <button className="vendor-primary-btn" style={{ background:'#fee2e2', color:'#b91c1c' }} onClick={()=>remove(s._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorMyServicesPage;


