// src/App.js
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./navbar";
import PopularSearches from "./popularsearches";
import WeddingCategories from "./WeddingCategories";
import WeddingCategoriesPage from "./WeddingCategoriesPage";
import VendorListingPage from "./VendorListingPage";
import Footer from "./Footer";
import VendorListing from "./venue";
import SignupPage from "./SignupPage";
import PhotosPage from "./PhotosPage";
import InvitesPage from "./InvitesPage";
import InviteDetailPage from "./InviteDetailPage";
import VendorSignupPage from "./VendorSignupPage";
import EditProfilePage from "./EditProfilePage";
import VendorAddServicePage from "./VendorAddServicePage";
import VendorMyServicesPage from "./VendorMyServicesPage";
import MyServicesPage from "./MyServicesPage";
import VendorDetailPage from "./VendorDetailPage";
import VendorOrdersPage from "./VendorOrdersPage";

function App() { 
  const [currentPage, setCurrentPage] = useState('home');
  const [pageFilters, setPageFilters] = useState({});

  // Check URL parameters on component mount and handle browser navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const page = urlParams.get('page');
      if (page === 'wedding-categories') {
        setCurrentPage('wedding-categories');
      } else if (page === 'vendors') {
        setCurrentPage('vendors');
      } else if (page === 'venues') {
        setCurrentPage('venues');
      } else if (page === 'signup') {
        setCurrentPage('signup');
      } else if (page === 'photos') {
        setCurrentPage('photos');
      } else if (page === 'invites') {
        setCurrentPage('invites');
      } else if (page === 'invite-detail') {
        setCurrentPage('invite-detail');
      } else if (page === 'vendor-signup') {
        setCurrentPage('vendor-signup');
      } else if (page === 'profile') {
        setCurrentPage('profile');
      } else if (page === 'vendor-add-service') {
        setCurrentPage('vendor-add-service');
      } else if (page === 'vendor-my-services') {
        setCurrentPage('vendor-my-services');
      } else if (page === 'my-services') {
        setCurrentPage('my-services');
      } else if (page === 'vendor-orders') {
        setCurrentPage('vendor-orders');
      } else if (page === 'vendor-detail') {
        setCurrentPage('vendor-detail');
      } else {
        setCurrentPage('home');
      }
    };

    // Check initial URL
    handleUrlChange();

    // Listen for browser back/forward
    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const handleNavigate = (page, filters = {}) => {
    setCurrentPage(page);
    setPageFilters(filters);
    
    // Update URL without page reload
    const url = new URL(window.location);
    if (page === 'home') {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', page);
    }
    // add filters to query
    Object.entries(filters || {}).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, v);
    });
    window.history.pushState({}, '', url);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'vendors':
        return <VendorListingPage onNavigate={handleNavigate} initialFilters={pageFilters} />;
      case 'wedding-categories':
        return <WeddingCategoriesPage onNavigate={handleNavigate} />;
      case 'venues':
        return <VendorListing initialFilters={pageFilters} />;
      case 'signup':
        return <SignupPage />;
      case 'photos':
        return <PhotosPage initialFilters={pageFilters} />;
      case 'invites':
        return <InvitesPage onNavigate={handleNavigate} initialFilters={pageFilters} />;
      case 'invite-detail':
        return <InviteDetailPage initialFilters={pageFilters} />;
      case 'vendor-signup':
        return <VendorSignupPage />;
      case 'profile':
        return <EditProfilePage />;
      case 'vendor-add-service':
        return <VendorAddServicePage />;
      case 'vendor-my-services':
        return <MyServicesPage />;
      case 'my-services':
        return <MyServicesPage />;
      case 'vendor-orders':
        return <VendorOrdersPage />;
      case 'vendor-detail':
        return <VendorDetailPage />;
      default:
        return (
          <>
            {/* Hero Section */}
            <header className="hero">
              <div className="hero-content">
                <h1>Your Wedding, Your Way</h1>
                <p>Find the best wedding vendors with thousands of trusted reviews</p>
                <div className="search-box">
                  <select>
                    <option>Select vendor type</option>
                    <option>Photographers</option>
                    <option>Makeup</option>
                    <option>Venues</option>
                  </select>
                  <select>
                    <option>Select city</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                    <option>Hyderabad</option>
                  </select>
                  <button 
                    className="blue-btn"
                    onClick={() => setCurrentPage('vendors')}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </header>

            <PopularSearches />
            <WeddingCategories onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar onNavigate={handleNavigate} />
      
      {renderPage()}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
