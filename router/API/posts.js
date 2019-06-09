const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const post =require("../../models/posts")
const profile=require("../../models/profile")
const router =express.Router();
const validatepostInput = require("../../validation/post");
router.get("/test",(req,res)=>res.json({
    msg:"posts works"
}));


router.get("/",(req,res)=>{

    post.find()
    .sort({date:-1})
    .then(post=>{
        
        res.json(post);
    })
    .catch(err=>res.status(404).json({err:"there are no posts"}))


})





router.get("/:id",(req,res)=>{

    post.findById(req.params.id)
  
    .then(post=>{
        res.json(post);
    })
    .catch(err=>res.status(404).json({err:"no post for that ID"}))


})



router.post("/",passport.authenticate('jwt',{session:false}),(req,res)=>{

    const{isValid,errors}=validatepostInput(req.body);

    if(!isValid){
res.status(400).json(errors);

    }
const  newPost= new post({
text:req.body.text,
name:req.body.name,
avatar:req.body.avatar,
user:req.user.id

})
newPost.save().then(post=>res.json(post));

})




router.delete("/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    profile.findOne({user:req.user.id})
    .then(profile=>{

     post.findById(req.params.id)
     .then(post=>{
         console.log(req.user.id)
            console.log(post)
        if(post.user.toString() !==req.user.id){
          return res.status(401).json({err: "user is not authorized"})
                     
        }

        post.remove().then(()=>res.json({sucess:"true"}))

     })
     .catch(err=>res.status(404).json({postNOtFound:"post not found"}))


    })

})

router.post("/likes/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    profile.findOne({user:req.user.id})
    .then(profile=>{
     post.findById(req.params.id)
     .then(post=>{
      
        if(post.likes.filter(like=>{return like.user.toString()===req.user.id}).length>0){
            
          return res.status(400).json({postalredyliked: "user already liked post"})
                     
        }

        post.likes.push({user:req.user.id});
        post.save().then(post=>{ console.log(post); res.json(post)});

       

     })
     .catch(err=>res.status(404).json({postNOtFound:"post not found"}))
     


    })

})



router.post("/unlike/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    profile.findOne({user:req.user.id})
    .then(profile=>{
     post.findById(req.params.id)
     .then(post=>{
      
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length==0){
          return res.status(400).json({notliked: "you have not yet liked the post"})
                     
        }
        

        const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id)
     
     console.log("Index"+removeIndex);
     post.likes.splice(removeIndex,1);
             console.log(post)
        post.save().then(post=>res.json(post));

       

     })
     .catch(err=>res.status(404).json({postNOtFound:"post not found"}))
     


    })

})


router.post("/comment/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{

    const{isValid,errors}=validatepostInput(req.body);

    if(!isValid){

    return res.status(400).json(errors);

    }
    
     post.findById(req.params.id)
     .then(post=>{
      const newcomment={
       text:req.body.text,
       name:req.body.name,
       avatar:req.body.avatar,
       user:req.user.id

      }
        post.comments.push(newcomment);
        post.save().then(post=>res.json(post));

       

     })
     .catch(err=>res.status(404).json({postNOtFound:"post not found"}))
     


    })

    router.delete("/comment/:id/:comment_id",passport.authenticate('jwt',{session:false}),(req,res)=>{

        
        
         post.findById(req.params.id)
         .then(post=>{

            // post.comments.forEach(x => {
            //     console.log(typeof x._id)
            // });
           if(post.comments.filter(comment=>comment._id.toString()===req.params.comment_id).length==0)
            {
             return res.status(404).json({comment:"comment doent exist"})

            }

            const removeIndex= post.comments.findIndex(x=>x._id==req.params.comment_id)
            post.comments.splice(removeIndex,1);
            post.save().then(post=>res.json(post));
    
           
    
         })
         .catch(err=>res.status(404).json({postNOtFound:"post not found"}))
         
    
    
        })

module.exports=router;