const express = require("express");
const router =express.Router();
const user=require("../../models/Users");
const gravater = require("gravatar");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const key =require("../../config/keys");
const passport=require("passport");
const validateregister =require("../../validation/register");
const validateloginInput = require("../../validation/login")

router.get("/test",(req,res)=>res.json({
    msg:"user works"
}));

router.post("/register",(req,res)=>{
 
  const{ errors,isValid }=validateregister(req.body);
console.log(isValid);
  if(!isValid){
    return res.status(400).json(errors);
  }

    console.log(req.body.name);
user.findOne({email:req.body.email},(user,err)=>{

        if(user){
             errors.email="email alreay exists"
            return res.status(400).json(errors);
        }
        else{
            const avatar= gravater.url(req.body.email,{s: '200', r: 'pg', d: 'mm'})
            const newusers = new users({
                name :req.body.name,
                email:req.body.email,
                avatar:avatar,
                password:req.body.password
    
            })
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newusers.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newusers.password=hash;
                    newusers.save()
                    .then(user=>res.json(user))
                    .catch(err =>console.log(err))
                })
            })
        }
    
    
    }

)



})



router.post("/login",(req,res)=>{

const {errors,isValid}=validateloginInput(req.body);
if(!isValid){
  return res.status(400).json(errors);
}

const email = req.body.email;
const password =req.body.password;
console.log(email)
user.findOne({email}).then(user=>{
    console.log(user);
    if(!user){
     errors.email="user not found "
        return res.status(404).json(errors);
        
        }
        
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              
              const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
               console.log(payload.name);
              // Sign Token
              jwt.sign(
                payload,
                key.secretOrkey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );
            } else {
              errors.password="password is incorrect "
              return res.status(400).json(errors);
            }
          });




})


})

router.get("/current",passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      });

    })
      router.get("/all",(req,res)=>{
        const usx=[];
       user.find().then((user)=>{
        user.forEach( (x)=>{
          

          usx.push(x.name);
        
        }
          

        )
        console.log(usx)
      res.json(usx);
      }
        )
        // res.json(user.name)});
})

module.exports=router;