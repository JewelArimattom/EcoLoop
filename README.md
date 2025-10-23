# EcoLoop - Premium E-Waste Recycling Platform

EcoLoop is a full-stack web application for managing e-waste recycling with a modern React frontend and Node.js/MongoDB backend.

## 🚀 Features

### Frontend
- ✨ **Premium UI Design** with Tailwind CSS and Lucide React icons
- 🔐 **User Authentication** - Register, Login, Protected Routes
- 📦 **Pickup Scheduling** - Multi-step form with validation
- 📍 **Auto-location Detection** using Geolocation API
- 📱 **Fully Responsive** - Mobile-first design
- 🎨 **Modern Animations** - Smooth transitions and hover effects
- 🌐 **React Router** - Client-side routing
- 💳 **Dashboard** - User statistics and pickup history (coming soon)

### Backend
- 🔒 **Secure Authentication** - JWT tokens with bcrypt password hashing
- 📊 **MongoDB Database** - NoSQL data storage
- 🛡️ **Protected Routes** - Middleware authentication
- 📝 **Input Validation** - Express Validator
- 🔄 **RESTful API** - Clean API design
- 🌍 **CORS Enabled** - Frontend-backend communication
- ⚡ **Rate Limiting** - API security
- 🔐 **Helmet Security** - HTTP headers protection

## 📁 Project Structure

```
EcoLoop/
├── frontend/                  # React + TypeScript frontend
│   ├── public/               # Static assets
│   │   ├── logo.svg          # Main application logo
│   │   ├── logo-192.svg      # PWA icon
│   │   └── favicon.svg       # Browser favicon
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── footer/       # Footer component
│   │   │   ├── homepage/     # Home page components
│   │   │   └── layout/       # Layout components (Navbar)
│   │   ├── context/          # React Context (Auth)
│   │   ├── pages/            # Page components
│   │   │   ├── About.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── SchedulePickup.tsx
│   │   ├── services/         # API services
│   │   │   └── api.ts        # Axios configuration and API calls
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── .env                  # Environment variables
│   └── package.json          # Frontend dependencies
│
└── backend/                   # Node.js + Express backend
    ├── config/               # Configuration files
    │   └── db.js             # MongoDB connection
    ├── middleware/           # Custom middleware
    │   └── auth.js           # JWT authentication middleware
    ├── models/               # Mongoose models
    │   ├── User.js           # User schema
    │   └── Pickup.js         # Pickup schema
    ├── routes/               # API routes
    │   ├── auth.js           # Authentication routes
    │   ├── pickups.js        # Pickup management routes
    │   └── dashboard.js      # Dashboard statistics routes
    ├── .env                  # Environment variables (MongoDB URI, JWT secret)
    ├── .gitignore            # Git ignore file
    ├── package.json          # Backend dependencies
    └── server.js             # Express server entry point
```

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **TypeScript** - Type safety
- **Vite 7.1.9** - Build tool
- **Tailwind CSS 4.1.14** - Styling
- **React Router DOM 7.9.4** - Routing
- **Axios** - HTTP client
- **Lucide React 0.545.0** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express 4.18.2** - Web framework
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose 8.0.0** - ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **bcryptjs 2.4.3** - Password hashing
- **Express Validator 7.0.1** - Input validation
- **Helmet 7.1.0** - Security headers
- **CORS 2.8.5** - Cross-origin requests
- **Rate Limit 7.1.5** - API rate limiting

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ecoloop.git
cd ecoloop
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file in backend folder (already exists):
```env
PORT=5000
MONGODB_URI=mongodb+srv://jewelat50_db_user:YMgvPPnx5BrHE7kL@ecoloop.hxwc64a.mongodb.net/?retryWrites=true&w=majority&appName=EcoLoop
JWT_SECRET=ecoloop_super_secret_key_2025_production_change_this_in_production
JWT_EXPIRE=30d
NODE_ENV=development
```

**⚠️ Important:** Change `JWT_SECRET` to a secure random string in production!

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create `.env` file in frontend folder (already exists):
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on **http://localhost:5000**

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on **http://localhost:5173** (or **http://localhost:3000** if configured)

### Production Build (Frontend)

```bash
cd frontend
npm run build
npm run preview
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/updateprofile` - Update user profile (Protected)

### Pickup Routes (`/api/pickups`)
- `POST /api/pickups` - Create pickup request (Protected)
- `GET /api/pickups` - Get all user pickups (Protected)
- `GET /api/pickups/:id` - Get single pickup (Protected)
- `PUT /api/pickups/:id` - Update pickup (Protected)
- `DELETE /api/pickups/:id` - Delete pickup (Protected)
- `GET /api/pickups/tracking/:trackingNumber` - Track pickup (Public)

### Dashboard Routes (`/api/dashboard`)
- `GET /api/dashboard/stats` - Get user statistics (Protected)
- `GET /api/dashboard/pickups/recent` - Get recent pickups (Protected)

## 🔒 Authentication Flow

1. **Register**: User creates account → Backend hashes password → Saves to MongoDB → Returns JWT token
2. **Login**: User submits credentials → Backend verifies → Returns JWT token
3. **Protected Routes**: Frontend sends JWT in Authorization header → Backend verifies → Grants access
4. **Token Storage**: JWT stored in localStorage → Attached to all API requests

## 🗃️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required, 10 digits),
  password: String (required, hashed),
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String (6 digits)
  },
  role: String (default: 'user'),
  isVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Pickup Model
```javascript
{
  user: ObjectId (ref: 'User'),
  category: String (required),
  items: Array of Strings,
  customItem: String,
  pickupType: String ('immediate' or 'scheduled'),
  scheduledDate: Date,
  scheduledTime: String,
  contactInfo: {
    name: String (required),
    phone: String (required, 10 digits),
    email: String
  },
  address: {
    street: String (required),
    city: String (required),
    state: String (required),
    pincode: String (required, 6 digits)
  },
  status: String (default: 'pending'),
  estimatedWeight: Number,
  notes: String,
  trackingNumber: String (auto-generated),
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Frontend Routes

- `/` - Home page
- `/about` - About EcoLoop
- `/how-it-works` - How the service works
- `/login` - Login page
- `/signup` - Registration page
- `/schedule-pickup` - Schedule pickup (Protected)
- `/dashboard` - User dashboard (Protected)

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000                    # Server port
MONGODB_URI=your_mongodb_uri # MongoDB connection string
JWT_SECRET=your_secret_key   # JWT signing key (CHANGE IN PRODUCTION!)
JWT_EXPIRE=30d               # Token expiration
NODE_ENV=development         # Environment mode
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api  # Backend API URL
```

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Check if MongoDB URI is correct
- Verify network access in MongoDB Atlas
- Ensure IP address is whitelisted

**JWT Token Invalid**
- Clear localStorage in browser
- Check if JWT_SECRET matches between sessions
- Verify token hasn't expired

### Frontend Issues

**API Calls Failing**
- Check if backend server is running on port 5000
- Verify CORS is enabled
- Check browser console for errors

**Login Not Working**
- Clear browser cache and localStorage
- Check network tab for API responses
- Verify email/password are correct

## 📝 Development Notes

### Form Validation
- All forms have client-side validation
- Backend also validates all inputs
- Error messages displayed in real-time

### Password Security
- Passwords hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Min 6 characters required

### Auto-location Feature
- Uses browser Geolocation API
- Falls back to manual entry if denied
- Integrates with Nominatim for reverse geocoding

## 🚀 Deployment

### Backend Deployment (Heroku/Render/Railway)
1. Set environment variables
2. Change `NODE_ENV` to `production`
3. Update `JWT_SECRET` to secure value
4. Update CORS origin to production URL

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Update `VITE_API_URL` to production backend URL
3. Deploy `dist` folder

## 📄 License

MIT License

## 👥 Contributors

- **EcoLoop Team**

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ♻️ by EcoLoop Team**
