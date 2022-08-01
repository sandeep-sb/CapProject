const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    email: String,
    code: String,
    expiresIn: Number
}, {
    timestamps: true
}) 

module.exports = mongoose.model("otp", OtpSchema, "otp")