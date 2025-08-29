const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing")

main().then((res)=>{
    console.log("connection succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/testlisting",async(req,res)=>{
    let samplelisting=new listing({
        title:"my new villa",
        description:"by the beach",
        price:1200,
        location:"vaishali ,bihar",
        country:"india",
    })
    await samplelisting.save();
    console.log("sample was saved");
    res.send("testing sucessful")
})

app.get("/",(req,res)=>{
    res.send("hii this is root");
})

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})