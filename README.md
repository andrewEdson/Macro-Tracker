# Macro Tracker 🎯

A comprehensive nutrition tracking backend API with AI-powered food analysis, built with Node.js, Express, and MongoDB. **Frontend implementation coming soon!**

## 🚧 **Current Project Status**

### ✅ **Completed Backend Features**

- **Complete RESTful API** with full CRUD operations
- **JWT Authentication System** with secure login/registration
- **MongoDB Database** with well-designed schemas
- **AI Integration** using OpenAI for food macro lookup
- **Comprehensive Controllers** for all major features
- **Middleware** for authentication and error handling

### 🔄 **In Development**

- **React Frontend** - Modern UI implementation planned
- **Frontend Authentication** - Login/register pages
- **Dashboard Interface** - Macro tracking visualization
- **Mobile Responsiveness** - Cross-device compatibility

### 📋 **Planned Features**

- **User Registration/Login Interface**
- **Daily Macro Dashboard**
- **Meal Planning Interface**
- **AI Food Lookup Frontend**
- **Progress Visualization**

## 🛠️ **Technology Stack**

### **Backend (✅ Complete)**

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **OpenAI API** - AI-powered food analysis
- **CORS** - Cross-origin resource sharing

### **Frontend (🔄 Planned)**

- **React 18** - UI library (to be implemented)
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Modern CSS** - Responsive design with animations

## 📁 **Current Project Structure**

```
Macro Tracker/
├── backend/                     # ✅ Complete Node.js/Express API
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js  # Authentication logic
│   │   ├── user.controller.js  # User management
│   │   ├── food.controller.js  # Food CRUD operations
│   │   ├── meal.controller.js  # Meal management
│   │   ├── dayLog.controller.js # Daily tracking
│   │   └── chat.controller.js  # AI integration
│   ├── middleware/
│   │   └── auth.middleware.js  # JWT authentication
│   ├── models/
│   │   ├── user.model.js       # User schema with macro goals
│   │   ├── food.model.js       # Food nutritional data
│   │   ├── meal.model.js       # Meal composition
│   │   └── dayLog.model.js     # Daily tracking with auto-totals
│   ├── routes/
│   │   ├── auth.route.js       # Auth endpoints
│   │   ├── user.route.js       # User endpoints
│   │   ├── food.route.js       # Food endpoints
│   │   ├── meal.route.js       # Meal endpoints
│   │   ├── dayLog.route.js     # Daily log endpoints
│   │   └── chat.route.js       # AI endpoints
│   ├── package.json
│   └── server.js               # Application entry point
├── frontend/                   # 🔄 Frontend (To be implemented)
│   └── (React app will go here)
└── README.md                   # This file
```

## 🚀 **Getting Started (Backend)**

### **Prerequisites**

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **OpenAI API Key** (for AI features)

### **Installation & Setup**

#### **1. Clone the Repository**

```bash
git clone https://github.com/andrewEdson/Macro-Tracker.git
cd Macro-Tracker
```

#### **2. Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your configuration
# Add the following variables:
MONGODB_URI=mongodb://localhost:27017/macro-tracker
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=your-openai-api-key
PORT=5000
```

### **🏃 Running the Backend**

```bash
cd backend
npm start
```

✅ **Backend API will be running on `http://localhost:5000`**

### **🧪 Testing the API**

You can test the API endpoints using tools like **Postman**, **Thunder Client**, or **curl**:

```bash
# Health check
curl http://localhost:5000

# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "age": 25,
    "height": 175,
    "weight": 70,
    "goal": "maintain weight",
    "macroGoals": {
      "calories": 2000,
      "protein": 150,
      "carbs": 200,
      "fats": 67
    }
  }'

# Get AI food macros
curl -X POST http://localhost:5000/api/chat/macros \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "foodName": "apple",
    "restaurant": ""
  }'
```

## 📚 **API Documentation**

### **Authentication Endpoints**

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### **Food Management**

- `GET /api/foods` - Search foods
- `POST /api/foods` - Create food item
- `GET /api/foods/:id` - Get specific food
- `PUT /api/foods/:id` - Update food
- `DELETE /api/foods/:id` - Delete food

### **Meal Management**

- `POST /api/meals` - Create meal
- `GET /api/meals/:id` - Get meal details
- `PUT /api/meals/:id` - Update meal
- `DELETE /api/meals/:id` - Delete meal

### **Daily Tracking**

- `POST /api/daylogs` - Create daily log
- `GET /api/daylogs/:userID/:date` - Get daily log
- `PUT /api/daylogs/:userID/:date` - Update daily log
- `DELETE /api/daylogs/:userID/:date` - Delete daily log

### **AI Features**

- `POST /api/chat` - Chat with AI assistant
- `POST /api/chat/macros` - Get food macro information

## 🎯 **Backend Features Explained**

### **🔐 Authentication System**

- **JWT-based authentication** with secure password hashing
- **User registration** with personalized macro goals
- **Protected routes** with middleware authentication
- **User profile management** with goal tracking

### **📊 Smart Macro Calculation**

- **Automatic macro totals** calculated when meals are updated
- **Daily log tracking** with date-based organization
- **Goal-based recommendations** using BMR calculations
- **Real-time updates** when foods are added to meals

### **🤖 AI Integration**

- **OpenAI-powered food lookup** with restaurant-specific search
- **Intelligent macro parsing** that returns structured nutrition data
- **Nutrition chat assistant** for expert advice
- **Automatic food database expansion** from AI results

### **🍽️ Comprehensive Food & Meal Management**

- **Extensive food database** with detailed nutritional information
- **Flexible meal composition** supporting multiple foods per meal
- **Automatic macro summation** at meal and daily levels
- **Historical tracking** with day-by-day meal logs

## 🔄 **Next Steps: Frontend Development**

The backend API is complete and ready for frontend integration. Planned frontend features include:

- **📱 Modern React Interface** with responsive design
- **� Visual Progress Dashboard** showing macro goals vs. actual intake
- **🔍 Interactive Food Search** with real-time filtering
- **� Calendar View** for historical tracking
- **🤖 AI Chat Interface** for easy nutrition assistance
- **📈 Progress Charts** and analytics

## 🔧 **Environment Variables**

### **Backend (.env)**

```env
MONGODB_URI=mongodb://localhost:27017/macro-tracker
JWT_SECRET=your-super-secret-jwt-key-here
OPENAI_API_KEY=sk-your-openai-api-key-here
PORT=5000
```

### **Frontend (optional .env)**

```env
REACT_APP_API_URL=http://localhost:5000
```

## 🐛 **Troubleshooting**

### **Backend Issues**

**Backend won't start:**

- ✅ Ensure MongoDB is running
- ✅ Check if port 5000 is available
- ✅ Verify .env file exists with correct variables
- ✅ Run `npm install` to ensure dependencies are installed

**Database connection issues:**

- ✅ Check MongoDB URI in .env file
- ✅ Ensure MongoDB service is running
- ✅ Verify database permissions and network access

**AI features not working:**

- ✅ Check OpenAI API key is valid and active
- ✅ Ensure you have API credits available
- ✅ Verify network connection and API rate limits

**Authentication issues:**

- ✅ Check JWT_SECRET is set in .env file
- ✅ Verify password meets minimum requirements (6 characters)
- ✅ Ensure email format is valid during registration

## 📈 **Development Roadmap**

### **Phase 1: Backend API (✅ Complete)**

- [x] User authentication and authorization
- [x] Food and meal management systems
- [x] Daily macro tracking with auto-calculations
- [x] AI integration for food lookup and chat
- [x] Comprehensive API documentation

### **Phase 2: Frontend Development (🔄 In Progress)**

- [ ] React application setup and routing
- [ ] User authentication UI (login/register)
- [ ] Dashboard with macro visualization
- [ ] Meal planning and food search interface
- [ ] AI assistant integration
- [ ] Responsive design implementation

### **Phase 3: Enhancement & Optimization (📋 Planned)**

- [ ] Progressive Web App (PWA) features
- [ ] Offline functionality with data sync
- [ ] Advanced analytics and reporting
- [ ] Social features and progress sharing
- [ ] Mobile app development
- [ ] Performance optimization and caching

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **Author**

**Andrew Edson**

- GitHub: [@andrewEdson](https://github.com/andrewEdson)

---

**Happy Macro Tracking! 🎯📊**
