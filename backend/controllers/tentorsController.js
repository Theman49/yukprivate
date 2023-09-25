const tentorsService = require('../services/tentorsService')


// ------------------------------- Handle Tentors Biodata Section 1 ------------------------------- //

const handleTentorsBiodataSection1 = async(req, res, next) => {
    
    const id = req.user.id;
    const tentor_id = req.user.id;

    const {
        username,
        gender,
        date_of_birth,
        no_handphone,
    } = req.body;

    const { status, status_code, message, data } = await tentorsService.handleTentorsBiodataSection1({ 
        id,
        tentor_id,
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

// ------------------------------- End Handle Tentors Biodata Section 1 ------------------------------- //


// ------------------------------- Handle Tentors Biodata Section 2 ------------------------------- //
const handleTentorsBiodataSection2 = async(req, res, next) => {
    
    const tentor_id = req.user.id;

    const {
        address,
        pin_point,
    } = req.body;

    const { status, status_code, message, data } = await tentorsService.handleTentorsBiodataSection2({ 
        tentor_id,
        address,
        pin_point,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Tentors Biodata Section 2 ------------------------------- //


// ------------------------------- Handle Tentors Biodata Section 3 ------------------------------- //

const handleTentorsBiodataSection3 = async(req, res, next) => {
    
    const tentor_id = req.user.id;

    const {
        last_education,
        institution_name,
        tentor_major,
        graduation_year
    } = req.body;

    const { status, status_code, message, data } = await tentorsService.handleTentorsBiodataSection3({ 
        tentor_id,
        last_education,
        institution_name,
        tentor_major,
        graduation_year
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Tentors Biodata Section 3 ------------------------------- //


// ------------------------------- Handle Tentors Biodata Section 4 ------------------------------- //

const handleTentorsBiodataSection4 = async(req, res, next) => {
    
    const tentor_id = req.user.id;
    const experience_id = req.user.id;

    const {
        teaching_place,
        teaching_role,
        teaching_start_date,
        teaching_end_date,
        isTeaching
    } = req.body;

    const { status, status_code, message, data } = await tentorsService.handleTentorsBiodataSection4({ 
        tentor_id,
        experience_id,
        teaching_place,
        teaching_role,
        teaching_start_date,
        teaching_end_date,
        isTeaching
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Tentors Biodata Section 4 ------------------------------- //


// ------------------------------- Handle Delete Tentors Biodata Section 4 ------------------------------- //

const handleDeleteTentorsBiodataSection4 = async(req, res, next) => {
    
    const { id } = req.params;

    const tentor_id = req.user.id; 

    const { status, status_code, message, data } = await tentorsService.handleDeleteTentorsBiodataSection4({ 
        id,
        tentor_id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Delete Tentors Biodata Section 4 ------------------------------- //


// ------------------------------- Handle Tentors Biodata Section 5 ------------------------------- //

const handleTentorsBiodataSection5 = async(req, res) => {
    
    const tentor_id = req.user.id;
    const achievement_id = req.user.id;

    const {
        achievement_name,
        organizer_name,
        date_of_activity,
    } = req.body;

    var url_certificate = "";

    if(req.file){
        url_certificate = req.file.path;
    }
    const { status, status_code, message, data } = await tentorsService.handleTentorsBiodataSection5({ 
        tentor_id,
        achievement_id,
        achievement_name,
        organizer_name,
        date_of_activity,
        url_certificate
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Tentors Biodata Section 5 ------------------------------- //


// ------------------------------- Handle Delete Tentors Biodata Section 5 ------------------------------- //

const handleDeleteTentorsBiodataSection5 = async(req, res, next) => {
    
    const { id } = req.params;

    const tentor_id = req.user.id;

    const { status, status_code, message, data } = await tentorsService.handleDeleteTentorsBiodataSection5({ 
        id,
        tentor_id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Delete Tentors Biodata Section 5 ------------------------------- //


// ------------------------------- Handle Tentors Biodata Section 6 ------------------------------- //

const handleTentorsBiodataSection6 = async(req, res, next) => {
    
    const tentor_id = req.user.id;
    const proposal_id = req.user.id;

    const {
        tentor_introduction,
        reason_for_registering
    } = req.body;

    let url_esay = "";

    if(req.file){
        url_esay = req.file.path;
    }

    const { status, status_code, message, data } = await tentorsService.handleTentorsBiodataSection6({ 
        tentor_id,
        proposal_id,
        tentor_introduction,
        reason_for_registering,
        url_esay
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

}
// ------------------------------- End Handle Tentors Biodata Section 6 ------------------------------- //


// ------------------------------- Handle Tentors Biodata Section 7 ------------------------------- //

const handleTentorsBiodataSection7Schedule = async(req, res, next) => {
    
    const tentor_id = req.user.id;
    const schedule_id = req.user.id;

    const {
        day,
        time,
        duration
    } = req.body;

    const { status, status_code, message, data } = await tentorsService.handleTentorsBiodataSection7Schedule({ 
        tentor_id,
        schedule_id,
        day,
        time,
        duration
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Tentors Biodata Section 7 ------------------------------- //


// ------------------------------- Handle Tentors Biodata Section Finish ------------------------------- //

const handleTentorsBiodataSectionFinish = async(req, res, next) => {
    
    const tentor_id = req.user.id;

    const {
        course_interest,
        preferences
    } = req.body;

    const { status, status_code, message, data } = await tentorsService.handleTentorsBiodataSectionFinish({ 
        tentor_id,
        course_interest,
        preferences
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Tentors Biodata Section Finish ------------------------------- //


// ------------------------------- Handle Update Data Tentors ------------------------------- //

const handleUpdateBiodataTentorsByTentorId = async (req, res, next) => {

    const id = req.user.id;

    const tentor_id = req.user.id;

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
    } = req.body;

    const { status, status_code, message, data } = await tentorsService.handleUpdateBiodataTentorsByTentorId({
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
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------------- End Handle Update Data Tentors ------------------------------- //


// ------------------------------- Handle Update Data Education Tentors ------------------------------- //

const handleUpdateEducationTentorsByTentorId = async (req, res, next) => {

    const tentor_id = req.user.id;

    const {
        last_education,
        institution_name,
        tentor_major,
        graduation_year
    } = req.body;

    const { status, status_code, message, data } = await tentorsService.handleUpdateEducationTentorsByTentorId({
        tentor_id,
        last_education,
        institution_name,
        tentor_major,
        graduation_year
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------------- End Handle Update Data Education Tentors ------------------------------- //



// ------------------------------- Handle Get Review Tentors ------------------------------- //

const handleGetReviewsByTentorId = async (req, res) => {

    const tentor_id = req.params.tentor_id;

    const { status, status_code, message, data } = await tentorsService.handleGetReviewsByTentorId({
        tentor_id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------------- End Handle Get Reviews Tentors ------------------------------- //




// ------------------------------- Handle Get Review Tentors ------------------------------- //

const handleGetGaleryByTentorId = async (req, res) => {

    const tentor_id = req.params.tentor_id;

    const { status, status_code, message, data } = await tentorsService.handleGetGaleryByTentorId({
        tentor_id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------------- End Handle Get Reviews Tentors ------------------------------- //


module.exports = {
    handleTentorsBiodataSection1,
    handleTentorsBiodataSection2,
    handleTentorsBiodataSection3,
    handleTentorsBiodataSection4,
    handleDeleteTentorsBiodataSection4,
    handleTentorsBiodataSection5,
    handleDeleteTentorsBiodataSection5,
    handleTentorsBiodataSection6,
    handleTentorsBiodataSection7Schedule,
    handleTentorsBiodataSectionFinish,
    handleUpdateBiodataTentorsByTentorId,
    handleUpdateEducationTentorsByTentorId,

    handleGetReviewsByTentorId,
    handleGetGaleryByTentorId,
};