/**
 * Internship Model
 * Defines the schema for internship listings
 */

const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide internship title'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide internship description']
    },
    skills: {
        type: [String],
        required: [true, 'Please provide required skills']
    },
    country: {
        type: String,
        required: [true, 'Please provide country'],
        trim: true
    },
    duration: {
        type: String,
        required: [true, 'Please provide duration'],
        trim: true
    },
    stipend: {
        type: String,
        default: 'Unpaid'
    },
    applicationDeadline: {
        type: Date,
        required: [true, 'Please provide application deadline']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
internshipSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Internship', internshipSchema);
