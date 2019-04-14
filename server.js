const express =require('express');
const mongoose = require('mongoose');
const app= express();
const port= process.env.PORT || 5000;
const users = require("./router/API/users");
const profile = require("./router/API/profile");
const posts = require("./router/API/posts");    
const db=require("./config/keys").mongoURI;

mongoose.connect(db,{ useNewUrlParser: true })
.then(()=>{console.log("mongobd connected")})
.catch((err)=>{console.log(err)});


app.get('/',(req,res)=>{
res.send("hello111");

})

app.use("/api/users",users);
app.use("/api/profile",profile);
app.use("/api/post",posts);

app.listen(port,()=>{
console.log(`server running on port ${port}`);

})
