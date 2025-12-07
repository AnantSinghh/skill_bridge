/**
 * Profile Routes
 * Handles user profile CRUD operations
 */

const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { protect } = require('../middleware/auth');

/**
 * @route   GET /api/profile/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get('/me', protect, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id })
            .populate('user', 'name email');

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/profile
 * @desc    Create user profile
 * @access  Private
 */
router.post('/', protect, async (req, res) => {
    try {
        // Check if profile already exists
        let profile = await Profile.findOne({ user: req.user._id });

        if (profile) {
            return res.status(400).json({
                success: false,
                message: 'Profile already exists. Use PUT to update.'
            });
        }

        // Create new profile
        profile = await Profile.create({
            user: req.user._id,
            ...req.body
        });

        res.status(201).json({
            success: true,
            message: 'Profile created successfully',
            data: profile
        });
    } catch (error) {
        console.error('Create profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating profile',
            error: error.message
        });
    }
});

/**
 * @route   PUT /api/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/', protect, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user._id });

        if (!profile) {
            // Create profile if it doesn't exist
            profile = await Profile.create({
                user: req.user._id,
                ...req.body
            });

            return res.status(201).json({
                success: true,
                message: 'Profile created successfully',
                data: profile
            });
        }

        // Update existing profile
        profile = await Profile.findOneAndUpdate(
            { user: req.user._id },
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: profile
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
});

/**
 * @route   DELETE /api/profile
 * @desc    Delete user profile
 * @access  Private
 */
router.delete('/', protect, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        await Profile.findOneAndDelete({ user: req.user._id });

        res.status(200).json({
            success: true,
            message: 'Profile deleted successfully'
        });
    } catch (error) {
        console.error('Delete profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting profile',
            error: error.message
        });
    }
});

module.exports = router;
