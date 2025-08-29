const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://t3.ftcdn.net/jpg/02/43/25/90/240_F_243259090_crbVsAqKF3PC2jk2eKiUwZHBPH8Q6y9Y.jpg",
        set:(v)=>
            v===""
           ? "https://t3.ftcdn.net/jpg/02/43/25/90/240_F_243259090_crbVsAqKF3PC2jk2eKiUwZHBPH8Q6y9Y.jpg"
           : v,
    },
    price:Number,
    location:String,
    country:String,
});

const listing=mongoose.model("listing",listingSchema);
module.exports=listing;