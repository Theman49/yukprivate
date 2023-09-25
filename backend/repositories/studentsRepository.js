const { registers, students } = require('../models');

class StudentRepository {

    // ------------------------------- Get Student By user_id ------------------------------- //

    static async getStudentById({ user_id }) {

        const getUser = await students.findOne({
            where: {
                user_id
            }
        });

        return getUser;
    };

    // ------------------------------- End Get Student By user_id ------------------------------- //


    // ------------------------------- Handle Student Biodata Section 1 ------------------------------- //

    static async handleStudentsBiodataSection1({
        user_id,
        username,
        gender,
        date_of_birth,
        no_handphone
    }) {

        const createdStudentBiodata = await students.create({
            id: user_id,
            user_id,
            username,
            gender,
            date_of_birth,
            no_handphone
        });

        return createdStudentBiodata;
    };

    // ------------------------------- End Handle Student Biodata Section 1 ------------------------------- //


    // ------------------------------- Handle Student Biodata Section 2 ------------------------------- //

    static async handleStudentsBiodataSection2({ user_id, address, pin_point }) {

        const udpatedStudentsBiodataSection2 = await students.update({
            address,
            pin_point
        }, {
            where: {
                user_id
            }
        });

        return udpatedStudentsBiodataSection2;
    };

    // ------------------------------- End Handle Student Biodata Section 2 ------------------------------- //


    // ------------------------------- Handle Student Biodata Section 3 ------------------------------- //

    static async handleStudentsBiodataSection3({ user_id, school_name, student_class, school_major }) {

        const udpatedStudentsBiodataSection3 = await students.update({
            school_name,
            student_class,
            school_major
        }, {
            where: {
                user_id
            }
        });

        return udpatedStudentsBiodataSection3;
    };

    // ------------------------------- End Handle Student Biodata Section 3 ------------------------------- //


    // ------------------------------- Handle Update Data Students ------------------------------- //

    static async handleUpdateDataStudentsByUserId({
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

        const udpatedDataStudent = await students.update({
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
        }, {
            where: {
                user_id
            }
        });

        return udpatedDataStudent;

    };

    // ------------------------------- End Handle Update Data Students ------------------------------- //

};

module.exports = StudentRepository;