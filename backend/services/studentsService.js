const userRepository = require('../repositories/usersRepository');
const authRepository = require('../repositories/authRepository');
const studentsRepository = require('../repositories/studentsRepository');
const { ROLES } = require('../helper/role');

class StudentsService {

    // ------------------------- Handle Student Biodata1 (Service) ------------------------- //

    static async handleStudentsBiodataSection1({
        user_id,
        username,
        gender,
        date_of_birth,
        no_handphone
    }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!username) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Username Wajib Diisi",
                    data: {
                        student_biodata: null,
                    }
                };
            }

            if (!gender) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Gender Wajib Diisi",
                    data: {
                        student_biodata: null,
                    }
                };
            }

            if (!date_of_birth) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Tanggal Lahir Wajib Diisi",
                    data: {
                        student_biodata: null,
                    }
                };
            }

            if (!no_handphone) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Telepon Wajib Diisi",
                    data: {
                        student_biodata: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getUserById = await userRepository.handleGetUserById({ id: user_id })

            if (!getUserById) {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan",
                    data: {
                        student_biodata: null,
                    }
                }
            } else {

                const updatedRole = await authRepository.handleRegisterUpdateRole({
                    id: user_id,
                    role: ROLES.STUDENT
                })

                const createdStudentBiodata1 = await studentsRepository.handleStudentsBiodataSection1({ user_id, username, gender, date_of_birth, no_handphone });

                return {
                    status: true,
                    status_code: 201,
                    message: "Student dan Role berhasil ditambahkan",
                    data: {
                        student_biodata: createdStudentBiodata1,
                        updated_role: updatedRole
                    }
                }
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    student_biodata: null,
                },
            };
        }
    };
    // ------------------------- End Handle Student Biodata1 (Service) ------------------------- //


    // ------------------------- Handle Student Biodata2 (Service) ------------------------- //

    static async handleStudentsBiodataSection2({
        user_id,
        address,
        pin_point,
    }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!address) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Alamat Wajib Diisi",
                    data: {
                        student_biodata: null,
                    }
                };
            }

            if (!pin_point) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Pin Point Wajib Diisi",
                    data: {
                        student_biodata: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getStudentById = await studentsRepository.getStudentById({ user_id });

            if (getStudentById.user_id == user_id) {

                const udpatedStudentsBiodataSection2 = await studentsRepository.handleStudentsBiodataSection2({
                    user_id,
                    address,
                    pin_point
                })

                return {
                    status: true,
                    status_code: 201,
                    message: "Student Biodata Section 2 berhasil ditambahkan",
                    data: {
                        student_biodata: udpatedStudentsBiodataSection2,
                    }
                }
            } else {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan",
                    data: {
                        student_biodata: null,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    student_biodata: null,
                }
            };
        }
    };
    // ------------------------- End Handle Student Biodata2 (Service) ------------------------- //


    // ------------------------- Handle Student Biodata3 (Service) ------------------------- //

    static async handleStudentsBiodataSection3({
        user_id,
        school_name,
        student_class,
        school_major
    }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!school_name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nama Sekolah Wajib Diisi",
                    data: {
                        student_biodata: null,
                    }
                };
            }

            if (!student_class) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Kelas Wajib Diisi",
                    data: {
                        student_biodata: null,
                    }
                };
            }

            if (!school_major) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Jurusan Wajib Diisi",
                    data: {
                        student_biodata: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getStudentById = await studentsRepository.getStudentById({ user_id });

            if (getStudentById.user_id == user_id) {

                const udpatedStudentsBiodataSection3 = await studentsRepository.handleStudentsBiodataSection3({
                    user_id,
                    school_name,
                    student_class,
                    school_major
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Student Biodata 3 berhasil ditambahkan",
                    data: {
                        student_biodata: udpatedStudentsBiodataSection3,
                    }
                };
            } else {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan",
                    data: {
                        student_biodata: null,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    student_biodata: null,
                }
            };
        }
    };

    // ------------------------- End Handle Student Biodata3 (Service) ------------------------- //


    // ------------------------------- Handle Update Data Students (Service) ------------------------------- //

    static async handleUpdateDataStudentsByUserId({
        id,
        user_id,
        name,
        username,
        gender,
        date_of_birth,
        no_handphone,
        address,
        pin_point,
        student_class,
        school_major,
        url_picture
    }) {

        try {

            const getUserById = await userRepository.handleGetStudentsById({ id });

            if (!name) {
                name = getUserById.register.name;
            }

            if (!username) {
                username = getUserById.username;
            }

            if (!gender) {
                gender = getUserById.gender;
            }

            if (!date_of_birth) {
                date_of_birth = getUserById.date_of_birth;
            }

            if (!no_handphone) {
                no_handphone = getUserById.no_handphone;
            }

            if (!address) {
                address = getUserById.address;
            }

            if (!pin_point) {
                pin_point = getUserById.pin_point;
            }

            if (!student_class) {
                student_class = getUserById.student_class;
            }
            
            if (!school_major) {
                school_major = getUserById.school_major;
            }

            if (!url_picture) {
                url_picture = getUserById.url_picture;
            }


            if (getUserById.user_id == user_id) {

                const updatedDataStudent = await studentsRepository.handleUpdateDataStudentsByUserId({
                    user_id,
                    username,
                    gender,
                    date_of_birth,
                    no_handphone,
                    address,
                    pin_point,
                    student_class,
                    school_major,
                    url_picture
                });

                const updatedNameStudentRegister = await authRepository.handleUpdateRegister({ id, name });

                return {
                    status: true,
                    status_code: 201,
                    message: "Data Student Berhasil Diubah!",
                    data: {
                        updated_student: updatedDataStudent,
                        updated_student_register: updatedNameStudentRegister,
                    }
                };

            }

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    student_biodata: null,
                }
            };
        }

    };

    // ------------------------------- End Handle Update Data Students (Service) ------------------------------- //

};

module.exports = StudentsService;