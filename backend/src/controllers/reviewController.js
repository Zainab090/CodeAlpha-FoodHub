const reviewService = require("../services/reviewService");

const getReviews = async (req, res) => {
  try {

    const foodId = req.params.foodId;

    const reviews =
      await reviewService.getReviewsByFoodId(foodId);

    res.json(reviews);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to load reviews",
    });

  }
};

const createReview = async (req, res) => {
  try {

    const review =
      await reviewService.createReview(req.body);

    res.status(201).json(review);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to create review",
    });

  }
};

module.exports = {
  getReviews,
  createReview,
};