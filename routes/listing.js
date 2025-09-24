const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { listingSchema } = require("../schema.js");
const listing = require("../models/listing");
const { isLoggedIn ,isOwner ,validatelisting } = require("../middleware.js");
const User = require("../models/user.js");


//index route

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const alllistings = await listing.find({});
    res.render("listings/index.ejs", { alllistings });
  })
);

//new route

router.get("/new", isLoggedIn, (req, res) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to create new listing");
    return res.redirect("/login");
  }
  res.render("listings/new.ejs");
});

//show route

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const Listing = await listing
      .findById(id)
      .populate("reviews")
      .populate("owner");
    if (!Listing) {
      req.flash("error", "listing you are requested for does not exist! ");
      return res.redirect("/listings");
    }
    // console.log(Listing);
    res.render("listings/show.ejs", { Listing });
  })
);

//create route

router.post(
  "/",
  isLoggedIn,
  validatelisting,
  wrapAsync(async (req, res, next) => {
    const newlisting = new listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "New Listing Created ! ");
    res.redirect("/listings");
  })
);

//edit   route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  validatelisting,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const Listing = await listing.findById(id);
    if (!Listing) {
      req.flash("error", "listing you are requested for does not exist! ");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { Listing });
  })
);

//update route

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validatelisting,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated ! ");
    res.redirect(`/listings/${id}`);
  })
);

//delete route

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    if (!id) {
      const err = new Error({ message: "error aa gaya" });
      const statusCode = 400;
      next(err);
    }
    let deletelisting = await listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted successfully ! ");
    console.log(deletelisting);
    res.redirect("/listings");
  })
);

module.exports = router;
