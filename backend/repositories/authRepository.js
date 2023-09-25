const { registers, users_new_passwords  } = require('../models');

class AuthRepository {
    
    // ------------------------------- Reset OTP ------------------------------- //

    static async handleResetOTP({ otp, otpExpired }) {

        const resetedOTP = await registers.update({
            otp: null,
            otpExpired: null
        }, {
            where: {
                otp
            }
        });

        return resetedOTP;
    };

    // ------------------------------- End Reset OTP ------------------------------- //


    // ------------------------------- Get User By Email ------------------------------- //

    static async getUserByEmail({ email }) {

        const getUser = await registers.findOne({
            where: {
                email
            }
        });

        return getUser;
    };

    // ------------------------------- End Get User By Email ------------------------------- //


    // ------------------------------- Handle Register ------------------------------- //

    static async handleRegister({ name, email, password, otp, otpExpired }) {

        const createdUser = await registers.create({
            name,
            email,
            password,
            otp,
            otpExpired,
            isVerifiedEmail: false
        });

        return createdUser;
    };

    // ------------------------------- End Handle Register ------------------------------- //


    // ------------------------------- Handle Update Register ------------------------------- //

    static async handleUpdateRegister({ id, name }) {

        const updatedRegister = await registers.update({
            name
        }, {
            where: { id }
        });

        return updatedRegister;
    };

    // ------------------------------- End Handle Update Register ------------------------------- //


    // ------------------------------- Handle Verify Email ------------------------------- //

    static async handleVerifyEmail({ otp, email, isVerifiedEmail }) {

        const updatedOTP = await registers.update({
            isVerifiedEmail: !isVerifiedEmail,
        }, {
            where: {
                email, otp
            }
        });

        return updatedOTP;
    };

    // ------------------------------- End Handle Verify Email ------------------------------- //


    // ------------------------------- Handle Resend OTP ------------------------------- //

    static async handleResendOTP({ email, otp, otpExpired }){

        const updatedOTP = await registers.update({
            otp,
            otpExpired
        }, {
            where: {
                email
            }
        });

        return updatedOTP;
    };

    // ------------------------------- End Handle Resend OTP ------------------------------- //


    // ------------------------------- Handle Forgot Password ------------------------------- //

    static async handleForgotPassword({ email, otp, otpExpired }) {
        
        const updatedOTPForgotPassword = await registers.update({
            otp,
            otpExpired
        }, {
            where: {
                email
            }
        });

        return updatedOTPForgotPassword;
    };

    // ------------------------------- End Handle Forgot Password ------------------------------- //


    // ------------------------------- Handle Create Access New Password ------------------------------- //
    
    static async handleAccessNewPassword({ user_id, otp, otpExpired }){

        const createdAccessNewPassword = await users_new_passwords.create({
            user_id,
            otp,
            otpExpired,
            isVerifiedNewPassword: false
        });

        return createdAccessNewPassword;
    };
    
    // ------------------------------- End Handle Create Access New Password ------------------------------- //


    // ------------------------------- Handle Update Access New Password ------------------------------- //
    
    static async handleUpdateAccessNewPassword({ user_id }){

        const updatedAccessNewPassword = await users_new_passwords.update({
            user_id,
        },{
            where:{ user_id }
        });

        return updatedAccessNewPassword;
    };
    
    // ------------------------------- End Handle Update Access New Password ------------------------------- //


    // ------------------------------- Handle Verify New Passsword ------------------------------- //
    
    static async handleVerifyNewPassword({ user_id }){

        const updatedIsVerifiedNewPassword = await users_new_passwords.update({
            isVerifiedNewPassword: true
        }, {
            where: {
                user_id
            }
        });

        return updatedIsVerifiedNewPassword;
    };
    
    // ------------------------------- End Handle Verify New Passsword ------------------------------- //


    // ------------------------------- Handle Forgot Password Resend OTP ------------------------------- //

    static async handleForgotPasswordResendOTP({ email, otp, otpExpired }){

        const updatedOTP = await registers.update({
            otp,
            otpExpired
        }, {
            where: {
                email
            }
        });

        return updatedOTP;
    };

    // ------------------------------- End Handle Forgot Password Resend OTP ------------------------------- //


    // ------------------------------- Get User By OTP ------------------------------- //

    static async handleGetUserByOTP({ otp }) {

        const getUserByOTP = await registers.findOne({
            where: {
                otp
            }
        });

        return getUserByOTP;
    };

    // ------------------------------- End Get User By OTP ------------------------------- //


    // ------------------------------- Handle Reset Password ------------------------------- //

    static async handleResetPassword({ otp, password }) {

        const updatedPassword = await registers.update({
            password
        }, {
            where: {
                otp
            }
        });

        return updatedPassword;
    };

    // ------------------------------- End Handle Reset Password ------------------------------- //


    // ------------------------------- Handle Reset New Password ------------------------------- //

    static async handleResetNewPassword({ user_id, password }) {

        const updatedPassword = await users_new_passwords.update({
            new_password: password
        }, {
            where: {
                user_id
            }
        });

        return updatedPassword;
    };

    // ------------------------------- End Handle Reset New Password ------------------------------- //


    // ------------------------------- Handle Check user_id in users_new_pass ------------------------------- //

    static async handleCheckUserId({ user_id }) {

        const getUserNewPassword = await users_new_passwords.findOne({
            where: {
                user_id
            }
        });

        return getUserNewPassword;
    };

    // ------------------------------- End Handle Check user_id in users_new_pass ------------------------------- //


    // ------------------------------- Handle Register Update Role ------------------------------- //

    static async handleRegisterUpdateRole({ id, role }) {
        const updatedRole = await registers.update({
            role
        }, {
            where: {
                id
            }
        });

        return updatedRole;
    };

    // ------------------------------- End Handle Register Update Role ------------------------------- //
    
};

module.exports = AuthRepository;