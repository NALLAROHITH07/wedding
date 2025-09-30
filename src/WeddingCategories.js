import React, { useState } from "react";
import "./WeddingCategories.css";

const categoriesData = [
  {
    id: 1,
    title: "Venues",
    desc:"Banquet Halls, Marriage Garden / Lawns, ...",
    img: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/1/venues.jpg",
    items: [
      "View All Venues",
      "Banquet Halls",
      "Marriage Garden / Lawns",
      "Wedding Resorts",
      "Small Function / Party Halls",
      "Destination Wedding Venues",
      "Kalyana Mandapams",
      "4 Star & Above Wedding Hotels",
    ],
  },
  {
    id: 2,
    title: "Photographers",
    desc: "Photographers",
    img: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/2/photographers.jpg",
    items: [
      "Wedding Photographers",
      "Candid Photographers",
      "Pre-Wedding Photographers",
      "Traditional Videography",
      "Cinematic Films",
    ],
  },
  {
    id: 3,
    title: "Makeup",
    desc: "Bridal Makeup, Family Makeup",
    img: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/3/makeup.jpg",
    items: ["Bridal Makeup", "Family Makeup", "HD Makeup", "Airbrush Makeup"],
  },
  {
    id: 4,
    title: "Planning & Decor",
    desc: "Wedding Planners, Decorators",
    img: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/15/VirtualPlanningService.jpg",
    items: ["Wedding Planners", "Decorators", "Stage Décor", "Mandap Décor"],
  },
  {
    id: 5,
    title: "Virtual Planning",
    desc: "Virtual planning",
    img: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/15/VirtualPlanningService.jpg",
    items: ["Online Consultations", "Budget Planner", "Vendor Meetings"],
  },
  {
    id: 6,
    title: "Mehndi",
    desc: "Mehendi Artist",
    img: "https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/6/mehendi-artists.jpg",
    items: ["Bridal Mehndi", "Family Mehndi", "Arabic Mehndi"],
  },
  {
    id: 7,
    title: "Music & Dance",
    desc: "DJs, Sangeet Choreographer, Wedding Entertainment",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRof8U04cTBzGPXnAqdXgXflaJXvyPLh3AK0Q&s",
    items: ["DJs", "Live Bands", "Choreographers", "Dhol / Folk"],
  },
  {
    id: 8,
    title: "Invites & Gifts",
    desc:
      "Invitations, Favors, Trousseau Packers, Invitation Gifts, Mehndi Favors",
    img: "https://cdn0.weddingwire.in/article/1906/3_2/960/jpg/36091-indian-wedding-cards-alokik-exclusive-lead-image.jpeg",
    items: ["Invitations", "Favors", "Trousseau Packers", "Gifting"],
  },
  {
    id: 9,
    title: "Food",
    desc: "Catering Services, Cake, Chaat & Food Stalls, Bartenders",
    img: "https://kasikannucateringworld.in/img/blog/how-does-good-food-play-a-key-role-in-destination-weddings.webp",
    items: ["Catering", "Cakes", "Chaat & Stalls", "Bartenders"],
  },
  {
    id: 10,
    title: "Pre Wedding Shoot",
    desc: "Pre Wedding Shoot Locations, Pre Wedding Photographers",
    img: "https://www.jaihindhphotography.com/wp-content/uploads/2023/10/Pre-wedding-photography-4.jpg",
    items: ["Locations", "Photographers", "Props & Styling"],
  },
  {
    id: 11,
    title: "Bridal Wear",
    desc:
      "Bridal Lehengas, Kanjeevaram / Silk Sarees, Cocktail Gowns, Trousseau Sarees, Bridal Lehenga on Rent",
    img: "https://cdn.shopify.com/s/files/1/0625/7550/9710/files/Dark_Red_Heavy_Embrodeiry_Bridal_Lehenga1_480x480.jpg?v=1715586481",
    items: [
      "Bridal Lehengas",
      "Kanjeevaram / Silk Sarees",
      "Cocktail Gowns",
      "Trousseau Sarees",
      "Lehenga on Rent",
    ],
  },
  {
    id: 12,
    title: "Groom Wear",
    desc: "Sherwani, Wedding Suits / Tuxes, Sherwani On Rent",
    img: "https://www.fiestroevents.com/uploads/24/08/66b21e981eced0608241722949272.png",
    items: ["Sherwani", "Suits / Tuxes", "Sherwani on Rent", "Accessories"],
  },
  {
    id: 13,
    title: "Jewellery & Accessories",
    desc: "Jewellery, Flower Jewellery, Bridal Jewellery on Rent, Accessories",
    img: "https://silvermerc.com/cdn/shop/collections/DSC_9422.jpg?v=1702281735",
    items: ["Jewellery", "Flower Jewellery", "Jewellery on Rent", "Accessories"],
  },
  {
    id: 14,
    title: "Pandits",
    desc: "Wedding Pandits",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRvhXEGzT2bWoS4UCEe7638em6qCPnC9496g&s",
    items: ["Wedding Pandits", "Muhurat & Rituals"],
  },
  {
    id: 15,
    title: "Bridal Grooming",
    desc: "Beauty and Wellness",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDxKACewaD7iEBo6VNCtEFBXV3Bqwn7DHlhpUICXvDHgamQW0-NLuxZxBxPvhqH6FsFXg&usqp=CAU",
    items: ["Salon Services", "Spa", "Skin & Hair Care"],
  },
];

export default function WeddingCategories({ onNavigate }) {
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) =>
    setExpandedId((curr) => (curr === id ? null : id));

  const handleOpen = (title) => {
    if (!onNavigate) return;
    if (title === 'Venues') {
      onNavigate('wedding-categories');
      return;
    }
    const titleToCategory = {
      'Photographers': 'photographers',
      'Makeup': 'makeup',
      'Planning & Decor': 'planners',
      'Virtual Planning': 'planners',
      'Mehndi': 'makeup',
      'Music & Dance': 'entertainment',
      'Invites & Gifts': 'invitations',
      'Food': 'catering',
      'Pre Wedding Shoot': 'photographers',
      'Bridal Wear': 'bridalwear',
      'Groom Wear': 'groomwear',
      'Jewellery & Accessories': 'jewellery',
      'Pandits': 'pandits',
      'Bridal Grooming': 'grooming'
    };
    const category = titleToCategory[title] || 'photographers';
    onNavigate('vendors', { category });
  };

  const visible = showAll ? categoriesData : categoriesData.slice(0, 6);

  return (
    <div className="wc-container">
      <div className="wc-header">
        <h2>Wedding Categories</h2>
        <button onClick={() => setShowAll((s) => !s)}>
          {showAll ? "Hide Categories" : "View all Categories →"}
        </button>
      </div>

      <div className="wc-grid">
        {visible.map((cat, i) => {
          const expanded = expandedId === cat.id;
          return (
            <div
              key={cat.id}
              role="button"
              tabIndex={0}
              aria-expanded={expanded}
              onClick={() => handleOpen(cat.title)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleOpen(cat.title);
              }}
              className={`wc-card wc-color-${(i % 6) + 1} ${
                expanded ? "expanded" : ""
              }`}
            >
              <div className="wc-card-head">
                <div className="wc-card-text">
                  <h3>
                    {cat.title}
                    <span className={`arrow ${expanded ? "up" : ""}`}>▾</span>
                  </h3>
                  <p>{cat.desc}</p>
                </div>
                <div className="wc-card-img">
                  <img src={cat.img} alt={cat.title} />
                </div>
              </div>

              <div className={`wc-details ${expanded ? "open" : ""}`}>
                <div className="wc-details-inner">
                  {cat.items.map((it, idx) => (
                    <div key={idx} className="wc-detail-item">
                      {it}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
