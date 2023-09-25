const {
    tentors,
    tentor_experiences,
    tentor_achievements,
    tentor_proposals,
    tentor_schedules,
    registers,
    sequelize
} = require('../models');

class TentorsRepository {

    // ------------------------------- Get Tentor By tentor_id ------------------------------- //

    static async getTentorById({ tentor_id }) {

        const query = {
            where: {},
            include: [{
                model: registers,
                attributes: ["name", "email", "password"]
            }]
        };

        if (tentor_id) {
            query.where = { ...query.where, tentor_id }
        }

        const getTentorsById = await tentors.findOne(query);

        return getTentorsById;
    };

    // ------------------------------- End Get Tentor By tentor_id ------------------------------- //


    // ------------------------------- Get Tentor Experience By Id ------------------------------- //

    static async getTentorExperienceById({ id }) {

        const getUser = await tentor_experiences.findOne({
            where: {
                id
            }
        });

        return getUser;
    };

    // ------------------------------- End Get Tentor Experience By Id ------------------------------- //


    // ------------------------------- Get Tentor By url_certificate ------------------------------- //

    static async getTentorByUrlCertificate({ tentor_id, url_certificate }) {

        const getUser = await tentor_achievements.findOne({
            where: {
                tentor_id,
                url_certificate
            }
        });

        return getUser;
    };

    // ------------------------------- End Get Tentor By url_certificate ------------------------------- //


    // ------------------------------- Get Tentor Proposal By Id ------------------------------- //

    static async getTentorProposalById({ tentor_id }) {

        const getUser = await tentor_proposals.findOne({
            where: {
                tentor_id
            }
        });

        return getUser;
    };

    // ------------------------------- End Get Tentor Proposal By Id ------------------------------- //


    // ------------------------------- Handle Tentor Biodata Section 1 ------------------------------- //

    static async handleTentorsBiodataSection1({
        id,
        tentor_id,
        username,
        gender,
        date_of_birth,
        no_handphone
    }) {

        const createdTentorBiodata = await tentors.create({
            id,
            tentor_id,
            username,
            gender,
            date_of_birth,
            no_handphone
        });

        return createdTentorBiodata;
    };

    // ------------------------------- End Handle Tentor Biodata Section 1 ------------------------------- //


    // ------------------------------- Handle Update Id Join Tentor Biodata ------------------------------- //

    static async handleUpdateIdJoin({
        tentor_id,
        experience_id,
        achievement_id,
        proposal_id,
        schedule_id
    }) {

        const updatedIdJoin = await tentors.update({
            experience_id,
            achievement_id,
            proposal_id,
            schedule_id
        }, {
            where: { tentor_id }
        });

        return updatedIdJoin;
    };

    // ------------------------------- Handle Update Id Join Tentor Biodata ------------------------------- //


    // ------------------------------- Handle Tentor Biodata Section 2 ------------------------------- //

    static async handleTentorsBiodataSection2({ tentor_id, address, pin_point }) {

        const udpatedTentorsBiodataSection2 = await tentors.update({
            address,
            pin_point
        }, {
            where: {
                tentor_id
            }
        });

        return udpatedTentorsBiodataSection2;
    };

    // ------------------------------- End Handle Tentor Biodata Section 2 ------------------------------- //


    // ------------------------------- Handle Tentor Biodata Section 3 ------------------------------- //

    static async handleTentorsBiodataSection3({
        tentor_id,
        last_education,
        institution_name,
        tentor_major,
        graduation_year
    }) {

        const udpatedTentorsBiodataSection3 = await tentors.update({
            last_education,
            institution_name,
            tentor_major,
            graduation_year
        }, {
            where: {
                tentor_id
            }
        });

        return udpatedTentorsBiodataSection3;
    };

    // ------------------------------- End Handle Tentor Biodata Section 3 ------------------------------- //


    // ------------------------------- Handle Tentor Biodata Section 4 ------------------------------- //

    static async handleTentorsBiodataSection4({
        tentor_id,
        experience_id,
        teaching_place,
        teaching_role,
        teaching_start_date,
        teaching_end_date,
        isTeaching
    }) {

        const createdTentorsBiodataSection4 = await tentor_experiences.create({
            tentor_id,
            experience_id,
            teaching_place,
            teaching_role,
            teaching_start_date,
            teaching_end_date,
            isTeaching
        });

        return createdTentorsBiodataSection4;
    };

    // ------------------------------- End Handle Tentor Biodata Section 4 ------------------------------- //


    // ------------------------------- Handle Delete Tentor Biodata Section 4 ------------------------------- //

    static async handleDeleteTentorsBiodataSection4({ id }) {

        const deletedTentorsExperienceBiodataSection4 = await tentor_experiences.destroy({
            where: {
                id
            }
        });

        return deletedTentorsExperienceBiodataSection4;
    };

    // ------------------------------- End Handle Delete Tentor Biodata Section 4 ------------------------------- //


    // ------------------------------- Handle Tentor Biodata Section 5 ------------------------------- //

    static async handleTentorsBiodataSection5({ tentor_id, achievement_id, achievement_name, organizer_name, date_of_activity, url_certificate }) {

        const createdTentorsBiodataSection5 = await tentor_achievements.create({
            tentor_id,
            achievement_id,
            achievement_name,
            organizer_name,
            date_of_activity,
            url_certificate
        });

        return createdTentorsBiodataSection5;
    };

    // ------------------------------- End Handle Tentor Biodata Section 5 ------------------------------- //


    // ------------------------------- Handle Delete Tentor Biodata Section 5 ------------------------------- //

    static async handleDeleteTentorsBiodataSection5({ id, tentor_id }) {

        const deletedTentorsBiodataSection5 = await tentor_achievements.destroy({
            where: {
                id
            }
        });

        return deletedTentorsBiodataSection5;
    };

    // ------------------------------- End Handle Delete Tentor Biodata Section 5 ------------------------------- //


    // ------------------------------- Handle Tentor Biodata Section 6 ------------------------------- //

    static async handleTentorsBiodataSection6({ tentor_id, proposal_id, tentor_introduction, reason_for_registering, url_esay }) {

        const createdTentorsBiodataSection6 = await tentor_proposals.create({
            tentor_id,
            proposal_id,
            tentor_introduction,
            reason_for_registering,
            url_esay
        });

        return createdTentorsBiodataSection6;
    };

    // ------------------------------- End Handle Tentor Biodata Section 6 ------------------------------- //


    // ------------------------------- Handle Tentor Biodata Section 7 Schedule ------------------------------- //

    static async handleTentorsBiodataSection7Schedule({
        tentor_id,
        schedule_id,
        day,
        time,
        duration
    }) {

        const createdTentorsBiodataSection7Schedule = await tentor_schedules.create({
            tentor_id,
            schedule_id,
            day,
            time,
            duration
        });

        return createdTentorsBiodataSection7Schedule;
    };

    // ------------------------------- End Handle Tentor Biodata Section 7 Schedule ------------------------------- //


    // ------------------------------- Handle Tentor Biodata Section Finish ------------------------------- //

    static async handleTentorsBiodataSectionFinish({ tentor_id, course_interest, preferences }) {

        const createdTentorsBiodataSectionFinish = await tentor_proposals.update({
            course_interest,
            preferences
        }, {
            where: {
                tentor_id,
            }
        });

        return createdTentorsBiodataSectionFinish;
    };

    // ------------------------------- End Handle Tentor Biodata Section Finish ------------------------------- //


    // ------------------------- Handle Update Data Biodata Tentors ------------------------------- //

    static async handleUpdateBiodataTentorsByTentorId({
        tentor_id,
        username,
        gender,
        date_of_birth,
        no_handphone,
        address,
        pin_point,
        url_picture
    }) {

        const udpatedDataTentor = await tentors.update({
            username,
            gender,
            date_of_birth,
            no_handphone,
            address,
            pin_point,
            url_picture
        }, {
            where: {
                tentor_id
            }
        });

        return udpatedDataTentor;

    };

    // ------------------------- End Handle Update Data Biodata Tentors ------------------------------- //


    // ------------------------------- Handle Update Data Education Tentors ------------------------------- //

    static async handleUpdateEducationTentorsByTentorId({
        tentor_id,
        last_education,
        institution_name,
        tentor_major,
        graduation_year
    }) {

        const udpatedDataTentor = await tentors.update({
            last_education,
            institution_name,
            tentor_major,
            graduation_year
        }, {
            where: {
                tentor_id
            }
        });

        return udpatedDataTentor;

    };

    // ------------------------------- End Handle Update Data Education Tentors ------------------------------- //
    
    // ------------------------------- Handle Get Galery Tentors ------------------------------- //

    static async handleGetGaleryByTentorId({
        tentor_id,
    }) {

        const getGalery = await sequelize.query(
            `
            SELECT
                booking_lists.url_activity_picture as activity_image
                FROM booking_payments JOIN booking_lists
                ON booking_payments.id = booking_lists.booking_id
                WHERE booking_payments.tentor_id = ${tentor_id}
            `
        )

        return getGalery;

    };

    // ------------------------------- End Handle Get Galery Tentors ------------------------------- //
};

module.exports = TentorsRepository;