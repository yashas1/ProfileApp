const express = require("express");
const router =express.Router();
const mongoose=require("mongoose");
const passport=require("passport");
const validateExprinput=require("../../validation/exprience");

const  validateEducationinput=require("../../validation/education")

const validateprofienput=require("../../validation/profile")

const profile=require("../../models/profile");
const user=require("../../models/Users");
router.get("/test",(req,res)=>res.json({
    msg:"profile works"
}));


router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const errors={}
profile.findOne({user:req.user.id})

.then(profile=>{
if(!profile){
    errors.noprofile="no profile for this user"
return res.status(404).json(errors);
}
res.json(profile);

})
.catch(err=>res.status(400).json(err));

})

router.get("/all",(req,res)=>{
    profile.find()
    .populate("user",['name','avatar'])
    .then(profiles=>{
        if(!profiles){
            errors.noprofile="there is no profiles"
        return res.status(404).json(errors);
        }
        res.json(profiles);
        
        })
        .catch(err=>res.status(400).json({profile:"there is no profiles "}));
    
    
    })
    


router.get("/handle/:handle",(req,res)=>{
profile.findOne({handle:req.params.handle})
.populate("user",['name','avatar'])
.then(profile=>{
    if(!profile){
        errors.noprofile="no profile for this user"
    return res.status(404).json(errors);
    }
    res.json(profile);
    
    })
    .catch(err=>res.status(400).json({profile:"ther is no profile for this handle"}));


})


router.get("/user/:user_id",(req,res)=>{
    profile.findOne({user:req.params.user_id})
    .populate("user",['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile="no profile for this user"
        return res.status(404).json(errors);
        }
        res.json(profile);
        
        })
        .catch(err=>res.status(400).json({profile:"ther is no profile for this user"}));
    
    
    })

router.post("/",passport.authenticate('jwt',{session:false}),(req,res)=>{

    const {errors,isValid} = validateprofienput(req.body);

    if(!isValid){

        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
 
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

 console.log(req.user.id);
 profile.findOne({user: req.user.id})
 .then(Profile=>{
     console.log(Profile);
  if(Profile){
   //if present then need to update
   profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true }
  ).then(x => res.json(x));

  }else{
   //if not presnt then need to create 
   
//check if handle exists 
profile.findOne({handle:profileFields.handle})
.then(Profile=>{
    console.log("handle is there")
    if(Profile){
errors.handle="that handle already exist"
res.status(400).json(errors);

    }
    // Save Profile
     new profiles(profileFields).save().then(profile => res.json(profile));
})


  }

 })


})

router.post("/exprience",passport.authenticate('jwt',{session:false}),(req,res)=>{

    const {errors,isValid} = validateExprinput(req.body);

    if(!isValid){

        return res.status(400).json(errors);
    }

    profile.findOne({user:req.user.id})
    .then(profile=>{
     const newexp={
     title:req.body.title,
     company:req.body.company,
     location:req.body.location,
     from:req.body.from,
     to:req.body.to,
     current:req.body.current,
     description:req.body.discription

     }
      profile.experience.unshift(newexp);
     profile.save().then(profile=>{
         res.json(profile);
     })

    })
})


router.post("/education",passport.authenticate('jwt',{session:false}),(req,res)=>{

    const {errors,isValid} = validateEducationinput(req.body);

    if(!isValid){

        return res.status(400).json(errors);
    }

    profile.findOne({user:req.user.id})
    .then(profile=>{


     const neweducation={
        school:req.body.school,
        degree:req.body.degree,
        branch:req.body.branch,
     from:req.body.from,
     to:req.body.to,
     current:req.body.current,
     description:req.body.discription

     }
     if (profile.education.length>0){
      res.status(400).json({err:"only you can add one educational details"});

     }
     else{
     profile.education.unshift(neweducation);
      profile.save().then(profile=>{
         res.json(profile);
        
     })}

    })
})



router.delete("/exprience/:exp_id",passport.authenticate('jwt',{session:false}),(req,res)=>{

  
    profile.findOne({user:req.user.id})
    .then(profile=>{
        console.log(profile.experience);
     const removeIndex = profile.experience.findIndex(x=>{ x.id===req.params.exp_id})
    //  .map(iteam =>iteam.id).indexOf(req.params.exp_id);
   
     profile.experience.splice(removeIndex,1);



     profile.save().then(profile=>res.json(profile));
    

    }).catch(err=>res.status(404).json(err));
})



router.delete("/education/:ed_id",passport.authenticate('jwt',{session:false}),(req,res)=>{

  
    profile.findOne({user:req.user.id})
    .then(profile=>{
        console.log(profile.education);
     const removeIndex = profile.education.findIndex(x=>{ x.id===req.params.ed_id})
    //  .map(iteam =>iteam.id).indexOf(req.params.exp_id);
   
     profile.education.splice(removeIndex,1);



     profile.save().then(profile=>res.json(profile));
    

    }).catch(err=>res.status(404).json(err));
})


router.delete("/",passport.authenticate('jwt',{session:false}),(req,res)=>{

  
    profile.findOneAndRemove({user:req.user.id})
    .then(()=>{
     user.findOneAndDelete({_id:req.user.id})
     .then(()=> res.status(400).json({sucess:"sucess"}))
   

    }).catch(err=>res.status(404).json(err));
})

module.exports=router;