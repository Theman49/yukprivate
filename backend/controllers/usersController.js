const usersService = require("../services/usersService");


// ------------------------------- Handle Get User By Id ------------------------------- //

const handleGetUserById = async (req, res) => {
    
    const { id } = req.params;

    const { status, status_code, message, data } = await usersService.handleGetUserById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------------- End Handle Get User By Id ------------------------------- //


// ------------------------------- Handle Get Student By Id ------------------------------- //

const handleGetStudentsById = async(req, res, next) => {

    const { id } = req.params;

    const { status, status_code, message, data } = await usersService.handleGetStudentsById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
    
};

// ------------------------------- End Handle Get Student By Id ------------------------------- //


// ------------------------------- Handle Get Tentor By Id After Login------------------------------- //

const handleGetTentorsByIdAfterLogin = async(req, res, next) => {

    const { id } = req.params;

    const { status, status_code, message, data } = await usersService.handleGetTentorsByIdAfterLogin({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Get Tentor By Id After Login ------------------------------- //


// ------------------------------- Handle Get Tentor By Id Before Login------------------------------- //

const handleGetTentorByIdBeforeLogin = async(req, res, next) => {

    const { id } = req.params;

    const { status, status_code, message, data } = await usersService.handleGetTentorByIdBeforeLogin({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Get Tentor By Id Before Login ------------------------------- //


// ------------------------------- Handle Get All Tentors ------------------------------- //

const handleGetAllTentors = async(req, res) => {

    const { address, course_interest } = req.query;

    const { status, status_code, message, data } = await usersService.handleGetAllTentors({ address, course_interest });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

// ------------------------------- End Handle Get All Tentors ------------------------------- //


// ------------------------------- Handle Users Change Password  ------------------------------- //

const handleUsersChangePassword = async(req, res, next) => {

    const { email, password } = req.body;

    const { status, status_code, message, data } = await usersService.handleUsersChangePassword({
        email,
        password
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });

};

// ------------------------------- End Handle Users Change Password ------------------------------- //

module.exports = { 
    handleGetUserById,
    handleGetStudentsById,
    handleGetTentorsByIdAfterLogin,
    handleGetTentorByIdBeforeLogin,
    handleGetAllTentors ,
    handleUsersChangePassword
};