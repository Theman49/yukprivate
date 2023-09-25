const authService = require('../services/authService');
const { generatedOTP } = require("../helper/otpGenerator");
const otpExpiredGenerator = require("../helper/otpExpiredGenerator");


// ------------------------------- Auth Register ------------------------------- //

const handleRegister = async(req, res) => {
    
    const { name, email, password } = req.body;

    const { status, status_code, message, data } = await authService.handleRegister({
        name,
        email,
        password,
        otp: generatedOTP(),
        otpExpired: otpExpiredGenerator.expiredTime()
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });
};

// ------------------------------- End Auth Register ------------------------------- //


// ------------------------------- Handle Verify Email ------------------------------- //

const handleVerifyEmail = async(req, res, next) => {
    
    const { otp, email, isVerifiedEmail, otpExpired } = req.body;

    const { status, status_code, message, data } = await authService.handleVerifyEmail({
        otp,
        email,
        isVerifiedEmail,
        otpExpired
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });

};

// ------------------------------- Handle Verify Email ------------------------------- //


// ------------------------------- Handle Resend OTP ------------------------------- //

const handleResendOTP = async(req, res, next) => {
    
    const { email } = req.body;

    const { status, status_code, message, data } = await authService.handleResendOTP({
        email,
        otp: generatedOTP(),
        otpExpired: otpExpiredGenerator.expiredTime()
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Resend OTP ------------------------------- //


// ------------------------------- Handle Forgot Password ------------------------------- //

const handleForgotPassword = async(req, res) => {

    const { email } = req.body;

    const { status, status_code, message, data } = await authService.handleForgotPassword({
        email,
        otp: generatedOTP(),
        otpExpired: otpExpiredGenerator.expiredTime()
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Forgot Password ------------------------------- //


// ------------------------------- Handle Verify Forgot Password ------------------------------- //

const handleVerifyForgotPassword = async(req, res) => {
    
    const { otp, email, isVerifiedNewPassword, otpExpired } = req.body;

    const { status, status_code, message, data } = await authService.handleVerifyForgotPassword({
        otp,
        email,
        isVerifiedNewPassword,
        otpExpired
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });
};

// ------------------------------- End Handle Verify Forgot Password ------------------------------- //


// ------------------------------- Handle Forgot Password Resend OTP ------------------------------- //

const handleForgotPasswordResendOTP = async (req, res) => {

    const { email } = req.body;

    const { status, status_code, message, data } = await authService.handleForgotPasswordResendOTP({
        email,
        otp: generatedOTP(),
        otpExpired: otpExpiredGenerator.expiredTime()
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });

};

// ------------------------------- Handle Forgot Password Resend OTP ------------------------------- //


// ------------------------------- Handle Reset Password ------------------------------- //

const handleResetPassword = async(req, res) => {
    
    const { otp, otpExpired, password } = req.body;

    const { status, status_code, message, data } = await authService.handleResetPassword({
        otp,
        otpExpired,
        password
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });
};

// ------------------------------- End Handle Reset Password ------------------------------- //


module.exports = {
    handleRegister,
    handleVerifyEmail,
    handleResendOTP,
    handleForgotPassword,
    handleVerifyForgotPassword,
    handleForgotPasswordResendOTP,
    handleResetPassword,
};