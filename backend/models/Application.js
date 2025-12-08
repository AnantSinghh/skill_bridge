

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    internship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Internship',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: [true, 'Please provide a cover letter']
    },
    resume: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'interview', 'accepted', 'rejected'],
        default: 'pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});


applicationSchema.index({ internship: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
