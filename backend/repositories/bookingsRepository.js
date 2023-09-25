const { 
    booking_payments, 
    booking_independents, 
    booking_subscribes,
    booking_lists,
    transactions,
    sequelize
} = require('../models');

class BookingsRepository {

    static async getLastIdBooking() {
        const getId = await booking_payments.max('id')
        return getId
    }
    // ------------------------------- Get Booking By Id ------------------------------- //

    static async getBookingById({ booking_id }) {
        const getData = await transactions.findOne(
            {
                include: [
                    {
                        model: booking_payments,
                        attributes: ['tentor_id']
                    }
                ],
                where: {
                    booking_id
                },
                attributes: ['status_code']
            }
            // query
        );

        return getData;
    }

    // ------------------------------- End Get Booking By Id ------------------------------- //


    // ------------------------------- Check Transaction By Order Id ------------------------------- //
    
    static async checkTransactionByOrderId({ order_id }) {
        const getTransaction = await transactions.findOne({
            where: {
                order_id
            }
        })

        return getTransaction;
    }

    // ------------------------------- End Check Transaction By Order Id ------------------------------- //


    // ------------------------------- Handle Booking Payment ------------------------------- //
    static async handleBookingPayment({
        user_id,
        tentor_id,
        choose_course,
        study_preference,
        study_duration,
        study_start_time,
        study_end_time,
        choose_package,
        private_fee,
        unique_code,
        midtrans_fee,
        total_transfer,
        redirect_url
    }) {
        const createdBookingPayment = await booking_payments.create({
            user_id,
            tentor_id,
            choose_course,
            study_preference,
            study_duration,
            study_start_time,
            study_end_time,
            choose_package,
            private_fee,
            unique_code,
            midtrans_fee,
            total_transfer,
            redirect_url
        })

        return createdBookingPayment;
    }
    // ------------------------------- End Handle Booking Payment ------------------------------- //



    // ------------------------------- Handle Booking Independent ------------------------------- //
    static async handleBookingIndependent({
        booking_id,
        study_schedule
    }) {
        const createdBookingIndependent = await booking_independents.create({
            booking_id,
            study_schedule
        })

        return createdBookingIndependent;
    }
    // ------------------------------- End Handle Booking Independent ------------------------------- //



    // ------------------------------- Handle Booking Subscribe ------------------------------- //
    static async handleBookingSubscribe({
        booking_id,
        amount_meeting,
        study_start_date,
        choose_day,
        choose_time,
        choose_duration
    }) {
        const createdBookingSubscribe = await booking_subscribes.create({
            booking_id,
            amount_meeting,
            study_start_date,
            choose_day,
            choose_time,
            choose_duration
        })

        return createdBookingSubscribe;
    }
    // ------------------------------- End Handle Booking Subscribe ------------------------------- //



    // ------------------------------- Handle Booking List ------------------------------- //
    static async handleBookingList({
        booking_id,
        study_schedule,
        choose_day,
        choose_time,
        choose_duration,
        booking_status
    }) {
        const createdBookingList = await booking_lists.create({
            booking_id,
            study_schedule,
            choose_day,
            choose_time,
            choose_duration,
            booking_status
        })

        return createdBookingList;
    }
    // ------------------------------- End Handle Booking List ------------------------------- //



    // ------------------------------- Handle Booking Finish ------------------------------- //
    static async handleBookingFinish({
        booking_id,
        order_id,
        order_date,
        bank,
        va_number,
        status_code,
        transaction_status
    }) {
        const createdTransaction = await transactions.create({
            booking_id,
            order_id,
            order_date,
            bank,
            va_number,
            status_code,
            transaction_status
        })

        return createdTransaction;
    }
    // ------------------------------- End Handle Booking Finish ------------------------------- //



    // ------------------------------- Handle Booking Notification ------------------------------- //
    static async handleBookingNotification({
        order_id,
        status_code,
        transaction_status
    }) {
        const updatedTransaction = await transactions.update({
            status_code,
            transaction_status
        }, {
            where: {
                order_id
            }
        });

        return updatedTransaction;
    }
    // ------------------------------- End Handle Booking Notification ------------------------------- //


      // ------------------------------- Handle Booking Notification ------------------------------- //
      static async handleUpdateTransactionStatusInBookingPayments({
        booking_id,
        transaction_status
    }) {
        const updatedTransaction = await booking_payments.update({
            transaction_status
        }, {
            where: {
                id: booking_id
            }
        });

        return updatedTransaction;
    }
    // ------------------------------- End Handle Booking Notification ------------------------------- //


    // ------------------------------- Handle Booking Confirm ------------------------------- //
    static async handleBookingConfirm({
        booking_id
    }) {
        const updatedStatusBooking = await booking_lists.update({
            booking_status: "accepted"
        }, {
            where: {
                booking_id
            }
        });

        return updatedStatusBooking;
    }
    // ------------------------------- End Handle Booking Confirm ------------------------------- //



    // ------------------------------- Handle Booking Lists By Student ------------------------------- //
    static async getBookingListsByStudentId({
        user_id
    }) {
        const getBookingLists = await sequelize.query(
            `SELECT 
                booking_payments.*,
                booking_lists.*,
                registers.name as tentor_name,
                students.address as student_address,
                tentors.url_picture as tentor_image,
                tentors.no_handphone as tentor_phone
                FROM booking_payments JOIN booking_lists ON booking_payments.id = booking_lists.booking_id
                JOIN registers ON booking_payments.tentor_id = registers.id
                JOIN students ON booking_payments.user_id = students.user_id
                JOIN tentors ON booking_payments.tentor_id = tentors.tentor_id
                WHERE booking_payments.user_id = ${user_id} and booking_payments.transaction_status = 'settlement'
                ORDER BY booking_lists.updatedAt DESC
            `,
            {
                raw: true
            }
        )

        return getBookingLists
    }
    // ------------------------------- End Handle Booking Lists By Student ------------------------------- //


    // ------------------------------- Handle Booking Lists By Tentor ------------------------------- //
    static async getBookingListsByTentorId({
        tentor_id
    }) {
        const getBookingLists = await sequelize.query(
            `SELECT 
                booking_payments.*,
                booking_lists.*,
                registers.name as student_name,
                students.address as student_address,
                students.url_picture as student_image,
                students.no_handphone as student_phone
                FROM booking_payments JOIN booking_lists ON booking_payments.id = booking_lists.booking_id
                JOIN registers ON booking_payments.user_id = registers.id
                JOIN students ON booking_payments.user_id = students.user_id
                WHERE booking_payments.tentor_id = ${tentor_id} and booking_payments.transaction_status = 'settlement'
                ORDER BY booking_lists.updatedAt DESC
            `,
            {
                raw: true
            }
        )

        return getBookingLists
    }
    // ------------------------------- End Handle Booking Lists By Tentor ------------------------------- //



    // ------------------------------- Handle Booking Lists Today By Tentor ------------------------------- //
    static async getBookingListsTodayByTentorId({
        tentor_id,
        today
    }) {
        const getBookingLists = await sequelize.query(
            `SELECT 
                booking_payments.*,
                booking_lists.*,
                registers.name as student_name,
                students.url_picture as student_image
                FROM booking_payments JOIN booking_lists ON booking_payments.id = booking_lists.booking_id
                JOIN registers ON booking_payments.user_id = registers.id
                JOIN students ON booking_payments.user_id = students.user_id
                WHERE 
                    booking_payments.tentor_id = ${tentor_id} and 
                    booking_payments.transaction_status = 'settlement' and
                    booking_lists.study_schedule = '${today}'
            `,
            {
                raw: true
            }
        )

        return getBookingLists
    }
    // ------------------------------- End Handle Booking Lists Today By Tentor ------------------------------- //



    // ------------------------------- Handle Booking Independents ------------------------------- //
    static async getBookingIndependentsByStudentId({
        user_id
    }) {
        const getBookingIndependents = await sequelize.query(
            `SELECT 
                *
                FROM booking_payments JOIN booking_lists ON booking_payments.id = booking_lists.booking_id
                JOIN booking_independents ON booking_lists.booking_id = booking_independents.booking_id
                WHERE booking_payments.user_id = ${user_id}`,
            {
                raw: true
            }
        )

        return getBookingIndependents
    }
    // ------------------------------- End Handle Booking Independents ------------------------------- //



    // ------------------------------- Handle Booking Subcribes ------------------------------- //
    static async getBookingSubscribesByStudentId({
        user_id
    }) {
        const getBookingSubscribes = await sequelize.query(
            `SELECT 
                *
                FROM booking_payments JOIN booking_lists ON booking_payments.id = booking_lists.booking_id
                JOIN booking_subscribes ON booking_lists.booking_id = booking_subscribes.booking_id
                WHERE booking_payments.user_id = ${user_id}`,
            {
                raw: true
            }
        )

        return getBookingSubscribes
    }
    // ------------------------------- End Handle Booking Subscribes ------------------------------- //



    // ------------------------------- Handle Transaction By Student Id ------------------------------- //
    static async getTransactionByStudentId({
        user_id
    }) {
        const getTransaction = await sequelize.query(
            `SELECT 
                booking_payments.*,
                registers.name as tentor_name,
                tentors.url_picture as tentor_image
                FROM booking_payments JOIN registers ON booking_payments.tentor_id = registers.id
                JOIN tentors ON booking_payments.tentor_id = tentors.tentor_id
                WHERE booking_payments.user_id = ${user_id}
                ORDER BY booking_payments.createdAt DESC
            `,
            {
                raw: true
            }
        )

        return getTransaction
    }
    // ------------------------------- End Handle Transaction By Student Id ------------------------------- //



    // ------------------------------- Handle Start Class ------------------------------- //
    static async handleStartClass({
        booking_id
    }) {
        const updatedBooking = await booking_lists.update({
            booking_status: 'ongoing',
        }, {
            where: {
                id: booking_id
            }
        })
        return updatedBooking
    }
    // ------------------------------- End Handle Start Class ------------------------------- //



    // ------------------------------- Handle End Class ------------------------------- //
    static async handleEndClass({
        booking_id,
        topic_class,
        url_activity_picture
    }) {
        const updatedBooking = await booking_lists.update({
            isValidatedByTentor: true,
            topic_class,
            url_activity_picture
        }, {
            where: {
                id: booking_id
            }
        })
        return updatedBooking
    }
    // ------------------------------- End Handle End Class ------------------------------- //



    // ------------------------------- Handle Validate Class ------------------------------- //
    static async handleValidateClass({
        booking_id
    }) {
        const updatedBooking = await booking_lists.update({
            isValidatedByStudent: true,
            booking_status: 'complete'
        }, {
            where: {
                id: booking_id
            }
        })
        return updatedBooking
    }
    // ------------------------------- End Handle Validate Class ------------------------------- //



    // ------------------------------- Handle Validate Class ------------------------------- //
    static async handleExpiredClass({
        booking_id
    }) {
        const updatedBooking = await booking_lists.update({
            booking_status: 'expired'
        }, {
            where: {
                id: booking_id
            }
        })
        return updatedBooking
    }
    // ------------------------------- End Handle Validate Class ------------------------------- //
}

module.exports = BookingsRepository;