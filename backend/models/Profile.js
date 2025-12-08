
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    bio: {
        type: String,
        maxlength: 500
    },
    phone: {
        type: String
    },
    location: {
        type: String
    },
    education: [{
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        field: {
            type: String,
            required: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String
        },
        current: {
            type: Boolean,
            default: false
        }
    }],
    experience: [{
        company: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String
        },
        current: {
            type: Boolean,
            default: false
        }
    }],
    skills: [{
        type: String
    }],
    projects: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        technologies: [{
            type: String
        }],
        link: {
            type: String
        }
    }],
    resume: {
        type: String 
    },
    portfolio: {
        type: String 
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
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


profileSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Profile', profileSchema);
