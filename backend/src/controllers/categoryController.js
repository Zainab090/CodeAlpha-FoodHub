const categoryService = require('../services/categoryService');

const getCategories = async (req, res) => {

    try {

        const categories = await categoryService.getAllCategories();

        res.json(categories);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: 'Server Error'
        });

    }

};

module.exports = {
    getCategories
};