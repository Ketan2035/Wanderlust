const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { listingSchema } = require("../schema.js");
const listing = require("../models/listing");



const validatelisting = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw new expressError(400, error);
  } else {
    next();
  }
};

//index route

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const alllistings = await listing.find({});
    res.render("listings/index.ejs", { alllistings });
  })
);

//new route

router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show route

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const Listing = await listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { Listing });
  })
);

//create route

router.post(
  "/",
  validatelisting,
  wrapAsync(async (req, res, next) => {
    const newlisting = new listing(req.body.listing);
    await newlisting.save();
    req.flash("success" ,"New Listing Created ! ");
    res.redirect("/listings");
  })
);

//edit   route

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/edit.ejs", { Listing });
  })
);

//update route

router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success" ,"Listing Updated ! ");
    res.redirect(`/listings/${id}`);
  })
);

//delete route

router.delete(
  "/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    if (!id) {
      const err = new Error({ message: "error aa gaya" });
      const statusCode = 400;
      next(err);
    }
    let deletelisting = await listing.findByIdAndDelete(id);
    req.flash("success" ," Listing Deleted successfully ! ");
    console.log(deletelisting);
    res.redirect("/listings");
  })
);

module.exports = router;
