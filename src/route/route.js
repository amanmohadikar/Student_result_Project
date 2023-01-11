const express = require("express")
const router = express.Router()

router.get("/test",function(req,res){
    return res.send({message : "ok"})
})


module.exports = router