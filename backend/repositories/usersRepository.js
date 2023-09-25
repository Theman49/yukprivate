const {
    registers,
    students,
    tentors,
    tentor_achievements,
    tentor_experiences,
    tentor_proposals,
    tentor_schedules,
    sequelize,
    Sequelize
} = require('../models');

const { Op } = require("sequelize");

class UserRepository {

    // ------------------------------- Get User By Id ------------------------------- //

    static async handleGetUserById({ id }) {

        const getUserById = await registers.findOne({
            where: { id }
        });

        return getUserById;
    };

    // ------------------------------- End Get User By Id ------------------------------- //


    // ------------------------------- Get Student By Id ------------------------------- //

    static async handleGetStudentsById({ id }) {

        const query = {
            where: {},
            include: [{
                model: registers,
                attributes: ["name", "email", "password"]
            }]
        };

        if (id) {
            query.where = { ...query.where, user_id:id }
        }

        const getStudentsById = await students.findOne(query);

        return getStudentsById;
    };

    // ------------------------------- End Get Student By Id ------------------------------- //


    // ------------------------------- Get Tentor By Id After Login ------------------------------- //

    static async handleGetTentorsByIdAfterLogin({ id }) {

        const query = {
            where: {},
            include: [
                {
                    model: registers,
                    attributes: ["name", "email", "password"]
                },
                {
                    model: tentor_experiences,
                    attributes: ["teaching_place", "teaching_role", "teaching_start_date", "teaching_end_date", "isTeaching"],
                    required: false
                },
                {
                    model: tentor_achievements,
                    attributes: ["achievement_name", "organizer_name", "date_of_activity", "url_certificate"],
                    required: false
                },
                {
                    model: tentor_proposals,
                    attributes: ["tentor_introduction", "reason_for_registering", "url_esay", "course_interest", "preferences"]
                },
                {
                    model: tentor_schedules,
                    attributes: ["id","day", "time", "duration"],
                    required: false
                }
            ]
        };

        if (id) {
            query.where = { ...query.where, tentor_id: id }
        }

        const getTentorsById = await tentors.findOne(query);

        return getTentorsById;
    };

    // ------------------------------- End Get Tentor By Id After Login ------------------------------- //


    // ------------------------------- Get Tentor By Id Before Login ------------------------------- //

    static async handleGetTentorByIdBeforeLogin({ id }) {

        const query = {
            where: {},
            include: [
                {
                    model: registers,
                    attributes: ["name"]
                },
                {
                    model: tentor_experiences,
                    attributes: ["teaching_place", "teaching_role", "teaching_start_date", "teaching_end_date"],
                    required: false
                },
                {
                    model: tentor_achievements,
                    attributes: ["achievement_name", "organizer_name", "date_of_activity", "url_certificate"],
                    required: false
                },
                {
                    model: tentor_proposals,
                    attributes: ["tentor_introduction", "reason_for_registering", "url_esay", "course_interest", "preferences"]
                },
                {
                    model: tentor_schedules,
                    attributes: ["day", "time", "duration"],
                    required: false
                }
            ]
        };

        if (id) {
            query.where = { ...query.where, tentor_id: id }
        }

        const getTentorsById = await tentors.findOne(query);

        return getTentorsById;
    };

    // ------------------------------- End Get Tentor By Id Before Login ------------------------------- //


    // ------------------------------- Handle Get All Tentors ------------------------------- //

    static async handleGetAllTentors({ address, course_interest }) {

        // const query = {	     
        //     where: {},	        
        //     include: [	       
        //         {	       
        //             model: registers,	       
        //             attributes: ["name"] 	        
        //         },	       
        //         {	       
        //             model: tentor_proposals,
        //             attributes: ["course_interest"]
        //         }	   
        //     ]     
        // };

        // if (address) {
        //     const searchByLocation = await tentors.findAll({
        //         where: {
        //             [Op.or]: [
        //                 { address: { [Op.like]: '%' + address + '%' } },
        //             ]
        //         },
        //         include: [
        //             {
        //                 model: registers,
        //                 attributes: ["name"]
        //             },
        //             {
        //                 model: tentor_proposals,
        //                 attributes: ["course_interest"]
        //             }
        //         ],
        //         limit: 10,
        //     });

        //     return searchByLocation;
        // }

        // if (course_interest) {

        //     const searchByCourseInterest = await tentor_proposals.findAll({
        //         where: {
        //             [Op.or]: [
        //                 { course_interest: { [Op.like]: '%' + course_interest + '%' } },
        //             ]
        //         },
        //         include: [
        //             {
        //                 model: registers,
        //                 attributes: ["name"]
        //             },
        //             {
        //                 model: tentors,
        //                 attributes: [
        //                     "tentor_id",
        //                     "experience_id",
        //                     "achievement_id",
        //                     "proposal_id",
        //                     "schedule_id",
        //                     "username",
        //                     "gender",
        //                     "date_of_birth",
        //                     "no_handphone",
        //                     "address",
        //                     "pin_point",
        //                     "last_education",
        //                     "institution_name",
        //                     "tentor_major",
        //                     "graduation_year"
        //                 ]
        //             }
        //         ],
        //         limit: 10,
        //     });

        //     return searchByCourseInterest;
        // }

        // const getAllTentors = await tentors.findAll(query);

        // return getAllTentors;

        let countQuery = 0;
        let op1 = "";
        let op2 = "";
        let sql1 = "";
        let sql2 = "";

        if(address){
            sql1 = `tentors.address LIKE '%${address}%'`
            countQuery+=1 
        }
        if(course_interest){
            sql2 = `tentor_proposals.course_interest LIKE '%${course_interest}%'`
            countQuery+=1 
        }

        if(countQuery > 0){
            op1 = 'WHERE'
        }

        if(countQuery > 1){
            op2 = 'AND'
        }

        const getAllTentors = await sequelize.query(
            `SELECT tentors.tentor_id as id,name,institution_name,url_picture,address,course_interest FROM registers 
                JOIN tentors ON registers.id = tentors.tentor_id 
                JOIN tentor_proposals ON tentors.tentor_id = tentor_proposals.tentor_id 
                ${op1} 
                ${sql1}
                ${op2}
                ${sql2}`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        )
        return getAllTentors;

    };

    // ------------------------------- End Handle Get All Tentors ------------------------------- //


    // ------------------------------- Handle Update Students Reset Password ------------------------------- //
    
    static async handleUsersChangePassword({ email, password }) { 
    
        const updatedUserPassword = await registers.update({
            password
        }, {
            where: {
                email
            }
        });

        return updatedUserPassword;

    };

    // ------------------------------- End Handle Update Students Reset Password ------------------------------- //

};

module.exports = UserRepository;