const pool = require('../config/db');

const getAllFoods = async () => {

    const result = await pool.query(`
        SELECT
            foods.id,
            foods.name,
            foods.description,
            foods.price,
            foods.image,
            foods.preparation_time,
            foods.calories,
            foods.available,
            categories.name AS category

        FROM foods

        JOIN categories
        ON foods.category_id = categories.id

        ORDER BY foods.id
    `);

    return result.rows;
};

const getFoodById = async (id) => {

    const result = await pool.query(

        `
        SELECT
            foods.id,
            foods.name,
            foods.description,
            foods.price,
            foods.image,
            foods.preparation_time,
            foods.calories,
            foods.available,
            categories.name AS category

        FROM foods

        JOIN categories
        ON foods.category_id = categories.id

        WHERE foods.id = $1
        `,

        [id]

    );
    

    return result.rows[0];

};
const getFoodsByCategory = async (category) => {

    const result = await pool.query(

        `
        SELECT
            foods.id,
            foods.name,
            foods.description,
            foods.price,
            foods.image,
            foods.preparation_time,
            foods.calories,
            foods.available,
            categories.name AS category

        FROM foods

        JOIN categories
        ON foods.category_id = categories.id

        WHERE categories.name = $1

        ORDER BY foods.id
        `,

        [category]

    );

    return result.rows;

};
module.exports = {

    getAllFoods,
    getFoodById,
    getFoodsByCategory

};
