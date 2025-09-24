const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { reviewSchema } = require("../schema.js");
const listing = require("../models/listing");
const Review = require("../models/review.js");
const {validateReview}=require("../middleware.js");


//Review post route

router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res, next) => {
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    Listing.reviews.push(newReview);

    await newReview.save();
    await Listing.save();
    req.flash("success" ," New Review Added! ");
    // console.log("new review saved");
    // res.send("new review saved");
    res.redirect(`/listings/${Listing._id}`);
  })
);

//review delete route

router.delete(
  "/:reviewId",
  wrapAsync(async (req, res, next) => {
    let {id ,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" ,"Review Deleted !  ");
    res.redirect(`/listings/${id}`);
  })
);

module.exports=router;