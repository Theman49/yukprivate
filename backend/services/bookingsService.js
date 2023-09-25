const bookingsRepository = require('../repositories/bookingsRepository');
const userRepository = require('../repositories/usersRepository');
const reviewsRepository = require('../repositories/reviewsRepository');
const { PRICE, PACKAGES, AMOUNT_MEETING, MIDTRANS } = require('../helper/studyPackage');
const { generatedUniqueCode } = require('../helper/uniqueCodeGenerator');
const { getTransactionByOrderId, splitOrderId, generatedTokenSnap } = require('../helper/midtrans');
const { generatedStudyEndTime } = require('../helper/generatedStudyEndTime');
const { generatedScheduleSubscriber } = require('../helper/generatedScheduleSubscriber');
const moment = require('moment')

class BookingsService {
    static async generateTokenSnap({student, tentor, choose_package, total_transfer}){
        try{
            let getLastId =  await bookingsRepository.getLastIdBooking();

            if(!getLastId){
                getLastId = 1
            }else{
                getLastId += 1
            }
            const generatedToken = await generatedTokenSnap({student, tentor, booking_id:getLastId, choose_package, total_transfer})

            return {
                status: true,
                status_code: 200,
                message: "Generated Token Snap Berhasil",
                data: {
                    generated_token_snap: generatedToken,
                }
            };

        }catch(e) {
            return {
                status: false,
                status_code: 500,
                message: e.message,
                data: {
                    generated_token_snap: null,
                }
            };

        }
    }

    // ------------------------------- Handle Booking ------------------------------- //
    static async handleBooking({
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
    }) {


        // ------------------------------- Payload Validation ------------------------------- //
        choose_course = choose_course.split(',')
        choose_day = choose_day.split(',')
        choose_time = choose_time.split(',')
        choose_duration = choose_duration.split(',')

        if (!user_id) {
            return {
                status: false,
                status_code: 400,
                message: "User Id Wajib Diisi",
                data: {
                    booking_data: null,
                }
            };
        }

        if (!tentor_id) {
            return {
                status: false,
                status_code: 400,
                message: "Tentor Id Wajib Diisi",
                data: {
                    booking_data: null,
                }
            };
        }

        if (!choose_course) {
            return {
                status: false,
                status_code: 400,
                message: "Pelajaran Wajib Diisi",
                data: {
                    booking_data: null,
                }
            };
        }else {
            if (choose_course.length < 1) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Pelajaran Wajib Diisi Minimal 1",
                    data: {
                        booking_data: null,
                    }
                };
            }
        }

        if (!study_preference) {
            return {
                status: false,
                status_code: 400,
                message: "Preferensi Belajar Wajib Diisi",
                data: {
                    booking_data: null,
                }
            };
        }

        if (!study_duration) {
            return {
                status: false,
                status_code: 400,
                message: "Durasi Belajar Wajib Diisi",
                data: {
                    booking_data: null,
                }
            };
        }

        if (!study_start_time) {
            return {
                status: false,
                status_code: 400,
                message: "Waktu Belajar Wajib Diisi",
                data: {
                    booking_data: null,
                }
            };
        }

        if (!redirect_url) {
            return {
                status: false,
                status_code: 400,
                message: "Snap Redirect URL Wajib Diisi",
                data: {
                    booking_data: null,
                }
            };
        }

        if (!unique_code) {
            return {
                status: false,
                status_code: 400,
                message: "Unique Code Wajib Diisi",
                data: {
                    booking_data: null,
                }
            };
        }

        if (!private_fee) {
            return {
                status: false,
                status_code: 400,
                message: "Private Fee Wajib Diisi",
                data: {
                    booking_data: null,
                }
            };
        }

        let FEE = PRICE.FEE;

        if (!choose_package) {
            return {
                status: false,
                status_code: 400,
                message: "Paket Wajib Dipilih",
                data: {
                    booking_data: null,
                }
            };
        }else {
            if(choose_package == PACKAGES.INDEPENDENT) {
                if (!study_schedule) {
                    return {
                        status: false,
                        status_code: 400,
                        message: "Jadwal Belajar Wajib Diisi",
                        data: {
                            booking_data: null,
                        }
                    };
                }

            } else if(choose_package == PACKAGES.SUBSCRIBE) {
                if (!choose_day) {
                    return {
                        status: false,
                        status_code: 400,
                        message: "Pilih Hari Wajib Diisi",
                        data: {
                            booking_data: null,
                        }
                    };
                }
                if (!choose_time) {
                    return {
                        status: false,
                        status_code: 400,
                        message: "Pilih Waktu Wajib Diisi",
                        data: {
                            booking_data: null,
                        }
                    };
                }
                if (!choose_duration) {
                    return {
                        status: false,
                        status_code: 400,
                        message: "Pilih Duration Wajib Diisi",
                        data: {
                            booking_data: null,
                        }
                    };
                }
                if (!amount_meeting) {
                    return {
                        status: false,
                        status_code: 400,
                        message: "Jumlah Pertemuan Per Bulan Wajib Diisi",
                        data: {
                            booking_data: null,
                        }
                    };
                }else{
                    if(amount_meeting == AMOUNT_MEETING.PACKET_1.AMOUNT){
                        FEE = AMOUNT_MEETING.PACKET_1.FEE;
                        if (choose_day.length != AMOUNT_MEETING.PACKET_1.MAX_CHOOSE_DAY) {
                            return {
                                status: false,
                                status_code: 400,
                                message: `Jumlah Paket Meet ${AMOUNT_MEETING.PACKET_1.AMOUNT}x/bulan Harus memilih ${AMOUNT_MEETING.PACKET_1.MAX_CHOOSE_DAY} hari`,
                                data: {
                                    booking_data: null,
                                }
                            };
                        }
                    }
                    
                    else if(amount_meeting == AMOUNT_MEETING.PACKET_2.AMOUNT){
                        FEE = AMOUNT_MEETING.PACKET_2.FEE;
                        if (choose_day.length != AMOUNT_MEETING.PACKET_2.MAX_CHOOSE_DAY) {
                            return {
                                status: false,
                                status_code: 400,
                                message: `Jumlah Paket Meet ${AMOUNT_MEETING.PACKET_2.AMOUNT}x/bulan Harus memilih ${AMOUNT_MEETING.PACKET_2.MAX_CHOOSE_DAY} hari`,
                                data: {
                                    booking_data: null,
                                }
                            };
                        }
                    }

                    else if(amount_meeting == AMOUNT_MEETING.PACKET_3.AMOUNT){
                        FEE = AMOUNT_MEETING.PACKET_3.FEE;
                        if (choose_day.length != AMOUNT_MEETING.PACKET_3.MAX_CHOOSE_DAY) {
                            return {
                                status: false,
                                status_code: 400,
                                message: `Jumlah Paket Meet ${AMOUNT_MEETING.PACKET_3.AMOUNT}x/bulan Harus memilih ${AMOUNT_MEETING.PACKET_3.MAX_CHOOSE_DAY} hari`,
                                data: {
                                    booking_data: null,
                                }
                            };
                        }
                    }

                    else if(amount_meeting == AMOUNT_MEETING.PACKET_4.AMOUNT){
                        FEE = AMOUNT_MEETING.PACKET_4.FEE;
                        if (choose_day.length != AMOUNT_MEETING.PACKET_4.MAX_CHOOSE_DAY) {
                            return {
                                status: false,
                                status_code: 400,
                                message: `Jumlah Paket Meet ${AMOUNT_MEETING.PACKET_4.AMOUNT}x/bulan Harus memilih ${AMOUNT_MEETING.PACKET_4.MAX_CHOOSE_DAY} hari`,
                                data: {
                                    booking_data: null,
                                }
                            };
                        }
                    }else {
                        return {
                            status: false,
                            status_code: 400,
                            message: `Jumlah Pertemuan Per Bulan tidak ditemukan`,
                            data: {
                                booking_data: null,
                            }
                        };
                    }
                }

                if (!study_start_date) {
                    return {
                        status: false,
                        status_code: 400,
                        message: "Tanggal Mulai Belajar Wajib Diisi",
                        data: {
                            booking_data: null,
                        }
                    };
                }

            }else {
                    return {
                        status: false,
                        status_code: 400,
                        message: "Paket harus 'indepent' atau 'subscribe' ",
                        data: {
                            booking_data: null,
                        }
                    };
            }
        }
        // ------------------------------- End Payload Validation ------------------------------- //

        const getStudentById = await userRepository.handleGetUserById({ id: user_id });
        const getTentorById = await userRepository.handleGetUserById({ id: tentor_id });

        if(!getStudentById){
            return {
                status: false,
                status_code: 400,
                message: "Student tidak ditemukan",
                data: {
                    booking_data: null,
                }
            };
        }

        if(!getTentorById){
            return {
                status: false,
                status_code: 400,
                message: "Tentor tidak ditemukan",
                data: {
                    booking_data: null,
                }
            };
        }

        try{
            const total_transfer = private_fee;
            const study_end_time = generatedStudyEndTime(study_start_time, study_duration);

            choose_course = choose_course.join(',')

            const createdBookingPayment = await bookingsRepository.handleBookingPayment({
                user_id,
                tentor_id,
                choose_course,
                study_preference,
                study_duration,
                study_start_time,
                study_end_time,
                choose_package,
                private_fee: FEE,
                unique_code,
                midtrans_fee: MIDTRANS.FEE,
                total_transfer,
                redirect_url
            })

            const booking_id = createdBookingPayment.id


            if(createdBookingPayment.choose_package == PACKAGES.INDEPENDENT) {
                const createdBookingIndependent = await bookingsRepository.handleBookingIndependent({
                    booking_id,
                    study_schedule
                })

                const createdBookingList = await bookingsRepository.handleBookingList({
                    booking_id,
                    study_schedule,
                    choose_day: moment(study_schedule).format('ddd'),
                    choose_time: study_start_time,
                    choose_duration: study_duration
                })

                return {
                    status: true,
                    status_code: 201,
                    message: "Booking Independent berhasil ditambahkan",
                    data: {
                        booking_payment: createdBookingPayment,
                        booking_independent: createdBookingIndependent,
                        booking_list: createdBookingList
                    }
                };
                
            } else if(createdBookingPayment.choose_package == PACKAGES.SUBSCRIBE) {
                const choose_day_string = choose_day.join(',')
                const choose_time_string = choose_time.join(',')
                const choose_duration_string = choose_duration.join(',')
                
                const createdBookingSubscribe = await bookingsRepository.handleBookingSubscribe({
                    booking_id,
                    amount_meeting,
                    study_start_date,
                    choose_day: choose_day_string,
                    choose_time: choose_time_string,
                    choose_duration: choose_duration_string
                })

                const schedules = generatedScheduleSubscriber(study_start_date, choose_day);

                let bookingList = [];

                for(let i=0; i<schedules.length; i++){
                    const createdBookingList = await bookingsRepository.handleBookingList({
                        booking_id,
                        study_schedule: schedules[i],
                        choose_day: choose_day[i % choose_day.length],
                        choose_time: choose_time[i % choose_time.length],
                        choose_duration: choose_duration[i % choose_duration.length]
                    })

                    bookingList.push(createdBookingList);
                }

                return {
                    status: true,
                    status_code: 201,
                    message: "Booking Subscribe berhasil ditambahkan",
                    data: {
                        booking_payment: createdBookingPayment,
                        booking_data: createdBookingSubscribe,
                        booking_list: bookingList
                    }
                };
                
            }
        }catch(err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    booking_data: null,
                }
            };
        }


    }
    // ------------------------------- End Handle Booking ------------------------------- //


    // ------------------------------- Handle Booking Finish------------------------------- //
    static async handleBookingFinish({ order_id }) {
        if(!order_id){
            return {
                status: false,
                status_code: 400,
                message: "Order Id wajib diisi",
                data: {
                    booking_data: null,
                }
            };

        }

        const data = await getTransactionByOrderId({ order_id })
        console.log(data)

        if(data.status_code == 404){
            return {
                status: false,
                status_code: 400,
                message: "Transaksi Tidak Ditambahkan",
                data: {
                    booking_data: null,
                }
            };
        }

        const checkTransactionByOrderId = await bookingsRepository.checkTransactionByOrderId({ order_id })
        
        if(checkTransactionByOrderId){
            return {
                status: true,
                status_code: 201,
                message: "Transaksi Sudah Ada",
                data: {
                    booking_data: checkTransactionByOrderId,
                }
            };
        }
        const { booking_id, transaction_time, status_code, transaction_status, payment_type } = data;

        let bank = ""
        let va_number = ""
        if(payment_type == "bank_transfer"){
            bank = data.va_numbers[0].bank
            va_number = data.va_numbers[0].va_number
        }

        const createdTransaction = await bookingsRepository.handleBookingFinish({
            booking_id,
            order_id,
            order_date: transaction_time,
            bank,
            va_number,
            status_code,
            transaction_status
        });

        return {
            status: true,
            status_code: 201,
            message: "Transaksi Berhasil Ditambahkan",
            data: {
                booking_data: createdTransaction,
            }
        };

    }
    // ------------------------------- End Handle Booking Finish------------------------------- //



    // ------------------------------- Handle Booking Notification ------------------------------- //
    static async handleBookingNotification({
        order_id,
        transaction_status,
        status_code
    }) {

        if(!order_id){
            return {
                status: false,
                status_code: 400,
                message: "Order ID harus diisi",
                data: {
                    booking_notification: null,
                }
            }
        }

        const getTransactionByOrderId = bookingsRepository.checkTransactionByOrderId({ order_id });

        if(!getTransactionByOrderId){
            return {
                status: false,
                status_code: 400,
                message: "Transaksi Tidak Ditemukan",
                data: {
                    booking_data: null,
                }
            }
        }

        const updatedTransaction = await bookingsRepository.handleBookingNotification({
            order_id,
            transaction_status,
            status_code
        })

        const {booking_id} = splitOrderId({}, order_id)

        const updatedTransactionStatusInBookingPayments = await bookingsRepository.handleUpdateTransactionStatusInBookingPayments({
            booking_id,
            transaction_status
        })


        return {
            status: true,
            status_code: 201,
            message: "Transaksi Berhasil Diupdate",
            data: {
                booking_notification: updatedTransaction,
                booking_payments: updatedTransactionStatusInBookingPayments
            }
        }
    }
    // ------------------------------- End Handle Booking Notification ------------------------------- //





    // ------------------------------- Handle Booking Confirm ------------------------------- //
    static async handleBookingConfirm({ booking_id, tentor_id }) {
        if(!booking_id){
            return {
                status: false,
                status_code: 400,
                message: "Booking ID wajib diisi",
                data: {
                    booking_confirm: null,
                }
            }
        }

        if(!tentor_id){
            return {
                status: false,
                status_code: 400,
                message: "Tentor ID wajib diisi",
                data: {
                    booking_confirm: null,
                }
            }
        }

        const getBookingById = await bookingsRepository.getBookingById({ booking_id });

        if(!getBookingById){
            return {
                status: false,
                status_code: 400,
                message: "Booking Tidak Ditemukan",
                data: {
                    booking_confirm: null,
                }
            }
        }

        if(getBookingById.booking_payment.tentor_id == tentor_id){
            const acceptedBooking = await bookingsRepository.handleBookingConfirm({ booking_id })
            return {
                status: true,
                status_code: 201,
                message: "Booking Telah Diterima",
                data: {
                    booking_confirm: acceptedBooking,
                }
            }
        }else{
            return {
                status: false,
                status_code: 400,
                message: "Tentor ID tidak sesuai dengan Booking ID",
                data: {
                    booking_confirm: null,
                }
            }
        }

        // if(getBookingById.stat)


        
    }
    // ------------------------------- End Handle Booking Confirm ------------------------------- //

    static async handleGetBookingByStudentId({user_id}) {
        const handleGetBookingLists = await bookingsRepository.getBookingListsByStudentId({user_id})

        if(!handleGetBookingLists){
            return {
                status: false,
                status_code: 404,
                message: "Data Booking By Student Id gagal didapatkan",
                data: {
                    booking_lists: null,
                }
            }
        }

        return {
            status: true,
            status_code: 200,
            message: "Data Booking By Student Id berhasil didapatkan",
            data: {
                booking_lists: handleGetBookingLists[0],
            }
        }

    }




    static async handleGetTransactionByStudentId({user_id}) {
        const handleGetTransaction = await bookingsRepository.getTransactionByStudentId({user_id})

        if(!handleGetTransaction){
            return {
                status: false,
                status_code: 404,
                message: "Data Transaksi By Tentor Id gagal didapatkan",
                data: {
                    transaction_lists: null,
                }
            }
        }

        return {
            status: true,
            status_code: 200,
            message: "Data Transaksi By Tentor Id berhasil didapatkan",
            data: {
                transaction_lists: handleGetTransaction[0],
            }
        }

    }


    static async handleGetBookingByTentorId({tentor_id}) {
        const handleGetBookingLists = await bookingsRepository.getBookingListsByTentorId({tentor_id})

        if(!handleGetBookingLists){
            return {
                status: false,
                status_code: 404,
                message: "Data Booking By Tentor Id gagal didapatkan",
                data: {
                    booking_lists: null,
                }
            }
        }

        return {
            status: true,
            status_code: 200,
            message: "Data Booking By Tentor Id berhasil didapatkan",
            data: {
                booking_lists: handleGetBookingLists[0],
            }
        }

    }

    static async handleGetBookingTodayByTentorId({tentor_id}) {
        const today = moment().format('YYYY-MM-DD')
        const handleGetBookingLists = await bookingsRepository.getBookingListsTodayByTentorId({tentor_id, today})

        if(!handleGetBookingLists){
            return {
                status: false,
                status_code: 404,
                message: "Data Booking Today By Tentor Id gagal didapatkan",
                data: {
                    booking_lists: null,
                }
            }
        }

        return {
            status: true,
            status_code: 200,
            message: "Data Booking Today By Tentor Id berhasil didapatkan",
            data: {
                booking_lists: handleGetBookingLists[0],
            }
        }

    }    

    static async handleStartClass({booking_id}) {
        const handlePutStartClass = await bookingsRepository.handleStartClass({booking_id})

        if(!handlePutStartClass){
            return {
                status: false,
                status_code: 404,
                message: "Booking List By Id gagal dimulai",
                data: {
                    booking_started: null,
                }
            }
        }

        return {
            status: true,
            status_code: 200,
            message: "Booking List By Id berhasil dimulai",
            data: {
                booking_started: handlePutStartClass,
            }
        }

    }

    static async handleEndClass({booking_id, topic_class, url_activity_picture}) {
        if(!booking_id){
            return {
                status: false,
                status_code: 500,
                message: "Booking Id wajib diisi",
                data: {
                    booking_ended: null,
                }
            }
        }
        else if(!topic_class){
            return {
                status: false,
                status_code: 500,
                message: "Topik Kelas wajib diisi",
                data: {
                    booking_ended: null,
                }
            }
        }
        else if(!url_activity_picture){
            return {
                status: false,
                status_code: 500,
                message: "Bukti foto wajib diisi",
                data: {
                    booking_ended: null,
                }
            }
        }

        const handlePutEndClass = await bookingsRepository.handleEndClass({booking_id, topic_class, url_activity_picture})

        if(!handlePutEndClass){
            return {
                status: false,
                status_code: 404,
                message: "Booking List By Id gagal diakhiri",
                data: {
                    booking_ended: null,
                }
            }
        }

        return {
            status: true,
            status_code: 200,
            message: "Booking List By Id berhasil diakhiri",
            data: {
                booking_ended: handlePutEndClass,
            }
        }

    }


    static async handleValidateClass({booking_id, tentor_id, user_id, rate, text_review}) {
        if(!booking_id){
            return {
                status: false,
                status_code: 500,
                message: "Booking ID dibutuhkan",
                data: {
                    booking_validated: null,
                }
            }
        }

        if(!tentor_id){
            return {
                status: false,
                status_code: 500,
                message: "Tentor ID dibutuhkan",
                data: {
                    booking_validated: null,
                }
            }
        }

        if(!user_id){
            return {
                status: false,
                status_code: 500,
                message: "User ID dibutuhkan",
                data: {
                    booking_validated: null,
                }
            }
        }


        const handlePutValidateClass = await bookingsRepository.handleValidateClass({booking_id})

        if(!handlePutValidateClass){
            return {
                status: false,
                status_code: 404,
                message: "Booking List By Id gagal divalidasi",
                data: {
                    booking_validated: null,
                }
            }
        }

        let addedReview = null

        if(rate || text_review){
            const handleAddReview = await reviewsRepository.handleAddReview({
                user_id, 
                tentor_id,
                rate,
                text_review
            })

            addedReview = handleAddReview
        }

        return {
            status: true,
            status_code: 200,
            message: "Booking List By Id berhasil divalidasi",
            data: {
                booking_validated: handlePutValidateClass,
                added_review: addedReview
            }
        }

    }



    static async handleExpiredClass({booking_id}) {
        const handlePutExpiredClass = await bookingsRepository.handleExpiredClass({booking_id})

        if(!handlePutExpiredClass){
            return {
                status: false,
                status_code: 404,
                message: "Booking List By Id gagal diupdate kadaluwarsa",
                data: {
                    booking_expired: null,
                }
            }
        }

        return {
            status: true,
            status_code: 200,
            message: "Booking List By Id berhasil diupdate kadaluwarsa",
            data: {
                booking_expired: handlePutExpiredClass,
            }
        }

    }

}

module.exports = BookingsService