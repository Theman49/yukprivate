const authRepository = require('../repositories/authRepository');
const jwt = require("jsonwebtoken");
const { JWT } = require("../helper/jwtSecurity");
const bcrypt = require("bcrypt");
const { sendEmailVerification, sendEmailForgotPassword } = require("../helper/nodemailer");
const { OAuth2Client } = require("google-auth-library");

class LoginService {

    // ------------------------------- Handle Login ------------------------------- //

    static async handleLogin({ email, password }) {

        try {

            // ------------------------- Payload Validation ------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email Wajib Diisi",
                    data: {
                        login_user: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password Wajib Diisi",
                    data: {
                        user_login: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password Minimal 8 Karakter",
                    data: {
                        user_login: null,
                    },
                };
            }

            const getUserByEmail = await authRepository.getUserByEmail({ email });

            if (!getUserByEmail) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Email Belum Terdaftar",
                    data: {
                        user_login: null,
                    },
                };
            } else {

                const isPasswordMatch = await bcrypt.compare(password, getUserByEmail.password);

                if (isPasswordMatch) {
                    const token = jwt.sign({
                        id: getUserByEmail.id,
                        email: getUserByEmail.email,
                    },
                        JWT.SECRET,
                        {
                            expiresIn: JWT.EXPIRED,
                        });

                    return {
                        status: true,
                        status_code: 201,
                        message: "User Berhasil Login",
                        data: {
                            token,
                            role: getUserByEmail.role
                        },
                    };
                } else {
                    return {
                        status: false,
                        status_code: 400,
                        message: "Email atau Password Anda Salah",
                        data: {
                            user_login: null,
                        },
                    };
                }
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    user_login: null,
                },
            };
        }
    };

    // ------------------------------- End Handle Login ------------------------------- //


    // ------------------------------- Handle Login With Google ------------------------------- //

    static async handleLoginGoogle({ google_credential: googleCredential, otp, otpExpired }) {

        try {

            // Get google user credential
            const client = new OAuth2Client(
                "91634822664-348hrorr67bbrp2tcnnemg9cmepc3hki.apps.googleusercontent.com"
            );

            const userInfo = await client.verifyIdToken({
                idToken: googleCredential,
                audience:
                    "91634822664-348hrorr67bbrp2tcnnemg9cmepc3hki.apps.googleusercontent.com",
            });


            const { email, name } = userInfo.payload;

            const getUserByEmail = await authRepository.getUserByEmail({ email: email });

            if (!getUserByEmail) {

                const createdUser = await authRepository.handleRegister({
                    name,
                    email,
                    otp,
                    otpExpired
                });

                const token = jwt.sign({
                    id: createdUser.id,
                    email: createdUser.email,
                },
                    JWT.SECRET,
                    {
                        expiresIn: JWT.EXPIRED,
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
                        token,
                        login_google: createdUser,
                    }
                };

            } else {

                const token = jwt.sign({
                    id: getUserByEmail.id,
                    email: getUserByEmail.email,
                },
                    JWT.SECRET,
                    {
                        expiresIn: JWT.EXPIRED,
                    });

                return {
                    status: true,
                    status_code: 201,
                    message: "User Berhasil Login!",
                    data: {
                        token,
                        role: getUserByEmail.role
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

    // ------------------------------- End Handle Login With Google ------------------------------- //

};

module.exports = LoginService;