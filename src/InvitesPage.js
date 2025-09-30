import React from "react";
import "./InvitesPage.css";
import { inviteSections } from "./invitesData";

const InvitesPage = ({ onNavigate, initialFilters = {} }) => {
  const sectionKey = initialFilters.section || 'cards';
  const section = inviteSections[sectionKey] || inviteSections.cards;

  const openTemplate = (templateId) => {
    if (onNavigate) {
      onNavigate('invite-detail', { templateId });
    } else {
      const url = new URL(window.location);
      url.searchParams.set('page', 'invite-detail');
      url.searchParams.set('templateId', templateId);
      window.open(url.toString(), '_blank');
    }
  };
  return (
    <div className="invites-page">
      <div className="invites-hero">
        <h1>{section.title}</h1>
        <p>Create stunning e-invites with customizable details</p>
      </div>
      <div className="invites-grid">
        {section.templates.map(t => (
          <div key={t.id} className="invite-card" onClick={() => openTemplate(t.id)}>
            <div className="invite-img-wrap">
              <img src={t.image} alt={t.title} />
              <div className="invite-overlay">Customize</div>
            </div>
            <div className="invite-info">
              <h3>{t.title}</h3>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default InvitesPage;


