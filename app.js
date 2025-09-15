const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const expressError = require("./utils/expressError");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

main()
  .then((res) => {
    console.log("connection succesfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
  res.send("hii this is root");
});

const validatelisting = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw new expressError(400, error);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw new expressError(400, error);
  } else {
    next();
  }
};

//index route

app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const alllistings = await listing.find({});
    res.render("listings/index.ejs", { alllistings });
  })
);

//new route

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show route

app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const Listing = await listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { Listing });
  })
);

//create route

app.post(
  "/listings",
  validatelisting,
  wrapAsync(async (req, res, next) => {
    const newlisting = new listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
  })
);

//edit   route

app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/edit.ejs", { Listing });
  })
);

//update route

app.put(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

//delete route

app.delete(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    if (!id) {
      const err = new Error({ message: "error aa gaya" });
      const statusCode = 400;
      next(err);
    }
    let deletelisting = await listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listings");
  })
);

//Review post route

app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res, next) => {
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    Listing.reviews.push(newReview);

    await newReview.save();
    await Listing.save();

    // console.log("new review saved");
    // res.send("new review saved");
    res.redirect(`/listings/${Listing._id}`);
  })
);

//review delete route

app.delete(
  "/listings/:id/review/:reviewId",
  wrapAsync(async (req, res, next) => {
    let {id ,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  })
);
// app.get("/testlisting",async(req,res)=>{
//     let samplelisting=new listing({
//         title:"my new villa",
//         description:"by the beach",
//         price:1200,
//         location:"vaishali ,bihar",
//         country:"india",
//     })
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("testing sucessful")
// })

app.all(/.*/, (req, res, next) => {
  next(new expressError(404, "page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something is wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
