const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    studentName: String,

    source: String,

    destination: String,

    busNumber: String,

    duration: String,

    amount: Number,

    paymentStatus: {
        type: String,
        default: 'Unpaid'
    },

    status: {
        type: String,
        default: 'Pending'
    }

}, { timestamps: true });

module.exports = mongoose.model('Pass', passSchema);