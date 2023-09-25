const {reviews, registers, students, sequelize } = require('../models');

class ReviewsRepository{
    static async handleAddReview({
        user_id,
        tentor_id,
        rate,
        text_review
    }) {
        const postReview = await reviews.create({
            user_id,
            tentor_id,
            rate,
            text_review
        })

        return postReview
    }

    static async handleGetReviewsByTentorId({tentor_id}){
        const getReviews = await sequelize.query(
            `
                SELECT 
                    registers.name as student_name,
                    students.url_picture as student_image,
                    students.school_name as student_school,
                    reviews.*
                    FROM reviews JOIN registers ON reviews.user_id = registers.id
                    JOIN students ON reviews.user_id = students.id
                    WHERE reviews.tentor_id = ${tentor_id}
                    ORDER BY reviews.createdAt DESC
            `,
            {
                type: sequelize.QueryTypes.SELECT
            }
        )

        return getReviews
    }

}

module.exports = ReviewsRepository