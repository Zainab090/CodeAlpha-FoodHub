const pool = require("../config/db");

const getReviewsByFoodId = async (foodId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM reviews
        WHERE food_id = $1
        ORDER BY created_at DESC
        `,
        [foodId]
    );

    return result.rows;
};

const createReview = async ({
    food_id,
    username,
    rating,
    comment
}) => {

    const result = await pool.query(
        `
        INSERT INTO reviews
        (food_id, username, rating, comment)

        VALUES ($1,$2,$3,$4)

        RETURNING *
        `,
        [food_id, username, rating, comment]
    );

    return result.rows[0];
};

module.exports = {
    getReviewsByFoodId,
    createReview
};