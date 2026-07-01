const foodService = require('../services/foodService');

const getFoods = async (req, res) => {

    try {

        const foods = await foodService.getAllFoods();

        res.json(foods);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const getFoodById = async (req, res) => {

    try {

        const food = await foodService.getFoodById(req.params.id);

        if (!food) {

            return res.status(404).json({
                message: "Food not found"
            });

        }

        res.json(food);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const getFoodsByCategory = async (req, res) => {

    try {

        const foods =
            await foodService.getFoodsByCategory(
                req.params.category
            );

        res.json(foods);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {

    getFoods,
    getFoodById,
    getFoodsByCategory

};