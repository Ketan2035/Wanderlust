const mongoose = require("mongoose");
const initdata = require("./data");
const listing = require("../models/listing");

main()
  .then((res) => {
    console.log("connection succesfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  await listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "68cd28f8691e2189e2940910",
  }));
  await listing.insertMany(initdata.data);
  console.log("data was initilized");
};

initDB();
