var newOTP = require('otp-generators');

const LENGTH_OTP = 3;
const generatedOTP = () => {
    let otp = "";

    while(otp.length < LENGTH_OTP){
        const res = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false });
        otp = res.toString();

    }
    return otp;

};

module.exports = {
    generatedOTP,
};
