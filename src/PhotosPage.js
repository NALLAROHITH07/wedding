import React, { useEffect, useMemo, useState } from "react";
import "./PhotosPage.css";
import { photosSections } from "./photosData";

const PhotosPage = ({ initialFilters = {} }) => {
  const initialSectionKey = initialFilters.section || Object.keys(photosSections)[0];
  const [activeKey, setActiveKey] = useState(initialSectionKey);

  useEffect(() => {
    if (initialFilters.section && photosSections[initialFilters.section]) {
      setActiveKey(initialFilters.section);
    }
  }, [initialFilters]);

  const { title, images, group } = useMemo(() => {
    const current = photosSections[activeKey] || photosSections[initialSectionKey];
    return current;
  }, [activeKey, initialSectionKey]);

  const groups = useMemo(() => {
    // Build grouped section list for left nav
    const byGroup = {};
    Object.entries(photosSections).forEach(([key, value]) => {
      if (!byGroup[value.group]) byGroup[value.group] = [];
      byGroup[value.group].push({ key, title: value.title });
    });
    return byGroup;
  }, []);

  return (
    <div className="photos-page">
      <div className="photos-hero">
        <h1>{title}</h1>
        <p>Explore handpicked inspiration and ideas for your wedding</p>
      </div>
      <div className="photos-content">
        <aside className="photos-sidebar">
          {Object.keys(groups).map((g) => (
            <div key={g} className="sidebar-group">
              <h4>{g}</h4>
              <ul>
                {groups[g].map((item) => (
                  <li
                    key={item.key}
                    className={activeKey === item.key ? "active" : ""}
                    onClick={() => setActiveKey(item.key)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <section className="photos-gallery">
          <div className="masonry">
            {images.map((src, idx) => (
              <a
                key={idx}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="masonry-item"
              >
                <img src={src} alt={title + " " + (idx + 1)} />
                <div className="img-overlay">
                  <span>Open</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PhotosPage;


