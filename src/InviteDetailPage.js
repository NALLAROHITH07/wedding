import React, { useEffect, useMemo, useState } from "react";
import "./InviteDetailPage.css";
import { findTemplateById } from "./invitesData";

const InviteDetailPage = ({ initialFilters = {} }) => {
  const templateId = initialFilters.templateId;
  const template = useMemo(() => findTemplateById(templateId) || findTemplateById('bird-of-charm'), [templateId]);

  const [brideName, setBrideName] = useState(template.defaults.brideName);
  const [groomName, setGroomName] = useState(template.defaults.groomName);
  const [date, setDate] = useState(template.defaults.date);
  const [venue, setVenue] = useState(template.defaults.venue);

  useEffect(() => {
    setBrideName(template.defaults.brideName);
    setGroomName(template.defaults.groomName);
    setDate(template.defaults.date);
    setVenue(template.defaults.venue);
  }, [template]);

  return (
    <div className="invite-detail-page">
      <div className="detail-hero">
        <h1>{template.title}</h1>
        <p>Customize names and details live on the preview</p>
      </div>

      <div className="detail-content">
        <div className="detail-preview">
          <div className="card-canvas" style={{ backgroundImage: `url(${template.image})` }}>
            <div className="card-overlay">
              <h2 className="names">{brideName} & {groomName}</h2>
              <div className="info-line">{date}</div>
              <div className="info-line">{venue}</div>
            </div>
          </div>
        </div>

        <div className="detail-form">
          <div className="form-row">
            <label>Bride Name</label>
            <input value={brideName} onChange={(e) => setBrideName(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Groom Name</label>
            <input value={groomName} onChange={(e) => setGroomName(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Date</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Venue</label>
            <input value={venue} onChange={(e) => setVenue(e.target.value)} />
          </div>
          <div className="actions">
            <button className="primary">Save</button>
            <button className="secondary" onClick={() => window.print()}>Download / Print</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteDetailPage;


