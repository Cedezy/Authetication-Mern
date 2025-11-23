const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'staff', 'manager'],
        default: 'customer',
    },
    phone: {
        type: String,
    },
    province: {
        type: String,
    },
    city: { 
        type: String 
    },
    barangay: { 
        type: String 
    },
    street: { 
        type: String 
    },
    age: { 
        type: Number 
    },
    birthdate: { 
        type: Date 
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    resetOtp: String,
    resetOtpExpiry: Date,
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
}, { 
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
