/**
 * Internship Routes
 * Handles CRUD operations for internships
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Internship = require('../models/Internship');
const { protect, adminOnly } = require('../middleware/auth');

/**
 * @route   GET /api/internships
 * @desc    Get all internships with optional filters and pagination
 * @access  Public
 * @query   page - Page number (default: 1)
 * @query   limit - Items per page (default: 10)
 * @query   skill, country, duration, search - Filter parameters
 */
router.get('/', async (req, res) => {
    try {
        const { skill, country, duration, search, page = 1, limit = 10 } = req.query;

        // Build filter object
        let filter = { isActive: true };

        if (skill) {
            filter.skills = { $in: [new RegExp(skill, 'i')] };
        }

        if (country) {
            filter.country = new RegExp(country, 'i');
        }

        if (duration) {
            filter.duration = new RegExp(duration, 'i');
        }

        if (search) {
            filter.$or = [
                { title: new RegExp(search, 'i') },
                { company: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') }
            ];
        }

        // Calculate pagination
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        // Get total count for pagination metadata
        const totalCount = await Internship.countDocuments(filter);

        // Fetch paginated results
        const internships = await Internship.find(filter)
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        res.status(200).json({
            success: true,
            count: internships.length,
            total: totalCount,
            page: pageNum,
            pages: Math.ceil(totalCount / limitNum),
            data: internships
        });
    } catch (error) {
        console.error('Get internships error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching internships',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/internships/:id
 * @desc    Get single internship by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id)
            .populate('createdBy', 'name email');

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: 'Internship not found'
            });
        }

        res.status(200).json({
            success: true,
            data: internship
        });
    } catch (error) {
        console.error('Get internship error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching internship',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/internships
 * @desc    Create a new internship (Admin only)
 * @access  Private/Admin
 */
router.post(
    '/',
    [
        protect,
        adminOnly,
        body('title').trim().notEmpty().withMessage('Title is required'),
        body('company').trim().notEmpty().withMessage('Company name is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('skills').isArray({ min: 1 }).withMessage('At least one skill is required'),
        body('country').trim().notEmpty().withMessage('Country is required'),
        body('duration').trim().notEmpty().withMessage('Duration is required'),
        body('applicationDeadline').isISO8601().withMessage('Valid deadline date is required')
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

            const internshipData = {
                ...req.body,
                createdBy: req.user._id
            };

            const internship = await Internship.create(internshipData);

            res.status(201).json({
                success: true,
                message: 'Internship created successfully',
                data: internship
            });
        } catch (error) {
            console.error('Create internship error:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating internship',
                error: error.message
            });
        }
    }
);

/**
 * @route   PUT /api/internships/:id
 * @desc    Update an internship (Admin only)
 * @access  Private/Admin
 */
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        let internship = await Internship.findById(req.params.id);

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: 'Internship not found'
            });
        }

        // Update internship
        internship = await Internship.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: 'Internship updated successfully',
            data: internship
        });
    } catch (error) {
        console.error('Update internship error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating internship',
            error: error.message
        });
    }
});

/**
 * @route   DELETE /api/internships/:id
 * @desc    Delete an internship (Admin only)
 * @access  Private/Admin
 */
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: 'Internship not found'
            });
        }

        await Internship.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Internship deleted successfully'
        });
    } catch (error) {
        console.error('Delete internship error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting internship',
            error: error.message
        });
    }
});

module.exports = router;
