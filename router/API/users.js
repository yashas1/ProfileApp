const express = require("express");
const router =express.Router();
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })
router.get("/test",(req,res)=>res.json({
    msg:"user works"
}));

module.exports=router;