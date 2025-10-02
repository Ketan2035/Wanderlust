const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { reviewSchema } = require("../schema.js");
const listing = require("../models/listing");
const Review = require("../models/review.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewControllers=require("../controllers/review.js");

//Review post route

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewControllers.reviewPost)
);

//review delete route

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewControllers.reviewDelete)
);

module.exports = router;
