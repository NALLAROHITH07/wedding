import React, { useState } from "react";
import "./WeddingCategoriesPage.css";
import Navbar from "./navbar";
import Footer from "./Footer";

const categoriesData = [
  {
    id: 1,
    title: "Venues",
    desc: "Banquet Halls, Marriage Garden / Lawns, ...",
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
    desc: "Invitations, Favors, Trousseau Packers, Invitation Gifts, Mehndi Favors",
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
    desc: "Bridal Lehengas, Kanjeevaram / Silk Sarees, Cocktail Gowns, Trousseau Sarees, Bridal Lehenga on Rent",
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

const WeddingCategoriesPage = ({ onNavigate }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    console.log('Toggling category:', id);
    setExpandedId((curr) => {
      const newExpandedId = curr === id ? null : id;
      console.log('New expanded ID:', newExpandedId);
      
      // Smooth scroll to the expanded item
      if (newExpandedId) {
        setTimeout(() => {
          const element = document.querySelector(`[data-category-id="${id}"]`);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }, 100);
      }
      
      return newExpandedId;
    });
  };

  const handleCategoryClick = (categoryTitle) => {
    // Map category titles to category keys
    const categoryMap = {
      'Photographers': 'photographers',
      'Bridal Makeup': 'makeup',
      'Family Makeup': 'makeup',
      'Wedding Planners': 'planners',
      'Decorators': 'decorators',
      'Virtual planning': 'planners',
      'Mehendi Artist': 'makeup',
      'DJs': 'entertainment',
      'Sangeet Choreographer': 'entertainment',
      'Wedding Entertainment': 'entertainment',
      'Invitations': 'invitations',
      'Favors': 'invitations',
      'Trousseau Packers': 'invitations',
      'Invitation Gifts': 'invitations',
      'Mehndi Favors': 'invitations',
      'Catering Services': 'catering',
      'Cake': 'catering',
      'Chaat & Food Stalls': 'catering',
      'Bartenders': 'catering',
      'Pre Wedding Shoot Locations': 'photographers',
      'Pre Wedding Photographers': 'photographers',
      'Bridal Lehengas': 'bridalwear',
      'Kanjeevaram / Silk Sarees': 'bridalwear',
      'Cocktail Gowns': 'bridalwear',
      'Trousseau Sarees': 'bridalwear',
      'Bridal Lehenga on Rent': 'bridalwear',
      'Sherwani': 'groomwear',
      'Wedding Suits / Tuxes': 'groomwear',
      'Sherwani On Rent': 'groomwear',
      'Jewellery': 'jewellery',
      'Flower Jewellery': 'jewellery',
      'Bridal Jewellery on Rent': 'jewellery',
      'Accessories': 'jewellery',
      'Wedding Pandits': 'pandits',
      'Beauty and Wellness': 'grooming'
    };

    const categoryKey = categoryMap[categoryTitle] || 'photographers';
    
    if (onNavigate) {
      onNavigate('vendors', { category: categoryKey });
    }
  };

  return (
    <div className="wedding-categories-page">
 
      
      {/* Page Content */}
      <div className="categories-page-content">
        {/* Header Section */}
        <div className="categories-header">
          <div className="container">
            <div className="breadcrumb">
              <span>Home</span> / <span>Wedding Categories</span>
            </div>
            <h1>Wedding Categories</h1>
            <p className="categories-subtitle">
              Discover all the services you need for your perfect wedding day
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container">
          <div className="categories-grid">
            {categoriesData.map((cat, i) => {
              const expanded = expandedId === cat.id;
              return (
                <div
                  key={cat.id}
                  data-category-id={cat.id}
                  className={`category-card category-color-${(i % 6) + 1} ${
                    expanded ? "expanded" : ""
                  }`}
                >
                  <div 
                    className="category-card-head"
                    onClick={() => toggleExpand(cat.id)}
                  >
                    <div className="category-card-text">
                      <h3>
                        {cat.title}
                        <span className={`arrow ${expanded ? "up" : ""}`}>▾</span>
                      </h3>
                      <p>{cat.desc}</p>
                    </div>
                    <div className="category-card-img">
                      <img src={cat.img} alt={cat.title} />
                    </div>
                  </div>

                  <div className={`category-details ${expanded ? "open" : ""}`}>
                    <div className="category-details-inner">
                      {expanded && (
                        <div style={{ 
                          padding: '10px 0', 
                          borderBottom: '1px solid #ddd', 
                          marginBottom: '10px',
                          fontSize: '0.9rem',
                          color: '#666'
                        }}>
                          Click on any item below to explore vendors:
                        </div>
                      )}
                      {cat.items.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="category-detail-item"
                          onClick={() => handleCategoryClick(item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default WeddingCategoriesPage;
