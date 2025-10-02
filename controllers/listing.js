const listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const alllistings = await listing.find({});
  res.render("listings/index.ejs", { alllistings });
};

module.exports.renderNewForm = (req, res) => {
  console.log(req.user);
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const Listing = await listing
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!Listing) {
    req.flash("error", "listing you are requested for does not exist! ");
    return res.redirect("/listings");
  }
  // console.log(Listing);
  res.render("listings/show.ejs", { Listing });
};
module.exports.createListing = async (req, res, next) => {
  const newlisting = new listing(req.body.listing);
  newlisting.owner = req.user._id;
  await newlisting.save();
  req.flash("success", "New Listing Created ! ");
  res.redirect("/listings");
};
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const Listing = await listing.findById(id);
  if (!Listing) {
    req.flash("error", "listing you are requested for does not exist! ");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { Listing });
};
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated ! ");
  res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res, next) => {
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
};
