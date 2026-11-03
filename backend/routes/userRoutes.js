const express = require('express');

const router = express.Router();

const User = require('../models/User');

// REGISTER

router.post('/register', async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        const user = new User({

            name,
            email,
            password,
            role: 'student'

        });

        await user.save();

        res.json({
            message: 'Registration successful'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// LOGIN

router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {

            return res.status(400).json({
                message: 'Invalid email or password'
            });

        }

        res.json({

            message: 'Login successful',

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Create demo admin if it does not exist

router.post('/create-admin', async (req, res) => {

    try {

        const oldAdmin = await User.findOne({
            email: 'admin@gmail.com'
        });

        if (oldAdmin) {
            return res.json({
                message: 'Admin already exists'
            });
        }

        const admin = new User({

            name: 'College Admin',
            email: 'admin@gmail.com',
            password: 'admin123',
            role: 'admin'

        });

        await admin.save();

        res.json({
            message: 'Admin created successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



module.exports = router;