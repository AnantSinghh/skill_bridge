/**
 * Application Routes
 * Handles internship applications submitted by students
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Application = require('../models/Application');
const Internship = require('../models/Internship');
const { protect } = require('../middleware/auth');

/**
 * @route   POST /api/applications
 * @desc    Submit an internship application
 * @access  Private (Students)
 */
router.post(
    '/',
    [
        protect,
        body('internshipId').notEmpty().withMessage('Internship ID is required'),
        body('coverLetter').trim().notEmpty().withMessage('Cover letter is required')
    ],
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { internshipId, coverLetter, resume } = req.body;

            // Check if internship exists
            const internship = await Internship.findById(internshipId);
            if (!internship) {
                return res.status(404).json({
                    success: false,
                    message: 'Internship not found'
                });
            }

            // Check if internship is still active
            if (!internship.isActive) {
                return res.status(400).json({
                    success: false,
                    message: 'This internship is no longer accepting applications'
                });
            }

            // Check if deadline has passed
            if (new Date() > new Date(internship.applicationDeadline)) {
                return res.status(400).json({
                    success: false,
                    message: 'Application deadline has passed'
                });
            }

            // Check if user has already applied
            const existingApplication = await Application.findOne({
                internship: internshipId,
                student: req.user._id
            });

            if (existingApplication) {
                return res.status(400).json({
                    success: false,
                    message: 'You have already applied for this internship'
                });
            }

            // Create application
            const application = await Application.create({
                internship: internshipId,
                student: req.user._id,
                studentName: req.user.name,
                studentEmail: req.user.email,
                coverLetter,
                resume: resume || ''
            });

            // Populate internship details
            await application.populate('internship', 'title company');

            res.status(201).json({
                success: true,
                message: 'Application submitted successfully',
                data: application
            });
        } catch (error) {
            console.error('Submit application error:', error);
            res.status(500).json({
                success: false,
                message: 'Error submitting application',
                error: error.message
            });
        }
    }
);

/**
 * @route   GET /api/applications/my-applications
 * @desc    Get all applications submitted by logged-in student
 * @access  Private (Students)
 */
router.get('/my-applications', protect, async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user._id })
            .populate('internship', 'title company country duration stipend')
            .sort({ appliedAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching applications',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/applications
 * @desc    Get all applications (Admin only)
 * @access  Private/Admin
 */
router.get('/', protect, async (req, res) => {
    try {
        // Only admins can view all applications
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const applications = await Application.find()
            .populate('internship', 'title company')
            .populate('student', 'name email')
            .sort({ appliedAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        console.error('Get all applications error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching applications',
            error: error.message
        });
    }
});

/**
 * @route   PUT /api/applications/:id/status
 * @desc    Update application status (Admin only)
 * @access  Private/Admin
 */
router.put('/:id/status', protect, async (req, res) => {
    try {
        // Only admins can update application status
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const { status } = req.body;

        if (!['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        ).populate('internship', 'title company');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Application status updated successfully',
            data: application
        });
    } catch (error) {
        console.error('Update application status error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating application status',
            error: error.message
        });
    }
});

module.exports = router;
