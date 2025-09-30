import React from "react";
import "./navbar.css"
import logo from "./logo.png"
import { useEffect,useState,useRef } from "react";

function Navbar({ onNavigate }) {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVendorLoginOpen, setIsVendorLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');
  const [showVendorPassword, setShowVendorPassword] = useState(false);
  const navRef = useRef(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';
  const [authName, setAuthName] = useState(localStorage.getItem('authName') || '');
  const [isVendor, setIsVendor] = useState(localStorage.getItem('isVendor') === 'true');

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const openPageInNewTab = (page, filters = {}) => {
    if (onNavigate) {
      onNavigate(page, filters);
    }
    setIsMenuOpen(false);
  };

  const handleVendorsClick = () => {
    openPageInNewTab('wedding-categories');
    setIsMenuOpen(false);
  };

  const openSignupInNewTab = () => {
    const url = new URL(window.location);
    url.searchParams.set('page', 'signup');
    window.open(url.toString(), '_blank');
  };

  const openVendorSignupInNewTab = () => {
    const url = new URL(window.location);
    url.searchParams.set('page', 'vendor-signup');
    window.open(url.toString(), '_blank');
  };

  const handleVendorCategoryClick = (category) => {
    openPageInNewTab('vendors', { category });
    setIsMenuOpen(false);
  };

  const handleVenueClick = (venueType) => {
    openPageInNewTab('venues', { venueType });
    setIsMenuOpen(false);
  };

  const handleCityClick = (city) => {
    openPageInNewTab('venues', { city });
    setIsMenuOpen(false);
  };

  return (
    <>
    <nav className="navbar">
       <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </div>
      {/* Left: Logo & City Select */}
      <div className="navbar-left">
        
       <div className="logo">
  <img src={logo} alt="Catalyst Wedding" />
  <span>Catalyst Wedding</span>
</div>     
      </div>

      {/* Center: Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`} ref={navRef}>
        {/* Home */}
        <li className="dropdown">
          <span onClick={() => openPageInNewTab('home')} style={{ cursor: 'pointer' }}>Home</span>
        </li>

        {/* Venues */}
        <li className="dropdown">
          <span onClick={() => openPageInNewTab('vendors')} style={{ cursor: 'pointer' }}>Venues</span>
          <div className="mega-menu">
            <div>
              <h4>By Type</h4>
              <p onClick={() => handleVenueClick('Banquet Halls')} style={{ cursor: 'pointer' }}>Banquet Halls</p>
              <p onClick={() => handleVenueClick('Marriage Garden / Lawns')} style={{ cursor: 'pointer' }}>Marriage Garden / Lawns</p>
              <p onClick={() => handleVenueClick('Wedding Resorts')} style={{ cursor: 'pointer' }}>Wedding Resorts</p>
              <p onClick={() => handleVenueClick('Small Function / Party Halls')} style={{ cursor: 'pointer' }}>Small Function / Party Halls</p>
              <p onClick={() => handleVenueClick('Destination Wedding Venues')} style={{ cursor: 'pointer' }}>Destination Wedding Venues</p>
              <p onClick={() => handleVenueClick('Kalyana Mandapams')} style={{ cursor: 'pointer' }}>Kalyana Mandapams</p>
              <p onClick={() => handleVenueClick('4 Star & Above Wedding Hotels')} style={{ cursor: 'pointer' }}>4 Star & Above Wedding Hotels</p>
              <p className="view-all" onClick={() => openPageInNewTab('vendors')} style={{ cursor: 'pointer' }}>View all Venues</p>
            </div>
            <div>
              <h4>By City</h4>
              <p onClick={() => handleCityClick('Delhi NCR')} style={{ cursor: 'pointer' }}>Delhi NCR</p>
              <p onClick={() => handleCityClick('Mumbai')} style={{ cursor: 'pointer' }}>Mumbai</p>
              <p onClick={() => handleCityClick('Bangalore')} style={{ cursor: 'pointer' }}>Bangalore</p>
              <p onClick={() => handleCityClick('Pune')} style={{ cursor: 'pointer' }}>Pune</p>
              <p onClick={() => handleCityClick('Kolkata')} style={{ cursor: 'pointer' }}>Kolkata</p>
              <p onClick={() => handleCityClick('Jaipur')} style={{ cursor: 'pointer' }}>Jaipur</p>
              <p onClick={() => handleCityClick('Lucknow')} style={{ cursor: 'pointer' }}>Lucknow</p>
              <p onClick={() => handleCityClick('Hyderabad')} style={{ cursor: 'pointer' }}>Hyderabad</p>
              <p className="view-all" onClick={() => openPageInNewTab('vendors')} style={{ cursor: 'pointer' }}>More</p>
            </div>
          </div>
        </li>

        {/* Vendors */}
        <li className="dropdown">
          <span onClick={handleVendorsClick} style={{ cursor: 'pointer' }}>
            Vendors
          </span>
          <div className="mega-menu multi-col">
            <div>
              <h4>Photographers</h4>
              <p onClick={() => handleVendorCategoryClick('photographers')} style={{ cursor: 'pointer' }}>Photographers</p>
              <h4>Makeup</h4>
              <p onClick={() => handleVendorCategoryClick('makeup')} style={{ cursor: 'pointer' }}>Bridal Makeup</p>
              <p onClick={() => handleVendorCategoryClick('familyMakeup')} style={{ cursor: 'pointer' }}>Family Makeup</p>
              <h4>Planning & Decor</h4>
              <p onClick={() => handleVendorCategoryClick('planners')} style={{ cursor: 'pointer' }}>Wedding Planners</p>
              <p onClick={() => handleVendorCategoryClick('decorators')} style={{ cursor: 'pointer' }}>Decorators</p>
              <h4>Virtual Planning</h4>
              <p onClick={() => handleVendorCategoryClick('planners')} style={{ cursor: 'pointer' }}>Virtual planning</p>
              <h4>Mehndi</h4>
              <p onClick={() => handleVendorCategoryClick('mehndi')} style={{ cursor: 'pointer' }}>Mehendi Artist</p>
            </div>
            <div>
              <h4>Music & Dance</h4>
              <p onClick={() => handleVendorCategoryClick('entertainment')} style={{ cursor: 'pointer' }}>DJs</p>
              <p onClick={() => handleVendorCategoryClick('entertainment')} style={{ cursor: 'pointer' }}>Sangeet Choreographer</p>
              <p onClick={() => handleVendorCategoryClick('entertainment')} style={{ cursor: 'pointer' }}>Wedding Entertainment</p>
              <h4>Invites & Gifts</h4>
              <p onClick={() => handleVendorCategoryClick('invitations')} style={{ cursor: 'pointer' }}>Invitations</p>
              <p onClick={() => handleVendorCategoryClick('invitations')} style={{ cursor: 'pointer' }}>Favors</p>
              <p onClick={() => handleVendorCategoryClick('invitations')} style={{ cursor: 'pointer' }}>Trousseau Packers</p>
              <p onClick={() => handleVendorCategoryClick('invitations')} style={{ cursor: 'pointer' }}>Invitation Gifts</p>
              <p onClick={() => handleVendorCategoryClick('invitations')} style={{ cursor: 'pointer' }}>Mehndi Favors</p>
              <p className="view-all" onClick={() => handleVendorCategoryClick('invitations')} style={{ cursor: 'pointer' }}>View All Invites & Gifts</p>
              <h4>Food</h4>
              <p onClick={() => handleVendorCategoryClick('catering')} style={{ cursor: 'pointer' }}>Catering Services</p>
              <p onClick={() => handleVendorCategoryClick('catering')} style={{ cursor: 'pointer' }}>Cake</p>
              <p onClick={() => handleVendorCategoryClick('catering')} style={{ cursor: 'pointer' }}>Chaat & Food Stalls</p>
              <p onClick={() => handleVendorCategoryClick('catering')} style={{ cursor: 'pointer' }}>Bartenders</p>
              <p className="view-all" onClick={() => handleVendorCategoryClick('catering')} style={{ cursor: 'pointer' }}>View All Food</p>
            </div>
            <div>
              <h4>Pre Wedding Shoot</h4>
              <p onClick={() => handleVendorCategoryClick('photographers')} style={{ cursor: 'pointer' }}>Pre Wedding Shoot Locations</p>
              <p onClick={() => handleVendorCategoryClick('photographers')} style={{ cursor: 'pointer' }}>Pre Wedding Photographers</p>
              <h4>Bridal Wear</h4>
              <p onClick={() => handleVendorCategoryClick('bridalwear')} style={{ cursor: 'pointer' }}>Bridal Lehengas</p>
              <p onClick={() => handleVendorCategoryClick('bridalwear')} style={{ cursor: 'pointer' }}>Kanjeevaram / Silk Sarees</p>
              <p onClick={() => handleVendorCategoryClick('bridalwear')} style={{ cursor: 'pointer' }}>Cocktail Gowns</p>
              <p onClick={() => handleVendorCategoryClick('bridalwear')} style={{ cursor: 'pointer' }}>Trousseau Sarees</p>
              <p onClick={() => handleVendorCategoryClick('bridalwear')} style={{ cursor: 'pointer' }}>Bridal Lehenga on Rent</p>
              <p className="view-all" onClick={() => handleVendorCategoryClick('bridalwear')} style={{ cursor: 'pointer' }}>View All Bridal Wear</p>
              <h4>Groom Wear</h4>
              <p onClick={() => handleVendorCategoryClick('groomwear')} style={{ cursor: 'pointer' }}>Sherwani</p>
              <p onClick={() => handleVendorCategoryClick('groomwear')} style={{ cursor: 'pointer' }}>Wedding Suits / Tuxes</p>
              <p onClick={() => handleVendorCategoryClick('groomwear')} style={{ cursor: 'pointer' }}>Sherwani On Rent</p>
              <p className="view-all" onClick={() => handleVendorCategoryClick('groomwear')} style={{ cursor: 'pointer' }}>View All Groom Wear</p>
            </div>
            <div>
              <h4>Jewellery & Accessories</h4>
              <p onClick={() => handleVendorCategoryClick('jewellery')} style={{ cursor: 'pointer' }}>Jewellery</p>
              <p onClick={() => handleVendorCategoryClick('jewellery')} style={{ cursor: 'pointer' }}>Flower Jewellery</p>
              <p onClick={() => handleVendorCategoryClick('jewellery')} style={{ cursor: 'pointer' }}>Bridal Jewellery on Rent</p>
              <p onClick={() => handleVendorCategoryClick('jewellery')} style={{ cursor: 'pointer' }}>Accessories</p>
              <p className="view-all" onClick={() => handleVendorCategoryClick('jewellery')} style={{ cursor: 'pointer' }}>View All Jewellery & Accessories</p>
              <h4>Pandits</h4>
              <p onClick={() => handleVendorCategoryClick('pandits')} style={{ cursor: 'pointer' }}>Wedding Pandits</p>
              <h4>Bridal Grooming</h4>
              <p onClick={() => handleVendorCategoryClick('grooming')} style={{ cursor: 'pointer' }}>Beauty and Wellness</p>
            </div>
          </div>
        </li>

        {/* Photos */}
        <li className="dropdown">
          <span onClick={() => openPageInNewTab('photos')} style={{ cursor: 'pointer' }}>Photos</span>
          <div className="mega-menu multi-col">
            <div>
              <h4>Outfit</h4>
              <p onClick={() => openPageInNewTab('photos', { section: 'outfitBridalLehenga' })}>Bridal Lehenga</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'outfitWeddingSarees' })}>Wedding Sarees</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'outfitEngagement' })}>Engagement</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'outfitMehndi' })}>Mehndi</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'outfitBlouseDesigns' })}>Blouse Designs</p>
              <p className="view-all">More</p>
            </div>
            <div>
              <h4>Jewellery & Accessories</h4>
              <p onClick={() => openPageInNewTab('photos', { section: 'jewelBridalJewellery' })}>Bridal Jewellery</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'jewelEngagementRings' })}>Engagement Rings</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'jewelFloral' })}>Floral Jewellery</p>
              <p className="view-all">More</p>
              <h4>Mehndi</h4>
              <p onClick={() => openPageInNewTab('photos', { section: 'mehndiArabic' })}>Arabic</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'mehndiDesigns' })}>Mehndi Designs</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'mehndiSimple' })}>Simple</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'mehndiUnique' })}>Unique</p>
              <p className="view-all">More</p>
            </div>
            <div>
              <h4>Decor & Ideas</h4>
              <p onClick={() => openPageInNewTab('photos', { section: 'decorWedding' })}>Wedding Decor</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'decorBridalEntry' })}>Bridal Entry</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'decorGroomEntry' })}>Groom Entry</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'decorWeddingGames' })}>Wedding Games</p>
              <p className="view-all">More</p>
              <h4>Wedding Card Designs</h4>
              <p onClick={() => openPageInNewTab('photos', { section: 'cardsDesigns' })}>Designs</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'cardsGifts' })}>Wedding Gifts</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'cardsInvitations' })}>Wedding Invitations</p>
              <p className="view-all">More</p>
            </div>
            <div>
              <h4>Wedding Photography</h4>
              <p onClick={() => openPageInNewTab('photos', { section: 'photoPreWedding' })}>Pre Wedding Shoot</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'photoWedding' })}>Wedding</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'photoPoses' })}>Wedding Photoshoot & Poses</p>
              <p className="view-all">More</p>
              <h4>Groom Wear</h4>
              <p onClick={() => openPageInNewTab('photos', { section: 'groomSherwani' })}>Sherwani for Groom</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'groomSuits' })}>Wedding Suits for Groom</p>
              <p className="view-all">More</p>
              <h4>Bridal Makeup & Hair</h4>
              <p onClick={() => openPageInNewTab('photos', { section: 'makeupBridal' })}>Bridal Makeup</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'makeupHairstyles' })}>Bridal Hairstyles</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'makeupEngagement' })}>Engagement</p>
              <p onClick={() => openPageInNewTab('photos', { section: 'makeupMehndi' })}>Mehndi</p>
              <p className="view-all">More</p>
            </div>
          </div>
        </li>

        {/* Real Weddings */}
        <li className="dropdown">
          Real Weddings
          <div className="mega-menu multi-col">
            <div>
              <h4>By City</h4>
              <p>Mumbai</p>
              <p>Bangalore</p>
              <p>Pune</p>
              <p>Kolkata</p>
              <p>Jaipur</p>
              <p>Others</p>
            </div>
            <div>
              <h4>By Culture</h4>
              <p>Maharashtrian</p>
              <p>Punjabi / Sikh</p>
              <p>Bengali</p>
              <p>Gujarati</p>
              <p>Marwari</p>
              <p>Telugu</p>
              <p>Others</p>
            </div>
            <div>
              <h4>By Theme</h4>
              <p>Destination</p>
              <p>Grand & Luxurious</p>
              <p>Pocket Friendly Stunners</p>
              <p>Intimate & Minimalist</p>
              <p>Modern & Stylish</p>
              <p>International</p>
              <p>Others</p>
            </div>
          </div>
        </li>

        {/* Blog */}
        <li className="dropdown">
          Blog
          <div className="mega-menu multi-col">
            <div>
              <h4>Browse by Category</h4>
              <p>Bridal Makeup</p>
              <p>Honeymoon Travel</p>
              <p>Wedding Songs and Videos</p>
              <p>Bridal Hairstyles</p>
              <p>Wedding Decor Ideas</p>
              <p>Bridal Style Advice</p>
              <p>Wedding Gifts and Favors</p>
              <p>Budget Weddings</p>
              <p className="view-all">More</p>
            </div>
            <div>
              <h4>Popular Sections</h4>
              <p>South Indian Wedding</p>
              <p>Real Brides Reveal</p>
              <p>Bridal Buys</p>
              <p>Real Wedding</p>
              <p>Mehendi Ideas</p>
              <p>Indian Wedding Ideas</p>
            </div>
            <div>
              <h4>Most Searched Blogs</h4>
              <p>Wedding Songs</p>
              <p>Best Bridal Entry Songs</p>
              <p>Chandni Chowk Lehengas</p>
              <p>Best Bridal Hairstyles</p>
              <p>Bridal Mehendi Designs</p>
              <p>Best Groom Entry Songs</p>
              <p>Wittiest Wedding Hashtags</p>
              <p>2025 Marriage Dates</p>
              <p>Latest Sabyasachi Lehengas</p>
              <p>Bridal Blouse Designs</p>
            </div>
          </div>
        </li>

        {/* E-Invites */}
        <li className="dropdown">
          <span onClick={() => openPageInNewTab('invites')} style={{ cursor: 'pointer' }}>E-Invites</span>
          <div className="mega-menu">
            <div>
              <h4>Wedding Invitation Maker</h4>
              <p onClick={() => openPageInNewTab('invites', { section: 'cards' })} style={{ cursor: 'pointer' }}>Wedding Card Designs</p>
              <p onClick={() => openPageInNewTab('invites', { section: 'videos' })} style={{ cursor: 'pointer' }}>Invitation Video Templates</p>
              <p onClick={() => openPageInNewTab('invites', { section: 'saveTheDate' })} style={{ cursor: 'pointer' }}>Save the Date Templates</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Right: Login */}
      <div className="navbar-right">
        {authName ? (
          <div className="user-menu" ref={userMenuRef}>
            <button className="user-menu-button" onClick={() => setIsUserMenuOpen(v => !v)}>Hello, {authName}</button>
            {isUserMenuOpen && (
              <div className="user-menu-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="user-menu-item" onClick={() => { setIsUserMenuOpen(false); onNavigate && onNavigate('profile'); }}>Edit Profile</div>
                {isVendor && (
                  <>
                    <div className="user-menu-item" onClick={() => { setIsUserMenuOpen(false); onNavigate && onNavigate('vendor-add-service'); }}>Add Service</div>
                    <div className="user-menu-item" onClick={() => { setIsUserMenuOpen(false); onNavigate && onNavigate('vendor-my-services'); }}>My Services</div>
                    <div className="user-menu-item" onClick={() => { setIsUserMenuOpen(false); onNavigate && onNavigate('vendor-orders'); }}>Orders</div>
                  </>
                )}
                <div className="user-menu-item" onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('authName');
                  localStorage.removeItem('isVendor');
                  setAuthName('');
                  setIsVendor(false);
                  setIsUserMenuOpen(false);
                }}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => setIsLoginOpen(true)}>Log In</button>
        )}
      </div>
    </nav>
    {isLoginOpen && (
      <div className="login-modal-overlay" onClick={() => setIsLoginOpen(false)}>
        <div className="login-modal" onClick={(e) => e.stopPropagation()}>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Log in to continue</p>
          <div className="login-form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <label>Password</label>
            <div className="password-input">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter your password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button className="show-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button className="primary-login-btn" onClick={async () => {
            try {
              const res = await fetch(API_BASE + '/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.message || 'Login failed');
              localStorage.setItem('token', data.token);
              localStorage.setItem('isVendor', 'false');
              if (data.user?.name) localStorage.setItem('authName', data.user.name);
              setAuthName(data.user?.name || loginEmail);
              setIsVendor(false);
              alert('Logged in successfully');
              setIsLoginOpen(false);
            } catch (err) {
              alert(err.message);
            }
          }}>Log In</button>
          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <button className="link-btn" onClick={() => { setIsLoginOpen(false); setIsVendorLoginOpen(true); }}>Vendor Login</button>
          </div>
          <div className="login-footer">
            <span>Don't have an account?</span>
            <button className="link-btn" onClick={openSignupInNewTab}>Sign up</button>
          </div>
        </div>
      </div>
    )}
    {isVendorLoginOpen && (
      <div className="login-modal-overlay" onClick={() => setIsVendorLoginOpen(false)}>
        <div className="login-modal" onClick={(e) => e.stopPropagation()}>
          <h2>Vendor Login</h2>
          <p className="login-subtitle">Log in to manage your vendor profile</p>
          <div className="login-form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="you@business.com" 
              value={vendorEmail}
              onChange={(e) => setVendorEmail(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <label>Password</label>
            <div className="password-input">
              <input 
                type={showVendorPassword ? 'text' : 'password'} 
                placeholder="Enter your password" 
                value={vendorPassword}
                onChange={(e) => setVendorPassword(e.target.value)}
              />
              <button className="show-password" onClick={() => setShowVendorPassword(!showVendorPassword)}>
                {showVendorPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button className="primary-login-btn" onClick={async () => {
            try {
              const res = await fetch(API_BASE + '/vendors/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: vendorEmail, password: vendorPassword })
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.message || 'Login failed');
              localStorage.setItem('token', data.token);
              localStorage.setItem('isVendor', 'true');
              if (data.vendor?.businessName) localStorage.setItem('authName', data.vendor.businessName);
              setAuthName(data.vendor?.businessName || vendorEmail);
              setIsVendor(true);
              alert('Vendor logged in successfully');
              setIsVendorLoginOpen(false);
            } catch (err) {
              alert(err.message);
            }
          }}>Log In</button>
          <div className="login-footer">
            <span>I don't have an account</span>
            <button className="link-btn" onClick={openVendorSignupInNewTab}>Register as Vendor</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default Navbar;
