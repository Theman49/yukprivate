const userRepository = require('../repositories/usersRepository');
const authRepository = require('../repositories/authRepository');
const tentorsRepository = require('../repositories/tentorsRepository');
const usersRepository = require('../repositories/usersRepository');
const { ROLES } = require('../helper/role');
const fileRemove = require('../helper/fileRemove');
const bcrypt = require('bcrypt');
const reviewsRepository = require('../repositories/reviewsRepository');

const SALT_ROUND = 10;

class TentorsService {

    // ------------------------- Handle Tentor Biodata1 (Service) ------------------------- //

    static async handleTentorsBiodataSection1({
        id,
        tentor_id,
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
                        tentor_biodata: null,
                    }
                };
            }

            if (!gender) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Gender Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!date_of_birth) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Tanggal Lahir Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!no_handphone) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Telepon Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getUserById = await userRepository.handleGetUserById({ id: tentor_id });

            if (!getUserById) {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan",
                    data: {
                        tentor_biodata: null,
                    }
                }
            } else {

                const updatedRole = await authRepository.handleRegisterUpdateRole({
                    id: tentor_id,
                    role: ROLES.TENTOR
                });

                const createdTentorBiodata1 = await tentorsRepository.handleTentorsBiodataSection1({
                    id,
                    tentor_id,
                    username,
                    gender,
                    date_of_birth,
                    no_handphone
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Tentor dan Role berhasil ditambahkan",
                    data: {
                        tentor_biodata: createdTentorBiodata1,
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
                    tentor_biodata: null,
                }
            };
        }
    };

    // ------------------------- End Handle Tentor Biodata1 (Service) ------------------------- //


    // ------------------------- Handle Tentor Biodata2 (Service) ------------------------- //

    static async handleTentorsBiodataSection2({
        tentor_id,
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
                        tentor_biodata: null,
                    }
                };
            }

            if (!pin_point) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Pin Point Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getTentorById = await tentorsRepository.getTentorById({ tentor_id });

            if (!getTentorById) {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan",
                    data: {
                        tentor_biodata: null,
                    }
                };
            } else {
                const udpatedTentorsBiodataSection2 = await tentorsRepository.handleTentorsBiodataSection2({
                    tentor_id,
                    address,
                    pin_point
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Tentor Biodata Section 2 berhasil ditambahkan",
                    data: {
                        tentor_biodata: udpatedTentorsBiodataSection2,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_biodata: null,
                }
            };
        }
    };

    // ------------------------- End Handle Tentor Biodata2 (Service) ------------------------- //


    // ------------------------- Handle Tentor Biodata3 (Service) ------------------------- //

    static async handleTentorsBiodataSection3({
        tentor_id,
        last_education,
        institution_name,
        tentor_major,
        graduation_year
    }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!last_education) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Pendidikan Terakhir Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!institution_name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nama Instansi Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!tentor_major) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Jurusan Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!graduation_year) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Tahun Lulus Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getTentorById = await tentorsRepository.getTentorById({ tentor_id });

            if (!getTentorById) {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan",
                    data: {
                        tentor_biodata: null,
                    }
                };
            } else {

                const udpatedTentorsBiodataSection3 = await tentorsRepository.handleTentorsBiodataSection3({
                    tentor_id,
                    last_education,
                    institution_name,
                    tentor_major,
                    graduation_year
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Tentor Biodata 3 berhasil ditambahkan",
                    data: {
                        tentor_biodata: udpatedTentorsBiodataSection3,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_biodata: null,
                }
            };
        }
    }

    // ------------------------- End Handle Tentor Biodata3 (Service) ------------------------- //


    // ------------------------- Handle Tentor Biodata4 (Service) ------------------------- //

    static async handleTentorsBiodataSection4({
        tentor_id,
        experience_id,
        teaching_place,
        teaching_role,
        teaching_start_date,
        teaching_end_date,
        isTeaching
    }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!teaching_place) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Pendidikan Terakhir Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!teaching_role) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nama Instansi Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!teaching_start_date) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Jurusan Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!isTeaching) {
                if (!teaching_end_date) {
                    return {
                        status: false,
                        status_code: 400,
                        message: "Tahun Lulus Wajib Diisi",
                        data: {
                            tentor_biodata: null,
                        }
                    };
                }
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getTentorById = await tentorsRepository.getTentorById({ tentor_id });

            if (!getTentorById.tentor_id == tentor_id) {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan",
                    data: {
                        tentor_biodata: null,
                    }
                };
            } else {

                const updatedIdJoin = await tentorsRepository.handleUpdateIdJoin({
                    tentor_id,
                    experience_id
                });

                const createdTentorsBiodataSection4 = await tentorsRepository.handleTentorsBiodataSection4({
                    tentor_id,
                    experience_id,
                    teaching_place,
                    teaching_role,
                    teaching_start_date,
                    teaching_end_date,
                    isTeaching
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Tentor Biodata 4 berhasil ditambahkan",
                    data: {
                        tentor_biodata: createdTentorsBiodataSection4,
                        tentor_update_id_join: updatedIdJoin
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_biodata: null,
                }
            };
        }
    };

    // ------------------------- End Handle Tentor Biodata4 (Service) ------------------------- //


    // ------------------------- Handle Delete Tentor Biodata4 (Service) ------------------------- //

    static async handleDeleteTentorsBiodataSection4({ id, tentor_id }) {

        try {

            const getTentorExperienceById = await tentorsRepository.getTentorExperienceById({ id });

            if (getTentorExperienceById.tentor_id == tentor_id) {

                const deletedTentorsExperienceBiodataSection4 = await tentorsRepository.handleDeleteTentorsBiodataSection4({
                    id,
                    tentor_id
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Tentor Biodata 4 berhasil dihapus",
                    data: {
                        deleted_tentor_biodata: deletedTentorsExperienceBiodataSection4,
                    }
                };

            } else {
                return {
                    status: false,
                    status_code: 401,
                    message: "Data Experience tidak ditemukan",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    deleted_tentor_biodata: null,
                }
            };
        }
    };

    // ------------------------- End Handle Delete Tentor Biodata4 (Service) ------------------------- //


    // ------------------------- Handle Tentor Biodata5 (Service) ------------------------- //

    static async handleTentorsBiodataSection5({
        tentor_id,
        achievement_id,
        achievement_name,
        organizer_name,
        date_of_activity,
        url_certificate
    }) {

        try {
            // ------------------------------- Payload Validation ------------------------------- //

            if (!url_certificate) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Sertifikat Wajib Diunggah",
                    data: {
                        tentor_biodata: null,
                    }
                };
            } else {
                if (!achievement_name) {
                    fileRemove(url_certificate);
                    return {
                        status: false,
                        status_code: 400,
                        message: "Prestasi Wajib Diisi",
                        data: {
                            tentor_biodata: null,
                        }
                    };
                }

                if (!organizer_name) {
                    fileRemove(url_certificate);
                    return {
                        status: false,
                        status_code: 400,
                        message: "Penyelenggara Wajib Diisi",
                        data: {
                            tentor_biodata: null,
                        }
                    };
                }

                if (!date_of_activity) {
                    fileRemove(url_certificate);
                    return {
                        status: false,
                        status_code: 400,
                        message: "Tanggal Aktivitas Wajib Diisi",
                        data: {
                            tentor_biodata: null,
                        }
                    };
                }
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getTentorById = await tentorsRepository.getTentorById({ tentor_id });

            if (!getTentorById.tentor_id == tentor_id) {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan",
                    data: {
                        tentor_biodata: null,
                    }
                };
            } else {
                const updatedIdJoin = await tentorsRepository.handleUpdateIdJoin({
                    tentor_id,
                    achievement_id
                });

                const createdTentorsBiodataSection5 = await tentorsRepository.handleTentorsBiodataSection5({
                    tentor_id,
                    achievement_id,
                    achievement_name,
                    organizer_name,
                    date_of_activity,
                    url_certificate
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Tentor Biodata 5 berhasil ditambahkan",
                    data: {
                        tentor_biodata: createdTentorsBiodataSection5,
                        tentor_update_id_join: updatedIdJoin
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_biodata: null,
                }
            };
        }
    };

    // ------------------------- End Handle Tentor Biodata5 (Service) ------------------------- //


    // ------------------------- Handle Delete Tentor Biodata5 (Service) ------------------------- //

    static async handleDeleteTentorsBiodataSection5({ id, tentor_id }) {

        try {

            const getTentorByUrlCertificate = await tentorsRepository.getTentorByUrlCertificate({ tentor_id });

            if (getTentorByUrlCertificate.id == id) {

                const deletedTentorsBiodataSection5 = await tentorsRepository.handleDeleteTentorsBiodataSection5({
                    id,
                    tentor_id
                });

                fileRemove(getTentorByUrlCertificate.url_certificate);

                return {
                    status: true,
                    status_code: 201,
                    message: "Tentor Biodata 5 berhasil dihapus",
                    data: {
                        deleted_tentor_biodata: deletedTentorsBiodataSection5,
                    }
                };
            } else {
                return {
                    status: false,
                    status_code: 401,
                    message: "Data Prestasi tidak ditemukan",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    deleted_tentor_biodata: null,
                }
            };
        }
    };

    // ------------------------- End Handle Delete Tentor Biodata5 (Service) ------------------------- //


    // ------------------------- Handle Tentor Biodata6 (Service) ------------------------- //

    static async handleTentorsBiodataSection6({
        tentor_id,
        proposal_id,
        tentor_introduction,
        reason_for_registering,
        url_esay
    }) {

        try {
            // ------------------------------- Payload Validation ------------------------------- //

            if (!url_esay) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Esai Wajib Diunggah",
                    data: {
                        tentor_biodata: null,
                    }
                };
            } else {
                if (!tentor_introduction) {
                    fileRemove(url_esay);
                    return {
                        status: false,
                        status_code: 400,
                        message: "Perkenalan Wajib Diisi",
                        data: {
                            tentor_biodata: null,
                        }
                    };
                }

                if (!reason_for_registering) {
                    fileRemove(url_esay);
                    return {
                        status: false,
                        status_code: 400,
                        message: "Alasan Mendaftar Wajib Diisi",
                        data: {
                            tentor_biodata: null,
                        }
                    };
                }
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getTentorById = await tentorsRepository.getTentorById({ tentor_id });

            if (!getTentorById.tentor_id == tentor_id) {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan",
                    data: {
                        tentor_biodata: null,
                    }
                };
            } else {

                const updatedIdJoin = await tentorsRepository.handleUpdateIdJoin({
                    tentor_id,
                    proposal_id
                });

                const createdTentorsBiodataSection6 = await tentorsRepository.handleTentorsBiodataSection6({
                    tentor_id,
                    proposal_id,
                    tentor_introduction,
                    reason_for_registering,
                    url_esay
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Tentor Biodata 6 berhasil ditambahkan",
                    data: {
                        tentor_biodata: createdTentorsBiodataSection6,
                        tentor_update_id_join: updatedIdJoin
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_biodata: null,
                }
            };
        }
    };

    // ------------------------- End Handle Tentor Biodata6 (Service) ------------------------- //


    // ------------------------- Handle Tentor Biodata7Schedule (Service) ------------------------- //

    static async handleTentorsBiodataSection7Schedule({
        tentor_id,
        schedule_id,
        day,
        time,
        duration
    }) {

        try {
            // ------------------------------- Payload Validation ------------------------------- //

            if (!day) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Hari Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!time) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Jam Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!duration) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Durasi Wajib Diisi",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getTentorById = await tentorsRepository.getTentorById({ tentor_id });

            if (!getTentorById.tentor_id == tentor_id) {
                return {
                    status: false,
                    status_code: 400,
                    message: "User tidak ditemukan",
                    data: {
                        tentor_biodata: null,
                    }
                };
            } else {
                const updatedIdJoin = await tentorsRepository.handleUpdateIdJoin({
                    tentor_id,
                    schedule_id
                });

                const createdTentorsBiodataSection7Schedule = await tentorsRepository.handleTentorsBiodataSection7Schedule({
                    tentor_id,
                    schedule_id,
                    day,
                    time,
                    duration
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Tentor Biodata 7 Schedule berhasil ditambahkan",
                    data: {
                        tentor_biodata: createdTentorsBiodataSection7Schedule,
                        tentor_update_id_join: updatedIdJoin
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_biodata: null,
                }
            };
        }
    };
    // ------------------------- End Handle Tentor Biodata7Schedule (Service) ------------------------- //


    // ------------------------- Handle Tentor Biodata Finish (Service) ------------------------- //

    static async handleTentorsBiodataSectionFinish({
        tentor_id,
        course_interest,
        preferences
    }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!course_interest) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Pelajaran Wajib Dipilih",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            if (!preferences) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Preferensi Wajib Dipilih",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getTentorProposalById = await tentorsRepository.getTentorProposalById({ tentor_id });

            if (getTentorProposalById.tentor_id == tentor_id) {

                const createdTentorsBiodataSectionFinish = await tentorsRepository.handleTentorsBiodataSectionFinish({
                    tentor_id,
                    course_interest,
                    preferences
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Tentor Biodata Complete berhasil ditambahkan",
                    data: {
                        tentor_biodata: createdTentorsBiodataSectionFinish,
                    }
                };


            } else {
                return {
                    status: false,
                    status_code: 401,
                    message: "User tidak ditemukan",
                    data: {
                        tentor_biodata: null,
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_biodata: null,
                }
            };
        }
    }

    // ------------------------- End Handle Tentor Biodata Finish (Service) ------------------------- //


    // ------------------------- Handle Update Data Biodata Tentors  (Service) ------------------------------- //

    static async handleUpdateBiodataTentorsByTentorId({
        id,
        tentor_id,
        name,
        username,
        gender,
        date_of_birth,
        no_handphone,
        address,
        pin_point,
        url_picture
    }) {

        try {

            const getTentorById = await tentorsRepository.getTentorById({ tentor_id });

            if (!name) {
                name = getTentorById.registers.name;
            }

            if (!username) {
                username = getTentorById.username;
            }

            if (!gender) {
                gender = getTentorById.gender;
            }

            if (!date_of_birth) {
                date_of_birth = getTentorById.date_of_birth;
            }

            if (!no_handphone) {
                no_handphone = getTentorById.no_handphone;
            }

            if (!address) {
                address = getTentorById.address;
            }

            if (!pin_point) {
                pin_point = getTentorById.pin_point;
            }

            if (!url_picture) {
                url_picture = getTentorById.url_picture;
            }

            if (getTentorById.tentor_id == tentor_id) {

                const updatedDataTentor = await tentorsRepository.handleUpdateBiodataTentorsByTentorId({
                    tentor_id,
                    username,
                    gender,
                    date_of_birth,
                    no_handphone,
                    address,
                    pin_point,
                    url_picture
                });

                const updatedNameTentorRegister = await authRepository.handleUpdateRegister({ id, name });

                return {
                    status: true,
                    status_code: 201,
                    message: "Data Tentor Berhasil Diubah!",
                    data: {
                        updated_tentor: updatedDataTentor,
                        updated_tentor_register: updatedNameTentorRegister,
                    }
                };

            }

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_biodata: null,
                }
            };
        }

    };

    // ------------------------- End Handle Update Data Biodata Tentors (Service) ------------------------------- //


    // ------------------------------- Handle Update Data Education Tentors ------------------------------- //

    static async handleUpdateEducationTentorsByTentorId({
        tentor_id,
        last_education,
        institution_name,
        tentor_major,
        graduation_year
    }) {

        try {

            const getTentorById = await tentorsRepository.getTentorById({ tentor_id });

            if (!last_education) {
                last_education = getTentorById.last_education;
            }
            
            if (!institution_name) {
                institution_name = getTentorById.institution_name;
            }
            
            if (!tentor_major) {
                tentor_major = getTentorById.tentor_major;
            }
            
            if (!graduation_year) {
                graduation_year = getTentorById.graduation_year;
            }

            if (getTentorById.tentor_id == tentor_id) {

                const updatedDataTentor = await tentorsRepository.handleUpdateEducationTentorsByTentorId({
                    tentor_id,
                    last_education,
                    institution_name,
                    tentor_major,
                    graduation_year
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Data Tentor Berhasil Diubah!",
                    data: {
                        updated_tentor: updatedDataTentor
                    }
                };
            }

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_biodata: null,
                }
            };
        }
    };

    // ------------------------------- End Handle Update Data Education Tentors ------------------------------- //




    // ------------------------------- Handle Get Reviews Tentors ------------------------------- //

    static async handleGetReviewsByTentorId({
        tentor_id
    }) {
        try {
            if(!tentor_id){
                return {
                    status: false,
                    status_code: 500,
                    message: "tentor_id wajib diisi",
                    data: {
                        tentor_reviews: null,
                    }
                };
            }

            const handleGetReviews = await reviewsRepository.handleGetReviewsByTentorId({ tentor_id });


            return {
                status: true,
                status_code: 200,
                message: "Tentor Reviews Berhasil Didapatkan!",
                data: {
                    tentor_reviews: handleGetReviews
                }
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_reviews: null
                }
            };
        }
    };

    // ------------------------------- End Handle Get Reviews Tentors ------------------------------- //



    // ------------------------------- Handle Get Galery Tentors ------------------------------- //

    static async handleGetGaleryByTentorId({
        tentor_id
    }) {
        try {
            if(!tentor_id){
                return {
                    status: false,
                    status_code: 500,
                    message: "tentor_id wajib diisi",
                    data: {
                        tentor_galeries: null,
                    }
                };
            }

            const handleGetGalery = await tentorsRepository.handleGetGaleryByTentorId({ tentor_id });


            return {
                status: true,
                status_code: 200,
                message: "Tentor Galery Berhasil Didapatkan!",
                data: {
                    tentor_galeries: handleGetGalery[0]
                }
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    tentor_galeries: null,
                }
            };
        }
    };

    // ------------------------------- End Handle Get Reviews Tentors ------------------------------- //

};

module.exports = TentorsService;