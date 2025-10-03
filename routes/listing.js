const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { listingSchema } = require("../schema.js");
const listing = require("../models/listing");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const User = require("../models/user.js");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const listingcontroller = require("../controllers/listing.js");

//index route  and create route
router
  .route("/")
  .get(wrapAsync(listingcontroller.index))
  // .post(
  //   isLoggedIn,
  //   validatelisting,
  //   wrapAsync(listingcontroller.createListing)
  // );
  .post(upload.single('listing[image]'),(req,res)=>{
    res.send(req.file);
  })

//new route

router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

//show route  update and delete

router
  .route("/:id")
  .get(wrapAsync(listingcontroller.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validatelisting,
    wrapAsync(listingcontroller.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingcontroller.destroyListing));

//edit   route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  validatelisting,
  wrapAsync(listingcontroller.renderEditForm)
);

module.exports = router;
