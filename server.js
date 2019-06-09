const express =require('express');
const mongoose = require('mongoose');
const bodyparser =require("body-parser");
const path = require('path');

const app= express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const port= process.env.PORT || 5000;
const users = require("./router/API/users");
const profile = require("./router/API/profile");
const posts = require("./router/API/posts");    
const db=require("./config/keys").mongoURI;
const passport = require("passport");
mongoose.connect(db,{ useNewUrlParser: true })
.then(()=>{console.log("mongobd connected")})
.catch((err)=>{console.log(err)});

require("./config/passport")(passport);
app.use(passport.initialize());
app.use("/api/users",users);
app.use("/api/profile",profile);
app.use("/api/post",posts);


if(process.env.NODE_ENV === 'production'){
     app.use(express.static('client/build'));
     app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
     });
}
app.listen(port,()=>{
console.log(`server running on port ${port}`);

})
