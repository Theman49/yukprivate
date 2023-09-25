const loginService = require("../services/loginService");
const { generatedOTP } = require("../helper/otpGenerator");
const otpExpiredGenerator = require("../helper/otpExpiredGenerator");

// ------------------------------- Handle Login ------------------------------- //

const handleLogin = async(req, res) => {

    const { email, password } = req.body;

    const {status, status_code, message, data} = await loginService.handleLogin({
        email,
        password,
    });

    res.status(status_code).send({
        status : status,
        message: message,
        data : data,
    });

};

// ------------------------------- End Handle Login ------------------------------- //


// ------------------------------- Handle Current User ------------------------------- //

const handleCurrentUser = async (req, res) => {
    
    const currentUser = req.user;

    res.status(200).send({
        status: true,
        message: "Data User Yang Login Berhasil Didapatkan!",
        data: {
            current_user: currentUser,
        },
    });
};

// ------------------------------- End Handle Current User ------------------------------- //


// ------------------------------- Handle Login With Google ------------------------------- //

const handleLoginGoogle = async (req, res) => {

    const { google_credential } = req.body;

    const { status, status_code, message, data } = await loginService.handleLoginGoogle({ 
        // name: req.user_name, 
        // email: req.user_email,
        google_credential,
        otp: generatedOTP(),
        otpExpired: otpExpiredGenerator.expiredTime()
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------------- End Handle Login With Google ------------------------------- //

module.exports = { 
    handleLogin, 
    handleCurrentUser,
    handleLoginGoogle
};