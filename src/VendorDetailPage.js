import React, { useEffect, useMemo, useState } from "react";
import "./VendorSignupPage.css";
import "./VendorDetailPage.css";
import { vendorCategories } from "./vendorData";

function VendorDetailPage() {
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
  const [service, setService] = useState(null);
  const [form, setForm] = useState({ fromName: "", fromEmail: "", fromPhone: "", message: "" });
  const [toast, setToast] = useState("");

  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const id = params.get('id');
  const type = params.get('type');

  useEffect(() => {
    if (!id) return;
    // Try API first
    fetch(`${API_BASE}/vendor-services/${id}`)
      .then(async (r) => {
        if (r.ok) return r.json();
        throw new Error('not-found');
      })
      .then(d => setService(d.service || null))
      .catch(() => {
        // Fallback: search in static vendorData by id and current category
        const cat = vendorCategories[type || 'photographers'];
        const found = cat?.vendors?.find(v => String(v.id) === String(id));
        if (found) {
          setService({
            _id: id,
            name: found.name,
            city: found.city,
            location: found.location,
            image: found.image,
            price: found.price,
            priceUnit: found.priceUnit,
            services: found.services,
            vegPrice: found.vegPrice,
            nonVegPrice: found.nonVegPrice,
            capacity: found.capacity,
            rooms: found.rooms,
            venueTypes: found.venueTypes,
            features: found.features || [],
          });
        }
      });
  }, [API_BASE, id, type]);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const send = async (e) => {
    e.preventDefault();
    if (!service?._id) return;
    const res = await fetch(`${API_BASE}/vendor-services/${service._id}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (!res.ok) return setToast(data.message || 'Failed');
    setToast('Sent');
    setTimeout(() => setToast(''), 2000);
    setForm({ fromName: "", fromEmail: "", fromPhone: "", message: "" });
  };

  if (!service) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div className="vendor-detail">
      {toast && (
        <div className="success-toast floating-toast">{toast}</div>
      )}

      <div className="vendor-body">
        <div className="vendor-left">
          <div className="image-card">
            <img className="image-main" src={service.image} alt={service.name} />
            <div className="image-gradient" />
            <div className="image-caption">
              <h1 className="vendor-title">{service.name}</h1>
              <p className="vendor-sub">{service.city}{service.location ? ` • ${service.location}` : ''}</p>
              {service.price && (
                <div className="vendor-price">{service.price} {service.priceUnit ? `(${service.priceUnit})` : ''}</div>
              )}
              {(service.vegPrice || service.nonVegPrice) && (
                <div className="vendor-dual-price">
                  {service.vegPrice && <div><span className="price-label">Veg</span> <span className="price-value">{service.vegPrice}</span></div>}
                  {service.nonVegPrice && <div><span className="price-label">Non-veg</span> <span className="price-value">{service.nonVegPrice}</span></div>}
                </div>
              )}
            </div>
          </div>

          {service.capacity && (
            <div className="vendor-stat-card">
              <div className="stat-title">Capacity</div>
              <div className="stat-value">{service.capacity}{service.rooms ? ` • Rooms: ${service.rooms}` : ''}</div>
            </div>
          )}

          {service.venueTypes?.length > 0 && (
            <div className="vendor-chip-group">
              {service.venueTypes.map((t, i) => (
                <span key={i} className="chip">{t}</span>
              ))}
            </div>
          )}
          {service.features?.length > 0 && (
            <div className="vendor-chip-group" style={{ marginTop: 8 }}>
              {service.features.map((t, i) => (
                <span key={i} className="chip alt">{t}</span>
              ))}
            </div>
          )}
        </div>

        <div className="vendor-right">
          <div className="contact-card">
            <h3>Contact {service.name}</h3>
            <form onSubmit={send} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input value={form.fromName} onChange={(e) => update('fromName', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input value={form.fromPhone} onChange={(e) => update('fromPhone', e.target.value)} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={form.fromEmail} onChange={(e) => update('fromEmail', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <input value={form.message} onChange={(e) => update('message', e.target.value)} required />
                </div>
              </div>
              <button className="vendor-primary-btn contact-send">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDetailPage;


