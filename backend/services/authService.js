const authRepository = require('../repositories/authRepository');
const userRepository = require('../repositories/usersRepository');

const bcrypt = require('bcrypt');

const { sendEmailVerification, sendEmailForgotPassword } = require("../helper/nodemailer");

const userDateNowGenerator = require("../helper/userDateNowGenerator");

const SALT_ROUND = 10;
class AuthService {

    // ------------------------------- Auth Register ------------------------------- //

    static async handleRegister({ name, email, password, otp, otpExpired }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nama Wajib Diisi",
                    data: {
                        registered_user: null,
                    }
                };
            }

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email Wajib Diisi",
                    data: {
                        registered_user: null,
                    }
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password Wajib Diisi",
                    data: {
                        registered_user: null,
                    }
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password Minimal 8 Karakter",
                    data: {
                        registered_user: null,
                    }
                };

            }

            const getUserByEmail = await authRepository.getUserByEmail({ email: email });

            if (getUserByEmail) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email Sudah Digunakan",
                    data: {
                        registered_user: null,
                    }
                };
            } else {
                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

                const createdUser = await authRepository.handleRegister({
                    name,
                    email,
                    password: hashedPassword,
                    otp,
                    otpExpired
                });

                const emailTemplates = {
                    from: 'YukPrivate',
                    to: email,
                    subject: 'Verifikasi Email YukPrivate Kamu!',
                    html:
                        `
                            <body>
                                <section style="padding: 4% 8%;">

                                    <img 
                                        src="https://res.cloudinary.com/dbplhgttm/image/upload/v1665846144/logo-yukprivate_t4ows4.png" 
                                        alt="logo-yukprivate"
                                        width="60"
                                        heigth="auto"
                                    />
                                    
                                    <div class="content"
                                        style="
                                        padding:2%; 
                                        justify-content: center;
                                        background-color: #EEF2E6;
                                        border: 2px solid #5F7161;"
                                    >
                                        
                                        <h2 style="color: #000; text-decoration: none;"> Halo ${createdUser.email}, </h2>
                                        
                                        <p style="text-align: center; font-size: 16px; color: #000; margin-top: 16px;">
                                            Untuk verifikasi email akun YukPrivate kamu, masukkan OTP di bawah ini.
                                        </p>
                                        
                                        <p class="otp"
                                            style="
                                            text-align: center; 
                                            font-size: 20px;
                                            font-weight: 600;
                                            padding: 2%;
                                            background-color: #8FBDD3;
                                            color: #fff;
                                            width: 30%;
                                            display: block;
                                            margin: 0 auto;"
                                        > 
                                            ${otp} 
                                        </p>

                                        <p style="text-align: center; font-size: 16px; color: #000;"> 
                                            Jika kamu tidak meminta verifikasi email, silakan abaikan email ini.
                                        </p>
                                    </div>
                                </section>    
                            </body>
                    `
                };

                sendEmailVerification(emailTemplates);

                return {
                    status: true,
                    status_code: 201,
                    message: "Berhasi Mendaftarkan User!",
                    data: {
                        registered_user: createdUser,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registered_user: null,
                },
            };
        }
    };

    // ------------------------------- End Auth Register ------------------------------- //


    // ------------------------------- Verify Email ------------------------------- //

    static async handleVerifyEmail({ otp, email, isVerifiedEmail, otpExpired }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!otp) {
                return {
                    status: false,
                    status_code: 400,
                    message: "OTP Wajib Diisi",
                    data: {
                        verified_email: null,
                    }
                };
            }

            const getUserByEmail = await authRepository.getUserByEmail({ email });

            if (getUserByEmail.otp == otp && userDateNowGenerator.userDateNow() <= getUserByEmail.otpExpired) {

                const updatedVerifyEmail = await authRepository.handleVerifyEmail({ otp, email, isVerifiedEmail });

                const resetedOTP = await authRepository.handleResetOTP({ otp, otpExpired })

                return {
                    status: true,
                    status_code: 201,
                    message: "Email Telah Terverifikasi!",
                    data: {
                        verified_email: updatedVerifyEmail,
                        reset_otp: resetedOTP
                    }
                };
            } else if (getUserByEmail.otp == otp && userDateNowGenerator.userDateNow() >= getUserByEmail.otpExpired){

                return {
                    status: false,
                    status_code: 400,
                    message: "OTP telah expired, silahkan untuk meminta ulang OTP",
                    data: {
                        verified_new_password: null,
                    },
                };

            } else {
                
                return {
                    status: false,
                    status_code: 400,
                    message: "OTP Tidak Cocok",
                    data: {
                        verified_email: null,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    verified_email: null,
                },
            };
        }
    };

    // ------------------------------- End Verify Email ------------------------------- //


    // ------------------------------- Resend OTP ------------------------------- //

    static async handleResendOTP({ email, otp, otpExpired }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email Wajib Diisi",
                    data: {
                        resend_otp: null,
                    }
                };
            }

            const getUserByEmail = await authRepository.getUserByEmail({ email });

            const emailTemplates = {
                from: 'YukPrivate',
                to: email,
                subject: 'Verifikasi Email YukPrivate Kamu!',
                html:
                    `
                        <body>
                        
                            <section style="padding: 4% 8%;">

                                <img 
                                    src="https://res.cloudinary.com/dbplhgttm/image/upload/v1665846144/logo-yukprivate_t4ows4.png" 
                                    alt="logo-yukprivate"
                                    width="60"
                                    heigth="auto"
                                />
                                
                                <div class="content"
                                    style="
                                    padding:2%; 
                                    justify-content: center;
                                    background-color: #EEF2E6;
                                    border: 2px solid #5F7161;"
                                >
                                    
                                    <h2 style="color: #000; text-decoration: none;"> Halo ${getUserByEmail.email}, </h2>
                                    
                                    <p style="text-align: center; font-size: 16px; color: #000; margin-top: 16px;">
                                    Untuk mengkonfirmasi permintaan kirim ulang OTP verifikasi email akun YukPrivate kamu, masukkan OTP di bawah ini.
                                    </p>
                                    
                                    <p  class="otp" 
                                        style="
                                        text-align: center; 
                                        font-size: 20px;
                                        font-weight: 600;
                                        padding: 2%;
                                        background-color: #8FBDD3;
                                        color: #fff;
                                        width: 30%;
                                        display: block;
                                        margin: 0 auto;"
                                    > 
                                        ${otp} 
                                    </p>

                                    <p style="text-align: center; font-size: 16px; color: #000;"> 
                                        Jika kamu tidak meminta kirim ulang OTP verifikasi email, silakan abaikan email ini.
                                    </p>

                                </div>

                            </section>    

                        </body>
                `
            };

            sendEmailVerification(emailTemplates);

            const updatedOTP = await authRepository.handleResendOTP({ email, otp, otpExpired });

            if (!updatedOTP) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Gagal Mengirim Kembali OTP",
                    data: {
                        resend_otp: null,
                    }
                };
            } else {
                return {
                    status: true,
                    status_code: 201,
                    message: "Berhasil Mengirim Kembali OTP",
                    data: {
                        resend_otp: updatedOTP,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    resend_otp: null,
                },
            };
        }
    };

    // ------------------------------- End Resend OTP ------------------------------- //


    // ------------------------------- Handle Forgot Password ------------------------------- //

    static async handleForgotPassword({ email, otp, otpExpired }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email Wajib Diisi",
                    data: {
                        forgot_password: null,
                    }
                };
            }

            const getUserByEmail = await authRepository.getUserByEmail({ email });

            console.log(getUserByEmail.email);

            if (!getUserByEmail) {
                return {
                    status: false,
                    statusCode: 404,
                    message: "Email Belum Terdaftar",
                    data: {
                        forgot_password: null,
                    },
                };
            } else {

                /* --------------------------- Updated OTP Forgot Password--------------------------- */
                const updatedOTPForgotPassword = await authRepository.handleForgotPassword({ email, otp, otpExpired });

                const user_id = getUserByEmail.id;

                const emailTemplates = {
                    from: 'YukPrivate',
                    to: email,
                    subject: 'Konfirmasi Reset Password Akun YukPrivate Kamu!',
                    html:
                        `
                                <body>

                                    <section style="padding: 4% 8%;">

                                        <img 
                                            src="https://res.cloudinary.com/dbplhgttm/image/upload/v1665846144/logo-yukprivate_t4ows4.png" 
                                            alt="logo-yukprivate"
                                            width="60"
                                            heigth="auto"
                                        />
                                        
                                        <div class="content" 
                                            style="
                                            padding:2%; 
                                            justify-content: center;
                                            background-color: #EEF2E6;
                                            border: 2px solid #5F7161;"
                                        >
                                            
                                            <h2 style="color: #000; text-decoration: none;"> Halo ${getUserByEmail.email}, </h2>
                                            
                                            <p style="text-align: center; font-size: 16px; color: #000; margin-top: 16px;">
                                                Untuk mengkonfirmasi permintaan reset password akun YukPrivate kamu, masukkan OTP di bawah ini.
                                            </p>
                                            
                                            <p  class="otp" 
                                                style="
                                                text-align: center; 
                                                font-size: 20px;
                                                font-weight: 600;
                                                padding: 2%;
                                                background-color: #8FBDD3;
                                                color: #fff;
                                                width: 30%;
                                                display: block;
                                                margin: 0 auto;"
                                            > 
                                                ${otp} 
                                            </p>

                                            <p style="text-align: center; font-size: 16px; color: #000;"> 
                                                Jika kamu tidak meminta reset password, silakan abaikan email ini.
                                            </p>

                                        </div>

                                    </section>    

                                </body>
                        `
                };

                sendEmailForgotPassword(emailTemplates);

                /* --------------------------- Created Forgot Password To New Password --------------------------- */
                const getDataForgotPassword = await authRepository.handleCheckUserId({ user_id });

                if(getDataForgotPassword){
                    const updatedAccessNewPassword = await authRepository.handleUpdateAccessNewPassword({ user_id });

                    return {
                        status: true,
                        status_code: 201,
                        message: "OTP Reset Password Terkirim Ke Email User!",
                        data: {
                            update_access_new_password: updatedAccessNewPassword,
                            forgot_password: updatedOTPForgotPassword
                        }
                    };
                } else {
                    const createdAccessNewPassword = await authRepository.handleAccessNewPassword({ user_id });
                    
                    return {
                        status: true,
                        status_code: 201,
                        message: "OTP Reset Password Terkirim Ke Email User!",
                        data: {
                            access_new_password: createdAccessNewPassword,
                            forgot_password: updatedOTPForgotPassword
                        }
                    };
                }
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    forgot_password: null,
                    access_new_password: null
                },
            };
        }
    };

    // ------------------------------- End Handle Forgot Password ------------------------------- //


    // ------------------------------- Handle Verify Forgot Password ------------------------------- //

    static async handleVerifyForgotPassword({ otp, email, isVerifiedNewPassword, otpExpired }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!otp) {
                return {
                    status: false,
                    status_code: 400,
                    message: "OTP Wajib Diisi",
                    data: {
                        verified_new_password: null,
                    }
                };
            }

            // Check User By Email
            const getUserByEmail = await authRepository.getUserByEmail({ email });

            if (!getUserByEmail) {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan!",
                    data: {
                        verified_new_password: null,
                    }
                };
            } else if (getUserByEmail.otp == otp && userDateNowGenerator.userDateNow() <= getUserByEmail.otpExpired) {

                const user_id = getUserByEmail.id;

                const updatedVerifyNewPassword = await authRepository.handleVerifyNewPassword({ user_id, isVerifiedNewPassword });

                return {
                    status: true,
                    status_code: 201,
                    message: "Forgot Password Telah Terverifikasi! Silahkan Reset Password Anda!",
                    data: {
                        verified_new_password: updatedVerifyNewPassword,
                    }
                };
            } else if (getUserByEmail.otp == otp && userDateNowGenerator.userDateNow() >= getUserByEmail.otpExpired) {
                return {
                    status: false,
                    status_code: 400,
                    message: "OTP telah expired, silahkan untuk meminta ulang OTP",
                    data: {
                        verified_new_password: null,
                    },
                };
            } else if (getUserByEmail.otp != otp) {
                return {
                    status: false,
                    status_code: 400,
                    message: "OTP tidak cocok",
                    data: {
                        verified_new_password: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    verified_new_password: null,
                },
            };
        }
    };

    // ------------------------------- End Handle Verify Forgot Password ------------------------------- //


    // ------------------------------- Handle Forgot Password Resend OTP ------------------------------- //
    
    static async handleForgotPasswordResendOTP({ email, otp, otpExpired }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email Wajib Diisi",
                    data: {
                        resend_otp: null,
                    }
                };
            }

            const getUserByEmail = await authRepository.getUserByEmail({ email });

            const emailTemplates = {
                from: 'YukPrivate',
                to: email,
                subject: 'Konfirmasi Reset Password Akun YukPrivate Kamu!',
                html:
                    `
                        <body>

                            <section style="padding: 4% 8%;">

                                <img 
                                    src="https://res.cloudinary.com/dbplhgttm/image/upload/v1665846144/logo-yukprivate_t4ows4.png" 
                                    alt="logo-yukprivate"
                                    width="60"
                                    heigth="auto"
                                />
                                    
                                <div class="content" 
                                    style="
                                    padding:2%; 
                                    justify-content: center;
                                    background-color: #EEF2E6;
                                    border: 2px solid #5F7161;"
                                >
                                        
                                    <h2 style="color: #000; text-decoration: none;"> Halo ${getUserByEmail.email}, </h2>
                                        
                                    <p style="text-align: center; font-size: 16px; color: #000; margin-top: 16px;">
                                        Untuk mengkonfirmasi permintaan kirim ulang OTP reset password akun YukPrivate kamu, masukkan OTP di bawah ini.
                                    </p>
                                        
                                    <p  class="otp" 
                                        style="
                                        text-align: center; 
                                        font-size: 20px;
                                        font-weight: 600;
                                        padding: 2%;
                                        background-color: #8FBDD3;
                                        color: #fff;
                                        width: 30%;
                                        display: block;
                                        margin: 0 auto;"
                                    > 
                                        ${otp} 
                                    </p>

                                    <p style="text-align: center; font-size: 16px; color: #000;"> 
                                        Jika kamu tidak meminta kirim ulang OTP reset password, silakan abaikan email ini.
                                    </p>

                                </div>

                            </section>    

                        </body>
                    `
            };

            sendEmailVerification(emailTemplates);

            const updatedOTP = await authRepository.handleForgotPasswordResendOTP({ email, otp, otpExpired });

            if (!updatedOTP) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Gagal Mengirim Kembali OTP",
                    data: {
                        resend_otp: null,
                    }
                };
            } else {
                return {
                    status: true,
                    status_code: 201,
                    message: "Berhasil Mengirim Kembali OTP",
                    data: {
                        resend_otp: updatedOTP,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    resend_otp: null,
                },
            };
        }
    };
    
    // ------------------------------- End Handle Forgot Password Resend OTP ------------------------------- //


    // ------------------------------- Handle Reset Password ------------------------------- //

    static async handleResetPassword({ otp, password, otpExpired }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!otp) {
                return {
                    status: false,
                    status_code: 400,
                    message: "OTP wajib diisi",
                    data: {
                        reset_password: null,
                    }
                }
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password Wajib Diisi",
                    data: {
                        reset_password: null,
                    }
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password Minimal 8 Karakter",
                    data: {
                        reset_password: null,
                    }
                };
            }

            const getUserByOTP = await authRepository.handleGetUserByOTP({ otp });

            if (getUserByOTP.otp == otp) {
                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

                const user_id = getUserByOTP.id;
                const resetedNewPassword = await authRepository.handleResetNewPassword({
                    user_id,
                    password: hashedPassword
                })

                const updatedPassword = await authRepository.handleResetPassword({
                    otp,
                    password: hashedPassword
                });

                const resetedOTP = await authRepository.handleResetOTP({ otp, otpExpired });

                return {
                    status: true,
                    status_code: 201,
                    message: "User berhasil mengganti password",
                    data: {
                        reset_password: resetedNewPassword,
                        update_password: updatedPassword,
                        reset_otp: resetedOTP
                    }
                };
            } else {
                return {
                    status: false,
                    status_code: 400,
                    message: "OTP tidak cocok",
                    data: {
                        reset_password: null,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    reset_password: null,
                },
            };
        }
    };

    // ------------------------------- End Handle Reset Password ------------------------------- //

};

module.exports = AuthService;