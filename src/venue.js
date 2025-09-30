import React, { useState, useEffect } from 'react';
import { 
  FaMapMarkerAlt, 
  FaStar, 
  FaHeart, 
  FaFilter, 
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaCheck,
  FaList,
  FaTh
} from 'react-icons/fa';
import './venue.css';

const VendorListing = ({ initialFilters = {} }) => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [filters, setFilters] = useState({
    priceRange: '',
    rating: '',
    capacity: '',
    venueType: '',
    amenities: [],
    location: '',
    city: '',
    ...initialFilters // Apply initial filters from navigation
  });

  // Sample vendor data matching WedMeGood structure
  const sampleVendors = [
    {
      id: 1,
      name: "Opulence by Bhullar Resorts",
      location: "Zirakpur, Zirakpur",
      rating: 4.8,
      reviews: 19,
      vegPrice: "₹1,700",
      nonVegPrice: "₹1,900",
      capacity: "325-700 pax",
      rooms: 2,
      venueTypes: ["Banquet Halls", "Marriage Garden / Lawns"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      isHandpicked: true,
      city: "Chandigarh",
      isFavorite: false,
      phone: "+91 9876543210",
      email: "info@opulence.com"
    },
    {
      id: 2,
      name: "Taj Damdama Lake Resort & Spa",
      location: "Sohna Road, Delhi NCR",
      rating: 4.6,
      reviews: 13,
      vegPrice: "₹5,500",
      nonVegPrice: "₹5,500",
      capacity: "250-1000 pax",
      rooms: 143,
      venueTypes: ["4 Star & Above Wedding Hotels", "Banquet Halls"],
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      isHandpicked: true,
      city: "Delhi NCR",
      isFavorite: false,
      phone: "+91 9876543211",
      email: "info@tajdamdama.com"
    },
    {
      id: 3,
      name: "The Lalita Grand",
      location: "Mathura",
      rating: 4.5,
      reviews: 11,
      vegPrice: "₹1,200",
      nonVegPrice: null,
      capacity: "30-3500 pax",
      rooms: 70,
      venueTypes: ["4 Star & Above Wedding Hotels", "Banquet Halls"],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
      isHandpicked: true,
      city: "Mathura",
      isFavorite: false,
      phone: "+91 9876543212",
      email: "info@lalitagrand.com"
    },
    {
      id: 4,
      name: "The Pergola",
      location: "Yeswanthpur, Bangalore",
      rating: 4.9,
      reviews: 67,
      rentalCost: "₹1,10,000",
      capacity: "250-450 pax",
      rooms: 2,
      venueTypes: ["Banquet Halls", "Marriage Garden / Lawns"],
      image: "https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=400",
      isHandpicked: true,
      city: "Bangalore",
      isFavorite: false,
      phone: "+91 9876543213",
      email: "info@pergola.com"
    },
    {
      id: 5,
      name: "Devadiga Bhavan",
      location: "Navi Mumbai, Navi Mumbai",
      rating: 4.8,
      reviews: 2,
      vegPrice: "₹549",
      nonVegPrice: "₹649",
      capacity: "80-800 pax",
      rooms: "Indoor",
      venueTypes: ["Banquet Halls", "Convention / Function Halls"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      isHandpicked: true,
      city: "Mumbai",
      isFavorite: false,
      phone: "+91 9876543214",
      email: "info@devadiga.com"
    },
    {
      id: 6,
      name: "The Riverview Retreat",
      location: "Ramnagar, Jim Corbett",
      rating: 5.0,
      reviews: 4,
      vegPrice: "₹3,500",
      nonVegPrice: "₹5,500",
      capacity: "250-700 pax",
      rooms: 105,
      venueTypes: ["4 Star & Above Wedding Hotels", "Banquet Halls"],
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400",
      isHandpicked: true,
      city: "Jim Corbett",
      isFavorite: false,
      phone: "+91 9876543215",
      email: "info@riverview.com"
    },
    {
      id: 7,
      name: "Mumbai Grand Hotel",
      location: "Andheri, Mumbai",
      rating: 4.7,
      reviews: 45,
      vegPrice: "₹2,500",
      nonVegPrice: "₹3,000",
      capacity: "200-800 pax",
      rooms: 85,
      venueTypes: ["Banquet Halls", "4 Star & Above Wedding Hotels"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      isHandpicked: true,
      city: "Mumbai",
      isFavorite: false,
      phone: "+91 9876543216",
      email: "info@mumbagrand.com"
    },
    {
      id: 8,
      name: "Bangalore Palace Gardens",
      location: "Whitefield, Bangalore",
      rating: 4.9,
      reviews: 32,
      vegPrice: "₹1,800",
      nonVegPrice: "₹2,200",
      capacity: "150-500 pax",
      rooms: 25,
      venueTypes: ["Marriage Garden / Lawns", "Wedding Resorts"],
      image: "https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=400",
      isHandpicked: true,
      city: "Bangalore",
      isFavorite: false,
      phone: "+91 9876543217",
      email: "info@bangalorepalace.com"
    }
  ];

  useEffect(() => {
    setVendors(sampleVendors);
    setFilteredVendors(sampleVendors);
    // fetch vendor-added services of type 'venues'
    const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';
    fetch(API_BASE + '/vendor-services?type=venues')
      .then(r => r.json())
      .then(d => {
        const mapped = (d.services || []).map((s, idx) => ({
          id: 10000 + idx,
          name: s.name,
          location: s.location || s.city,
          rating: s.rating || 4.5,
          reviews: s.reviews || 0,
          vegPrice: s.vegPrice || s.price || null,
          nonVegPrice: s.nonVegPrice || null,
          capacity: s.capacity || '',
          rooms: 0,
          venueTypes: s.venueTypes || [],
          image: s.image || 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400',
          isHandpicked: false,
          city: s.city || '',
          isFavorite: false,
          phone: '',
          email: ''
        }));
        const combined = [...sampleVendors, ...mapped];
        setVendors(combined);
        setFilteredVendors(combined);
        if (Object.keys(initialFilters).length > 0) {
          applyInitialFiltersWith(combined);
        }
      })
      .catch(() => {});
  }, [initialFilters]);

  const applyInitialFiltersWith = (source) => {
    let filtered = [...source];

    if (initialFilters.city) {
      filtered = filtered.filter(vendor => vendor.city === initialFilters.city);
    }

    if (initialFilters.venueType) {
      filtered = filtered.filter(vendor => 
        vendor.venueTypes.includes(initialFilters.venueType)
      );
    }

    setFilteredVendors(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const applyFilters = () => {
    let filtered = [...vendors];

    if (filters.city) {
      filtered = filtered.filter(vendor => vendor.city === filters.city);
    }

    if (filters.venueType) {
      filtered = filtered.filter(vendor => 
        vendor.venueTypes.includes(filters.venueType)
      );
    }

    if (filters.rating) {
      filtered = filtered.filter(vendor => vendor.rating >= parseFloat(filters.rating));
    }

    setFilteredVendors(filtered);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      priceRange: '',
      rating: '',
      capacity: '',
      venueType: '',
      amenities: [],
      location: '',
      city: ''
    });
    setFilteredVendors(vendors);
  };

  const toggleFavorite = (vendorId) => {
    setVendors(prev => prev.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, isFavorite: !vendor.isFavorite }
        : vendor
    ));
    setFilteredVendors(prev => prev.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, isFavorite: !vendor.isFavorite }
        : vendor
    ));
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    let sorted = [...filteredVendors];
    
    switch (sortType) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        sorted.sort((a, b) => {
          const aPrice = parseInt(a.vegPrice?.replace(/[₹,]/g, '') || '0');
          const bPrice = parseInt(b.vegPrice?.replace(/[₹,]/g, '') || '0');
          return aPrice - bPrice;
        });
        break;
      case 'price-high':
        sorted.sort((a, b) => {
          const aPrice = parseInt(a.vegPrice?.replace(/[₹,]/g, '') || '0');
          const bPrice = parseInt(b.vegPrice?.replace(/[₹,]/g, '') || '0');
          return bPrice - aPrice;
        });
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }
    
    setFilteredVendors(sorted);
  };

  const cities = ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Goa", "Jaipur", "Pune", "Kolkata", "Lucknow"];
  const venueTypes = ["Banquet Halls", "Marriage Garden / Lawns", "Wedding Resorts", "Small Function / Party Halls", "Destination Wedding Venues", "Kalyana Mandapams", "4 Star & Above Wedding Hotels"];

  return (
    <div className="vendor-listing-page">
      {/* Header Section */}
      <div className="listing-header">
        <div className="container">
          <div className="breadcrumb">
            <span>Home</span> / <span>Vendors</span> / <span>All</span> / <span>Wedding Venues</span>
          </div>
          <h1>Wedding Venues</h1>
          <p className="results-count">Showing {filteredVendors.length} results as per your search criteria</p>
        </div>
      </div>

      <div className="container listing-container">
        {/* Filters Sidebar */}
        <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="filter-section">
            <h4>City</h4>
            <div className="filter-options">
              {cities.map(city => (
                <label key={city}>
                  <input 
                    type="radio" 
                    name="city" 
                    value={city}
                    checked={filters.city === city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                  />
                  <span>{city}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Venue Type</h4>
            <div className="filter-options">
              {venueTypes.map(type => (
                <label key={type}>
                  <input 
                    type="radio" 
                    name="venueType" 
                    value={type}
                    checked={filters.venueType === type}
                    onChange={(e) => handleFilterChange('venueType', e.target.value)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Rating</h4>
            <div className="filter-options">
              <label>
                <input 
                  type="radio" 
                  name="rating" 
                  value="4.5"
                  checked={filters.rating === '4.5'}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                />
                <span>4.5+ Stars</span>
              </label>
              <label>
                <input 
                  type="radio" 
                  name="rating" 
                  value="4.0"
                  checked={filters.rating === '4.0'}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                />
                <span>4.0+ Stars</span>
              </label>
            </div>
          </div>

          <div className="filter-actions">
            <button className="apply-filters-btn" onClick={applyFilters}>
              Apply Filters
            </button>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Sort and Filter Bar */}
          <div className="sort-filter-bar">
            <button 
              className="mobile-filter-btn"
              onClick={() => setShowFilters(true)}
            >
              <FaFilter /> Filters
            </button>
            
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FaList /> List
              </button>
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FaTh /> Grid
              </button>
            </div>
            
            <div className="sort-options">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>



          {/* Vendor Cards */}
          <div className={`vendor-cards ${viewMode}`}>
            {filteredVendors.length > 0 ? (
              filteredVendors.map(vendor => (
                <div
                  key={vendor.id}
                  className="vendor-card"
                  onClick={() => {
                    const base = new URL(window.location);
                    base.searchParams.set('page', 'vendor-detail');
                    // prefer db _id if available (uploaded vendor service), otherwise fallback to local id
                    if (vendor._id) {
                      base.searchParams.set('id', vendor._id);
                    } else {
                      base.searchParams.set('id', vendor.id);
                    }
                    base.searchParams.set('type', 'venues');
                    window.open(base.toString(), '_blank');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="vendor-image">
                    <img src={vendor.image} alt={vendor.name} />
                    <button 
                      className={`favorite-btn ${vendor.isFavorite ? 'active' : ''}`}
                      onClick={() => toggleFavorite(vendor.id)}
                    >
                      <FaHeart />
                    </button>
                    {vendor.isHandpicked && (
                      <div className="handpicked-badge">
                        handpicked
                      </div>
                    )}
                  </div>
                  
                  <div className="vendor-info">
                    <div className="vendor-header">
                      <h3>{vendor.name}</h3>
                      <div className="rating">
                        <FaStar className="star" />
                        <span>{vendor.rating}</span>
                        <span className="reviews">({vendor.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="vendor-details">
                      <div className="location">
                        <FaMapMarkerAlt />
                        <span>{vendor.location}</span>
                      </div>
                      
                      <div className="venue-types">
                        {vendor.venueTypes.map(type => (
                          <span key={type} className="venue-type-tag">{type}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pricing-info">
                      {vendor.vegPrice && (
                        <div className="price-item">
                          <span className="price-label">Veg</span>
                          <span className="price-value">{vendor.vegPrice}</span>
                          <span className="price-unit">per plate</span>
                        </div>
                      )}
                      {vendor.nonVegPrice && (
                        <div className="price-item">
                          <span className="price-label">Non veg</span>
                          <span className="price-value">{vendor.nonVegPrice}</span>
                          <span className="price-unit">per plate</span>
                        </div>
                      )}
                      {vendor.rentalCost && (
                        <div className="price-item">
                          <span className="price-label">Rental cost</span>
                          <span className="price-value">{vendor.rentalCost}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="capacity-info">
                      <div className="capacity">
                        <FaUsers />
                        <span>{vendor.capacity}</span>
                      </div>
                      <div className="rooms">
                        <span>{vendor.rooms} Rooms</span>
                      </div>
                    </div>
                    
                    <div className="vendor-actions">
                      <button className="more-btn">+7 more</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-venues-message">
                <h3>There are no such venues</h3>
                <p>Try adjusting your filters or search criteria to find more venues.</p>
              </div>
            )}
          </div>



         
        </div>
      </div>
    </div>
  );
};

export default VendorListing;