import React, { useState, useEffect } from "react";
import "./popularsearches.css";

const data = [
  { title: "Bridal Wear", img: "https://image.wedmegood.com/resized/300X/uploads/banner_image/1/bridal-wear.jpg" },
  { title: "Bridal Makeup", img: "https://image.wedmegood.com/resized/300X/uploads/banner_image/2/mua.jpg" },
  { title: "Photographers", img: "https://image.wedmegood.com/resized/300X/uploads/banner_image/3/photography.jpg" },
  { title: "Invitations", img: "https://image.wedmegood.com/resized/300X/uploads/banner_image/4/cards.jpg" },
  { title: "Catering Services", img: "https://image.wedmegood.com/resized/300X/uploads/banner_image/5/caterers.jpg" },
  { title: "Jewellery", img: "https://images.meesho.com/images/products/470990048/an0wq_1200.jpg?width=512" },
  { title: "Wedding Planners", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-HJ0FNV40q0KNWCAsiieP_OIqjqMTRuLemg&s" },
  { title: "Mehendi Artists", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYE0jFqz39Nm9Hf9YTPjbeukBJW2Whf86ZZA&s" },
  { title: "Decorators", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbUxEoZKFLpmLZKtf1I11KfKJMpNGAXki3FA&s" },
  { title: "Music & DJs", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR9zSsUXVhkynAz_kJC7sHcru0NYEibi0BMg&s" },
];

function PopularSearches() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

  // Responsive visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setVisibleCount(1); // Mobile: 1 card
      } else if (width < 768) {
        setVisibleCount(2); // Tablet: 2 cards
      } else if (width < 1024) {
        setVisibleCount(3); // Small desktop: 3 cards
      } else if (width < 1200) {
        setVisibleCount(4); // Medium desktop: 4 cards
      } else {
        setVisibleCount(5); // Large desktop: 5 cards
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < data.length - visibleCount) setIndex(index + 1);
  };

  return (
    <div className="popular-container">
      <h2>Popular Searches</h2>
      <div className="carousel-wrapper">
        <button 
          className="nav-btn left" 
          onClick={handlePrev} 
          disabled={index === 0}
          aria-label="Previous items"
        >
          &#10094;
        </button>

        <div className="carousel-track">
          <div
            className="carousel-inner"
            style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
          >
            {data.map((item, i) => (
              <div key={i} className="popular-card">
                <div className="img-wrapper">
                  <img src={item.img} alt={item.title} />
                  <div className="overlay"></div>
                </div>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          className="nav-btn right"
          onClick={handleNext}
          disabled={index >= data.length - visibleCount}
          aria-label="Next items"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default PopularSearches;
