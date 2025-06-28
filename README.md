Shortly
A URL shortener web application built with Node.js, Express, and MongoDB Atlas. The application provides user authentication and allows users to create and manage shortened URLs through a clean web interface.
Overview
Shortly enables users to register accounts, authenticate, and convert long URLs into shortened versions. Users can track click analytics for their shortened URLs through a personal dashboard. The application is deployed on Render and uses MongoDB Atlas for data persistence.
Live Application: https://shortly-jogp.onrender.com/
Technology Stack

Backend: Node.js, Express.js
Database: MongoDB Atlas (cloud)
Template Engine: EJS
Authentication: JSON Web Tokens (JWT)
Deployment: Render.com
Session Management: Cookie-based authentication

Project Structure
shortly/
├── index.js                          # Application entry point
├── connection.js                     # MongoDB Atlas connection
├── routes/
│   ├── url.js                       # URL shortening endpoints
│   ├── redirect.js                  # URL redirection handling
│   ├── homerouter.js               # Dashboard and authentication pages
│   └── user.js                     # User registration and login
├── controllers/
│   ├── url.js                      # URL business logic
│   └── user.js                     # User authentication logic
├── middlewares/
│   └── restrictToLoggedinUser.js   # JWT authentication middleware
├── models/
│   ├── url.js                      # URL data schema
│   └── user.js                     # User data schema
├── service/
│   └── auth.js                     # JWT token operations
├── views/
│   ├── home.ejs                    # User dashboard
│   ├── login.ejs                   # Login interface
│   └── signup.ejs                  # Registration interface
└── package.json
Installation and Setup
Prerequisites

Node.js (version 14 or higher)
MongoDB Atlas account
Git

Local Development Setup

Clone the repository:
bashgit clone https://github.com/Shivanshxsharma/shortly.git
cd shortly

Install dependencies:
bashnpm install

Configure environment variables:
Create a .env file or update connection.js with your MongoDB Atlas connection string.
Start the development server:
bashnode index.js

Access the application at http://localhost:7000

Application Features
User Management

User registration with email validation
Secure authentication using JWT tokens
Session persistence through HTTP cookies
Protected routes requiring authentication

URL Operations

Convert long URLs to short, manageable links
Custom short ID generation using nanoid
Click tracking and analytics
User-specific URL management

Web Interface
The application provides three main interfaces through EJS templates:

Dashboard (home.ejs): Displays user's shortened URLs, creation form, and analytics
Login (login.ejs): User authentication interface
Registration (signup.ejs): New user account creation

API Endpoints
Authentication Routes

GET /login - Display login form
GET /signup - Display registration form
POST /login - Authenticate user credentials
POST /signup - Create new user account
GET /log-out - Clear authentication and redirect

URL Management Routes

GET / - User dashboard (authentication required)
POST /url/ - Create shortened URL (authentication required)
GET /url/analytics/:shortid - Retrieve URL click statistics
GET /:shortid - Redirect to original URL (public access)

Database Schema
User Document
javascript{
  name: String,
  email: String,
  password: String,
  confirmPassword: String,
  createdAt: Date,
  updatedAt: Date
}
URL Document
javascript{
  shortId: String,
  redirectURL: String,
  visithistory: [{
    timestamp: Number
  }],
  createdBy: String,
  createdAt: Date,
  updatedAt: Date
}
Authentication System
The application implements JWT-based authentication with the following flow:

Registration: Users provide name, email, and password. Password confirmation is validated before account creation.
Login: Email and password are verified against stored credentials.
Token Generation: Successful authentication generates a JWT token stored in an HTTP cookie.
Route Protection: Middleware validates JWT tokens for protected endpoints.
Session Management: Tokens remain valid until logout or expiration.

Dependencies
json{
   "cookie": "^1.0.2",
    "cookie-parser": "^1.4.7",
    "ejs": "^3.1.10",
    "express": "^5.1.0",
    "express-session": "^1.18.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.16.0",
    "nanoid": "^5.1.5",
    "parser": "^0.1.4",
    "uuid": "^11.1.0"
}
Deployment Configuration
The application is configured for deployment on Render.com with the following considerations:

Database: MongoDB Atlas cloud instance
Environment Variables: JWT secret and database connection string
Static Files: EJS templates served through Express
Port Configuration: Dynamic port assignment for cloud deployment

Security Considerations

JWT tokens used for stateless authentication
Password storage and validation
Protected routes preventing unauthorized access
Session management through secure cookies
Input validation for user registration

Development Notes

The application uses MongoDB Atlas for cloud database storage
JWT secret should be configured as an environment variable in production
All URL operations require user authentication except public redirects
Click tracking is implemented through visit history arrays

Author
Developed by Shivansh Sharma
GitHub: @Shivanshxsharma
Live Demo: https://shortly-jogp.onrender.com/
