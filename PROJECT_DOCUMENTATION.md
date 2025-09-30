# Catalyst Wedding - Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [User Types & Authentication](#user-types--authentication)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Installation & Setup](#installation--setup)
9. [Development Guidelines](#development-guidelines)
10. [Deployment](#deployment)

## 🎯 Project Overview

**Catalyst Wedding** is a comprehensive wedding planning platform that connects couples with wedding vendors and provides tools for planning their special day. The platform serves both regular users (couples) and vendors, offering different functionalities based on user type.

### Key Objectives
- Connect couples with verified wedding vendors
- Provide vendor management tools for service providers
- Offer wedding planning resources (photos, invitations, venues)
- Streamline the wedding planning process

## 🛠 Technology Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **React Router** - Client-side routing
- **CSS3** - Custom styling with responsive design
- **Framer Motion 12.23.12** - Animation library
- **React Icons 5.5.0** - Icon components

### Backend
- **Node.js** - Runtime environment
- **MongoDB** - NoSQL database

- **bcryptjs 2.4.3** - Password hashing

### Development Tools
- **Create React App** - React development environment
- **Nodemon 3.1.4** - Development server auto-restart
- **ESLint** - Code linting
- **Web Vitals 2.1.4** - Performance monitoring

## 📁 Project Structure

```
wedding/
├── my-app/                          # Frontend React Application
│   ├── public/                     # Static assets
│   ├── src/                        # Source code
│   │   ├── components/            # React components
│   │   │   ├── App.js             # Main application component
│   │   │   ├── navbar.js          # Navigation component
│   │   │   ├── Footer.js          # Footer component
│   │   │   └── ...
│   │   ├── pages/                 # Page components
│   │   │   ├── InvitesPage.js     # E-invites page
│   │   │   ├── PhotosPage.js      # Wedding photos gallery
│   │   │   ├── VendorListingPage.js # Vendor listings
│   │   │   └── ...
│   │   ├── data/                  # Static data files
│   │   │   ├── invitesData.js     # Invitation templates
│   │   │   ├── vendorData.js      # Vendor information
│   │   │   └── photosData.js      # Photo galleries
│   │   └── styles/                # CSS files
│   └── package.json               # Frontend dependencies
├── server/                         # Backend Node.js Application
│   ├── src/
│   │   ├── models/                # Database models
│   │   │   ├── User.js           # User schema
│   │   │   ├── Vendor.js         # Vendor schema
│   │   │   ├── VendorService.js  # Service schema
│   │   │   └── VendorOrder.js    # Order schema
│   │   ├── routes/               # API routes
│   │   │   ├── auth.js           # Authentication routes
│   │   │   ├── profile.js       # User profile routes
│   │   │   └── vendorServices.js # Vendor service routes
│   │   ├── middleware/           # Custom middleware
│   │   │   └── auth.js           # Authentication middleware
│   │   └── index.js              # Server entry point
│   └── package.json              # Backend dependencies
```

## ✨ Features

### For Regular Users (Couples)
1. **Vendor Discovery**
   - Browse vendors by category (Photographers, Makeup, Venues, etc.)
   - Filter by location and price range
   - View vendor profiles and portfolios

2. **Wedding Planning Tools**
   - Photo galleries for inspiration
   - E-invitation templates and customization
   - Venue search and comparison
   - Popular wedding searches

3. **User Account Management**
   - User registration and login
   - Profile editing
   - Order tracking

### For Vendors
1. **Vendor Dashboard**
   - Add new services
   - Manage existing services
   - View and process orders
   - Update business information

2. **Service Management**
   - Create detailed service listings
   - Upload portfolio images
   - Set pricing and availability
   - Manage service categories

### General Features
1. **Responsive Design**
   - Mobile-first approach
   - Cross-device compatibility
   - Modern UI/UX

2. **Navigation System**
   - Mega menu with categorized options
   - Breadcrumb navigation
   - Search functionality

3. **Content Management**
   - Wedding photo galleries
   - Invitation template library
   - Vendor directory
   - Blog and resources

## 👥 User Types & Authentication

### User Roles

#### 1. Regular Users (Couples)
- **Registration**: Standard user signup
- **Features**: Browse vendors, view photos, create invitations
- **Menu Items**: Edit Profile, Logout

#### 2. Vendors (Service Providers)
- **Registration**: Vendor-specific signup with business details
- **Features**: Manage services, view orders, add new services
- **Menu Items**: Edit Profile, Add Service, My Services, Orders, Logout

### Authentication Flow
1. **Login System**: Separate login for users and vendors
2. **JWT Tokens**: Secure authentication with JSON Web Tokens
3. **Role-based Access**: Different menu items based on user type
4. **Session Management**: Persistent login with localStorage

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `POST /vendors/register` - Vendor registration
- `POST /vendors/login` - Vendor login

### Profile Routes (`/api/profile`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

### Vendor Services Routes (`/api/vendorServices`)
- `GET /services` - Get all services
- `POST /services` - Create new service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service
- `GET /services/vendor/:vendorId` - Get vendor's services

## 🗄 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  mobile: String (required),
  passwordHash: String (required),
  role: String (enum: ["user"], default: "user"),
  timestamps: true
}
```

### Vendor Model
```javascript
{
  businessName: String (required),
  contactName: String (required),
  email: String (required, unique),
  phone: String (required),
  category: String (required),
  city: String (required),
  passwordHash: String (required),
  role: String (enum: ["vendor"], default: "vendor"),
  timestamps: true
}
```

### VendorService Model
```javascript
{
  vendorId: ObjectId (ref: "Vendor", required),
  type: String (required),
  subcategory: String,
  name: String (required),
  city: String (required),
  location: String,
  price: String,
  vegPrice: String,
  nonVegPrice: String,
  capacity: String,
  rooms: Number,
  rentalCost: String,
  venueTypes: [String],
  image: String,
  rating: Number (default: 4.5),
  reviews: Number (default: 0),
  services: String,
  features: [String],
  timestamps: true
}
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Frontend Setup
```bash
cd my-app
npm install
npm start
```

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the server directory:
```
MONGODB_URI=mongodb://localhost:27017/wedding
DB_NAME=wedding
PORT=4000
JWT_SECRET=your_jwt_secret_key
```

### Database Setup
1. Start MongoDB service
2. The application will automatically create the database and collections
3. Sample data can be imported using the data files in the frontend

## 📝 Development Guidelines

### Code Structure
- **Components**: Functional components with hooks
- **Styling**: CSS modules for component-specific styles
- **State Management**: React hooks (useState, useEffect)
- **Routing**: Client-side routing with URL parameters

### Best Practices
1. **Component Organization**: Separate components by functionality
2. **Props Validation**: Use PropTypes for type checking
3. **Error Handling**: Implement try-catch blocks for API calls
4. **Responsive Design**: Mobile-first CSS approach
5. **Performance**: Lazy loading for images and components

### File Naming Conventions
- **Components**: PascalCase (e.g., `InvitesPage.js`)
- **Styles**: PascalCase with .css (e.g., `InvitesPage.css`)
- **Data Files**: camelCase (e.g., `invitesData.js`)
- **Utilities**: camelCase (e.g., `authUtils.js`)

## 🚀 Deployment

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `build` folder to a static hosting service
3. Configure environment variables for API endpoints

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables
3. Deploy to cloud platform (Heroku, AWS, etc.)
4. Set up CORS for frontend domain

### Production Considerations
- Enable HTTPS
- Set up proper error logging
- Configure database backups
- Implement rate limiting
- Set up monitoring and analytics

## 🔧 Configuration

### Frontend Configuration
- API base URL configuration in navbar.js
- Environment-specific settings
- Build optimization settings

### Backend Configuration
- Database connection settings
- JWT secret configuration
- CORS settings for cross-origin requests
- Port and host configuration

## 📊 Future Enhancements

### Planned Features
1. **Payment Integration**: Stripe/PayPal integration for bookings
2. **Real-time Chat**: Vendor-customer communication
3. **Review System**: Rating and review functionality
4. **Calendar Integration**: Booking and scheduling system
5. **Mobile App**: React Native mobile application
6. **Advanced Search**: AI-powered vendor recommendations
7. **Analytics Dashboard**: Vendor performance metrics

### Technical Improvements
1. **Caching**: Redis for improved performance
2. **CDN**: Content delivery network for assets
3. **Microservices**: Break down into smaller services
4. **Testing**: Comprehensive test suite
5. **CI/CD**: Automated deployment pipeline

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request
5. Code review and merge

### Code Standards
- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Maintain consistent formatting

## 📞 Support

For technical support or questions:
- Check the documentation first
- Review existing issues
- Create a new issue with detailed description
- Contact the development team

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: Development Team
