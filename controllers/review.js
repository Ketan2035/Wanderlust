const Review = require("../models/review.js");
const listing = require("../models/listing");

module.exports.reviewPost = async (req, res, next) => {
  let Listing = await listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  Listing.reviews.push(newReview);

  await newReview.save();
  await Listing.save();
  req.flash("success", " New Review Added! ");
  // console.log("new review saved");
  // res.send("new review saved");
  res.redirect(`/listings/${Listing._id}`);
};

module.exports.reviewDelete = async (req, res, next) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted !  ");
  res.redirect(`/listings/${id}`);
};
