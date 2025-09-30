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
  FaTh,
  FaSortAmountDown,
  FaSortAmountUp
} from 'react-icons/fa';
import './VendorListingPage.css';
import { vendorCategories, cities, priceRanges, ratings } from './vendorData';

const VendorListingPage = ({ onNavigate, initialFilters = {} }) => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('photographers');
  const [filters, setFilters] = useState({
    city: '',
    priceRange: '',
    rating: '',
    ...initialFilters
  });

  // Initialize vendors based on category and fetch vendor-added services
  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';
    const category = initialFilters.category || 'photographers';
    setCurrentCategory(category);
    const categoryData = vendorCategories[category];
    const baseVendors = categoryData ? categoryData.vendors : [];
    setVendors(baseVendors);
    setFilteredVendors(baseVendors);

    // Fetch vendor-added services for this category and merge
    fetch(`${API_BASE}/vendor-services?type=${encodeURIComponent(category)}`)
      .then(r => r.json())
      .then(d => {
        const extra = (d.services || []).map((s, idx) => ({
          _id: s._id,
          id: 10000 + idx,
          name: s.name,
          location: s.location || s.city || '',
          rating: s.rating ?? 4.5,
          reviews: s.reviews ?? 0,
          price: s.price || undefined,
          priceUnit: s.price ? 'per day' : undefined,
          services: s.services || undefined,
          isHandpicked: false,
          image: s.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
          city: s.city || '',
          isFavorite: false,
          phone: '',
          email: '',
          // Venue-specific optional fields (they'll simply be ignored in UI if undefined)
          vegPrice: s.vegPrice || undefined,
          nonVegPrice: s.nonVegPrice || undefined,
          capacity: s.capacity || undefined,
          rooms: s.rooms || undefined,
          features: s.features || [],
        }));
        const combined = [...baseVendors, ...extra];
        setVendors(combined);
        setFilteredVendors(combined);
      })
      .catch(() => {
        // keep base vendors on error
      });
  }, [initialFilters]);

  // Apply filters
  useEffect(() => {
    let filtered = [...vendors];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(vendor => 
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter(vendor => vendor.city === filters.city);
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(vendor => vendor.rating >= parseFloat(filters.rating));
    }

    // Price range filter
    if (filters.priceRange) {
      const priceRange = priceRanges.find(range => range.label === filters.priceRange);
      if (priceRange) {
        filtered = filtered.filter(vendor => {
          const price = parseInt(vendor.price?.replace(/[₹,]/g, '') || vendor.vegPrice?.replace(/[₹,]/g, '') || '0');
          return price >= priceRange.min && price <= priceRange.max;
        });
      }
    }

    setFilteredVendors(filtered);
  }, [vendors, searchQuery, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      priceRange: '',
      rating: ''
    });
    setSearchQuery('');
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
          const aPrice = parseInt(a.price?.replace(/[₹,]/g, '') || a.vegPrice?.replace(/[₹,]/g, '') || '0');
          const bPrice = parseInt(b.price?.replace(/[₹,]/g, '') || b.vegPrice?.replace(/[₹,]/g, '') || '0');
          return aPrice - bPrice;
        });
        break;
      case 'price-high':
        sorted.sort((a, b) => {
          const aPrice = parseInt(a.price?.replace(/[₹,]/g, '') || a.vegPrice?.replace(/[₹,]/g, '') || '0');
          const bPrice = parseInt(b.price?.replace(/[₹,]/g, '') || b.vegPrice?.replace(/[₹,]/g, '') || '0');
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

  const currentCategoryData = vendorCategories[currentCategory];

  return (
    <div className="vendor-listing-page">
      {/* Header Section */}
      <div className="listing-header">
        <div className="container">
          <div className="breadcrumb">
            <span>Home</span> / <span>Vendors</span> / <span>{currentCategoryData?.title || 'All'}</span>
          </div>
          <h1>{currentCategoryData?.title || 'Wedding Vendors'}</h1>
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
            <h4>Price Range</h4>
            <div className="filter-options">
              {priceRanges.map(range => (
                <label key={range.label}>
                  <input 
                    type="radio" 
                    name="priceRange" 
                    value={range.label}
                    checked={filters.priceRange === range.label}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Rating</h4>
            <div className="filter-options">
              {ratings.map(rating => (
                <label key={rating.value}>
                  <input 
                    type="radio" 
                    name="rating" 
                    value={rating.value}
                    checked={filters.rating === rating.value.toString()}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                  />
                  <span>{rating.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-actions">
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder={`Search ${currentCategoryData?.title?.toLowerCase() || 'vendors'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
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
                <div key={vendor.id} className="vendor-card" onClick={() => {
                  const base = new URL(window.location);
                  base.searchParams.set('page', 'vendor-detail');
                  base.searchParams.set('id', vendor._id || vendor.id);
                  base.searchParams.set('type', currentCategory);
                  window.open(base.toString(), '_blank');
                }} style={{ cursor: 'pointer' }}>
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
                      
                      {vendor.services && (
                        <div className="services">
                          <span className="service-tag">{vendor.services}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="pricing-info">
                      {vendor.price && (
                        <div className="price-item">
                          <span className="price-value">{vendor.price}</span>
                          <span className="price-unit">{vendor.priceUnit}</span>
                        </div>
                      )}
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
                    </div>
                    
                    {vendor.capacity && (
                      <div className="capacity-info">
                        <div className="capacity">
                          <FaUsers />
                          <span>{vendor.capacity}</span>
                        </div>
                        {vendor.rooms && (
                          <div className="rooms">
                            <span>{vendor.rooms} Rooms</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {vendor.features && (
                      <div className="features">
                        {vendor.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="feature-tag">{feature}</span>
                        ))}
                        {vendor.features.length > 2 && (
                          <span className="more-features">+{vendor.features.length - 2} more</span>
                        )}
                      </div>
                    )}
                    
                    <div className="vendor-actions">
                      <button className="contact-btn">
                        <FaPhone /> Contact
                      </button>
                      <button className="more-btn">+7 more</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-vendors-message">
                <h3>There are no such vendors</h3>
                <p>Try adjusting your filters or search criteria to find more vendors.</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          <div className="load-more-section">
            <button className="load-more-btn">Load More Vendors</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorListingPage;
