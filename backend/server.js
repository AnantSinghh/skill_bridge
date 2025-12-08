

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();


connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/profile', require('./routes/profile'));


app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to SkillBridge API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            internships: '/api/internships',
            applications: '/api/applications',
            profile: '/api/profile'
        }
    });
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});


app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
