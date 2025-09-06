const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const expressError = require("./utils/expressError");

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

//index route

app.get("/listings", async (req, res) => {
  const alllistings = await listing.find({});
  res.render("listings/index.ejs", { alllistings });
});

//new route

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show route

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const Listing = await listing.findById(id);
  res.render("listings/show.ejs", { Listing });
});

//create route

app.post(
  "/listings",
  wrapAsync(async (req, res, next) => {
    const newlisting = new listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
  })
);

//edit   route

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const Listing = await listing.findById(id);
  res.render("listings/edit.ejs", { Listing });
});

//update route

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//delete route

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletelisting = await listing.findByIdAndDelete(id);
  console.log(deletelisting);
  res.redirect("/listings");
});

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
  let { statusCode, message } = err;
  res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
