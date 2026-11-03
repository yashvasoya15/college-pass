const express = require('express');
const router = express.Router();
const Pass = require('../models/Pass');
console.log('PASS ROUTES LOADED');

// Get single pass
// Get single pass
router.get('/single/:id', async (req, res) => {
    try {
        const pass = await Pass.findById(req.params.id);

        if (!pass) {
            return res.status(404).json({
                message: 'Pass not found'
            });
        }

        res.json(pass);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update payment
router.put('/payment/:id', async (req, res) => {
    try {
        const pass = await Pass.findById(req.params.id);

        if (!pass) {
            return res.status(404).json({
                message: 'Pass not found'
            });
        }

        pass.paymentStatus = 'Paid';

        await pass.save();

        res.json({
            message: 'Payment successful'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post('/apply', async (req, res) => {
    try {
        const {
            studentId,
            studentName,
            source,
            destination,
            busNumber,
            duration
        } = req.body;

        let amount = 0;

        if (duration === 'Monthly') amount = 500;
        else if (duration === 'Quarterly') amount = 1400;
        else if (duration === 'Yearly') amount = 5000;

        const pass = new Pass({
            studentId,
            studentName,
            source,
            destination,
            busNumber,
            duration,
            amount
        });

        await pass.save();

        res.status(201).json({
            message: 'Application submitted successfully',
            pass
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});




// Get all bus pass applications (Admin)
router.get('/all', async (req, res) => {
    try {
        const passes = await Pass.find().sort({ createdAt: -1 });

        res.json(passes);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Approve or reject a bus pass (Admin)
router.put('/status/:id', async (req, res) => {
    try {
        const { status } = req.body;

        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({
                message: 'Invalid status'
            });
        }

        const pass = await Pass.findById(req.params.id);

        if (!pass) {
            return res.status(404).json({
                message: 'Pass not found'
            });
        }

        if (pass.paymentStatus !== 'Paid') {
            return res.status(400).json({
                message: 'Payment is not completed'
            });
        }

        if (pass.status !== 'Pending') {
            return res.status(400).json({
                message: 'Application already processed'
            });
        }

        pass.status = status;
        await pass.save();

        res.json({
            message: `Pass ${status} successfully`,
            pass
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get all passes of a particular student
router.get('/my/:studentId', async (req, res) => {
    try {
        const passes = await Pass.find({
            studentId: req.params.studentId
        }).sort({ createdAt: -1 });

        res.json(passes);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;