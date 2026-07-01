const express = require('express');

const router = express.Router();

const {

    getFoods,
    getFoodById,
    getFoodsByCategory

} = require('../controllers/foodController');

router.get('/', getFoods);

router.get('/category/:category', getFoodsByCategory);

router.get('/:id', getFoodById);

module.exports = router;