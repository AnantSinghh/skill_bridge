/**
 * MongoDB Database Connection Configuration
 * This file handles the connection to MongoDB Atlas using Mongoose
 */

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection string from environment variables
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
