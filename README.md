# SkillBridge - Global Internship Finder

A full-stack web application that helps students find and apply for verified global internships. Built with React.js, Node.js, Express.js, and MongoDB.

## 🚀 Features

### For Students
- 🔐 Secure authentication with JWT
- 🔍 Browse verified global internships
- 🎯 Filter internships by skill, country, and duration
- 📝 Apply for internships with cover letters
- 📊 Track application status in real-time
- 📱 Fully responsive design

### For Admins
- ➕ Create new internship listings
- ✏️ Update existing internships
- 🗑️ Delete internships
- 👥 Manage applications
- 📈 View all applications

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with modern gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
ap project/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # JWT middleware
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Internship.js         # Internship model
│   │   └── Application.js        # Application model
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── internships.js        # Internship routes
│   │   └── applications.js       # Application routes
│   ├── .env.example              # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Navbar.css
    │   │   ├── InternshipCard.js
    │   │   ├── InternshipCard.css
    │   │   └── ProtectedRoute.js
    │   ├── context/
    │   │   └── AuthContext.js    # Authentication context
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── Internships.js
    │   │   ├── InternshipDetails.js
    │   │   ├── MyApplications.js
    │   │   ├── AdminPanel.js
    │   │   └── [corresponding CSS files]
    │   ├── utils/
    │   │   └── api.js            # Axios configuration
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env.example
    ├── .gitignore
    └── package.json
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
```

5. Start the backend server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the frontend:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Base URL
```
Development: http://localhost:5000/api
Production: https://skill-bridge-mdqk.onrender.com/api
```

### Authentication Endpoints

#### Register User
**Endpoint**: `POST /auth/signup`
**Access**: Public

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

#### Login User
**Endpoint**: `POST /auth/login`
**Access**: Public

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Internship Endpoints

#### Get All Internships
**Endpoint**: `GET /internships`
**Access**: Public

**Query Parameters**:
- `skill` (optional): Filter by skill
- `country` (optional): Filter by country
- `duration` (optional): Filter by duration
- `search` (optional): Search text

#### Get Single Internship
**Endpoint**: `GET /internships/:id`
**Access**: Public

#### Create Internship
**Endpoint**: `POST /internships`
**Access**: Private (Admin only)

#### Update Internship
**Endpoint**: `PUT /internships/:id`
**Access**: Private (Admin only)

#### Delete Internship
**Endpoint**: `DELETE /internships/:id`
**Access**: Private (Admin only)

### Application Endpoints

#### Submit Application
**Endpoint**: `POST /applications`
**Access**: Private (Authenticated users)

**Request Body**:
```json
{
  "internshipId": "64abc123...",
  "coverLetter": "I am very interested...",
  "resume": "https://portfolio.com/resume.pdf"
}
```

#### Get My Applications
**Endpoint**: `GET /applications/my-applications`
**Access**: Private (Authenticated users)

#### Get All Applications
**Endpoint**: `GET /applications`
**Access**: Private (Admin only)

#### Update Application Status
**Endpoint**: `PUT /applications/:id/status`
**Access**: Private (Admin only)

**Request Body**:
```json
{
  "status": "accepted" // pending, reviewed, accepted, rejected
}
```

## 🔐 Authentication Flow

1. User registers/logs in
2. Server generates JWT token
3. Token stored in localStorage
4. Token sent with each API request via Authorization header
5. Server validates token using middleware
6. Protected routes accessible only with valid token

### User Roles

#### Student
- Browse and filter internships
- Apply for internships
- View application status
- Update profile

#### Admin
- All student permissions
- Create/Update/Delete internships
- View all applications
- Update application status

## 🔐 Test Credentials

Use these credentials to test the application:

### Admin Account
- **Email**: `admin@skillbridge.com`
- **Password**: `admin123`

### Student Account
- **Email**: `student@skillbridge.com`
- **Password**: `student123`

## 🚀 Deployment

### Backend (Render)
1. Push code to Git
2. Create Web Service on Render
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add Environment Variables: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`

### Frontend (Vercel)
1. Push code to Git
2. Import project in Vercel
3. Set Build Command: `npm run build`
4. Add Environment Variable: `REACT_APP_API_URL` (your backend URL)

## 🔧 Troubleshooting

### Port 5000 Conflict (macOS)
If you see `EADDRINUSE: address already in use :::5000`:
- macOS Control Center uses port 5000.
- The backend is configured to use port **5001** by default to avoid this.

### MongoDB Connection Error
- Ensure your IP is whitelisted in MongoDB Atlas.
- Check if `MONGODB_URI` in `.env` is correct.

### Frontend Can't Connect
- Verify `REACT_APP_API_URL` point to the correct backend address (e.g., `http://localhost:5001/api`).
- Ensure the backend server is running.

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillbridge
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 🧪 Testing the Application

### Create Admin User
Register with role set to "admin" to access admin panel.

### Create Test Internship
1. Login as admin
2. Navigate to Admin Panel
3. Click "Add New Internship"
4. Fill in all required fields
5. Submit

### Apply for Internship
1. Login as student
2. Browse internships
3. Click on an internship
4. Fill application form
5. Submit

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure all environment variables are set
- Check if port 5000 is available

### Frontend can't connect to backend
- Verify REACT_APP_API_URL in frontend .env
- Check if backend is running
- Verify CORS is enabled in backend

### Authentication issues
- Clear localStorage
- Check JWT_SECRET matches on backend
- Verify token is being sent in headers

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a full-stack internship finder platform.

## 🙏 Acknowledgments

- React.js team for the amazing library
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
