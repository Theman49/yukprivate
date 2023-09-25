const studentsService = require('../services/studentsService')


// ------------------------------- Handle Students Biodata Section 1 ------------------------------- //

const handleStudentsBiodataSection1 = async (req, res, next) => {

    const user_id = req.user.id;

    const {
        username,
        gender,
        date_of_birth,
        no_handphone,
    } = req.body;

    const { status, status_code, message, data } = await studentsService.handleStudentsBiodataSection1({
        user_id,
        username,
        gender,
        date_of_birth,
        no_handphone,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Students Biodata Section 1 ------------------------------- //


// ------------------------------- Handle Students Biodata Section 2 ------------------------------- //

const handleStudentsBiodataSection2 = async (req, res, next) => {

    const user_id = req.user.id;

    const {
        address,
        pin_point,
    } = req.body;

    const { status, status_code, message, data } = await studentsService.handleStudentsBiodataSection2({
        user_id,
        address,
        pin_point,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

}
// ------------------------------- End Handle Students Biodata Section 2 ------------------------------- //



// ------------------------------- Handle Students Biodata Section 3 ------------------------------- //
const handleStudentsBiodataSection3 = async (req, res, next) => {

    const user_id = req.user.id;

    const {
        school_name,
        student_class,
        school_major
    } = req.body;

    const { status, status_code, message, data } = await studentsService.handleStudentsBiodataSection3({
        user_id,
        school_name,
        student_class,
        school_major
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Students Biodata Section 3 ------------------------------- //


// ------------------------------- Handle Update Data Students ------------------------------- //

const handleUpdateDataStudentsByUserId = async (req, res, next) => {

    const id = req.user.id;

    const user_id = req.user.id;

    var url_picture = "";

    if (req.file) {
        url_picture = req.file.path;
    }

    const {
        name,
        username,
        gender,
        date_of_birth,
        no_handphone,
        address,
        pin_point,
        student_class,
        school_major
    } = req.body;

    const { status, status_code, message, data } = await studentsService.handleUpdateDataStudentsByUserId({
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
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------------- End Handle Update Data Students ------------------------------- //


module.exports = {
    handleStudentsBiodataSection1,
    handleStudentsBiodataSection2,
    handleStudentsBiodataSection3,
    handleUpdateDataStudentsByUserId
};