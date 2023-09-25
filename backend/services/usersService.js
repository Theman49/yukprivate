const usersRepository = require("../repositories/usersRepository");
const authRepository = require("../repositories/authRepository");
const { generatedTentorSchedules } = require("../helper/generateTentorSchedules");
const bcrypt = require('bcrypt');

const SALT_ROUND = 10;
class UsersService {

    // ------------------------- Handle Get User By Id (Service) ------------------------- //

    static async handleGetUserById({ id }) {

        try {
            const getUserById = await usersRepository.handleGetUserById({ id });


            if (getUserById.id == id) {
                return {
                    status: true,
                    status_code: 200,
                    message: "Sukses untuk mendapatkan data user",
                    data: {
                        user_by_id: getUserById,
                    },
                };
            }


        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    user_by_id: null,
                },
            };
        }
    }

    // ------------------------- End Handle Get User By Id (Service) ------------------------- //


    // ------------------------- Handle Get Student By Id (Service) ------------------------- //

    static async handleGetStudentsById({ id }) {

        try {
            const getStudentsById = await usersRepository.handleGetStudentsById({ id });

            if (getStudentsById) {
                return {
                    status: true,
                    status_code: 200,
                    message: "Success get students by id.",
                    data: {
                        students_by_id: getStudentsById,
                    },
                };
            }

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    students_by_id: null,
                },
            };
        }
    };

    // ------------------------- End Handle Get Student By Id (Service) ------------------------- //


    // ------------------------- Handle Get Tentor By Id After Login (Service) ------------------------- //

    static async handleGetTentorsByIdAfterLogin({ id }) {

        try {

            const getTentorsById = await usersRepository.handleGetTentorsByIdAfterLogin({ id });

            return {
                status: true,
                status_code: 200,
                message: "Success get tentors by id.",
                data: {
                    tentors_by_id: getTentorsById,
                },
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentors_by_id: null,
                },
            };
        }
    };

    // ------------------------- End Handle Get Tentor By Id After (Service) ------------------------- //


    // ------------------------- Handle Get Tentor By Id Before Login (Service) ------------------------- //

    static async handleGetTentorByIdBeforeLogin({ id }) {

        try {

            const getTentorsById = await usersRepository.handleGetTentorByIdBeforeLogin({ id });

            const getSchedules = getTentorsById.dataValues.tentor_schedules.map(item => item.dataValues)

            return {
                status: true,
                status_code: 200,
                message: "Success get tentors by id.",
                data: {
                    tentors_by_id: getTentorsById,
                    generated_tentor_schedules: generatedTentorSchedules(getSchedules)
                },
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentors_by_id: null,
                },
            };
        }
    };

    // ------------------------- End Handle Get Tentor By Id Before Login (Service) ------------------------- //


    // ------------------------------- Handle Get All Tentors ------------------------------- //

    static async handleGetAllTentors({ address, course_interest }) {

        try {

            const getAllTentors = await usersRepository.handleGetAllTentors({ address, course_interest });

            return {
                status: true,
                status_code: 200,
                message: "Berhasil Mendapatkan Semua Tentor",
                data: {
                    get_all_tentors: getAllTentors,
                },
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    get_all_tentors: null,
                },
            };
        }
    };

    // ------------------------------- End Handle Get All Tentors ------------------------------- //

    // ------------------------------- Handle Update Students Reset Password (Service) ------------------------------- //

    static async handleUsersChangePassword({ email, password }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email wajib diisi",
                    data: {
                        updated_user_password: null,
                    }
                }
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password Wajib Diisi",
                    data: {
                        updated_user_password: null,
                    }
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password Minimal 8 Karakter",
                    data: {
                        updated_user_password: null,
                    }
                };
            }

            const getUserByEmail = await authRepository.getUserByEmail({ email });

            if (getUserByEmail.email == email){
                
                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

                const updatedUserPassword = await usersRepository.handleUsersChangePassword({
                    email,
                    password: hashedPassword
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "User berhasil mengganti password",
                    data: {
                        updated_user_password: updatedUserPassword,
                    }
                };
            }
            
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updated_user_password: null,
                }
            };
        }
    };

    // ------------------------------- End Handle Update Students Reset Password (Service) ------------------------------- //

};

module.exports = UsersService;