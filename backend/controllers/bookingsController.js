const bookingsService = require('../services/bookingsService');

const generateTokenSnap = async(req, res) => {
    const {student, tentor, choose_package, total_transfer} = req.body
    const { status, status_code, message, data } = await bookingsService.generateTokenSnap({
        student, tentor, choose_package, total_transfer
    })
    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    })
}

/**
 * It's a function that handles the booking process
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const handleBooking = async(req, res) => {
    const {
        user_id,
        tentor_id,
        choose_course,
        study_preference,
        choose_package,
        study_duration,
        study_start_time,
        // independent
        study_schedule,
        // subscribe
        amount_meeting,
        study_start_date,
        choose_day,
        choose_time,
        choose_duration,
        // snap redirect url
        redirect_url,
        unique_code,
        private_fee
    } = req.body

    const { status, status_code, message, data } = await bookingsService.handleBooking({ 
        user_id,
        tentor_id,
        choose_course,
        study_preference,
        choose_package,
        study_duration,
        study_start_time,
        // independent
        study_schedule,
        // subscribe
        amount_meeting,
        study_start_date,
        choose_day,
        choose_time,
        choose_duration,
        // snap redirect url
        redirect_url,
        unique_code,
        private_fee
     });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

const handleBookingFinish = async(req, res) => {
    const { order_id } = req.query;

    const {status, status_code, message, data} = await bookingsService.handleBookingFinish({ order_id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}


const handleBookingNotification = async(req, res) => {
    const { order_id, transaction_status, status_code } = req.body;

    const {status, message, data} = await bookingsService.handleBookingNotification({ 
        order_id,
        transaction_status,
        status_code
    });

    res.status(parseInt(status_code)).send({
        status: status,
        message: message,
        data: data,
    });
}

const handleBookingConfirm = async(req, res) => {
    const { booking_id, tentor_id } = req.body;

    const {status, status_code, message, data} = await bookingsService.handleBookingConfirm({ booking_id, tentor_id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

const handleGetBookingByStudentId = async(req, res) => {
    const user_id = req.user.id

    const { status, status_code, message, data } = await bookingsService.handleGetBookingByStudentId({ 
        user_id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

const handleGetTransactionByStudentId = async(req, res) => {
    const user_id = req.user.id

    const { status, status_code, message, data } = await bookingsService.handleGetTransactionByStudentId({ 
        user_id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}


const handleGetBookingByTentorId = async(req, res) => {
    const tentor_id = req.user.id

    const { status, status_code, message, data } = await bookingsService.handleGetBookingByTentorId({ 
        tentor_id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

const handleGetBookingTodayByTentorId = async(req, res) => {
    const tentor_id = req.user.id

    const { status, status_code, message, data } = await bookingsService.handleGetBookingTodayByTentorId({ 
        tentor_id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

const handleStartClass = async(req, res) => {
    const {booking_id} = req.params

    const { status, status_code, message, data } = await bookingsService.handleStartClass({ 
        booking_id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

const handleEndClass = async(req, res) => {
    const {booking_id} = req.params
    const {topic_class} = req.body
    let url_activity_picture = "";

    if(req.file){
        url_activity_picture = req.file.path;
    }

    const { status, status_code, message, data } = await bookingsService.handleEndClass({ 
        booking_id,
        topic_class,
        url_activity_picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

const handleValidateClass = async(req, res) => {
    const {booking_id} = req.params
    const {tentor_id, user_id, rate, text_review} = req.body

    const { status, status_code, message, data } = await bookingsService.handleValidateClass({ 
        booking_id,
        tentor_id,
        user_id,
        rate,
        text_review
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

const handleExpiredClass = async(req, res) => {
    const {booking_id} = req.params

    const { status, status_code, message, data } = await bookingsService.handleExpiredClass({ 
        booking_id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

module.exports = {
    handleBooking,
    handleBookingFinish,
    handleBookingNotification,
    handleBookingConfirm,
    generateTokenSnap,
    handleGetBookingByStudentId,
    handleGetTransactionByStudentId,
    handleGetBookingByTentorId,
    handleGetBookingTodayByTentorId,
    handleStartClass,
    handleEndClass,
    handleValidateClass,
    handleExpiredClass
}