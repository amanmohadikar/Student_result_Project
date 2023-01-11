const express = require("express")
const router = express.Router()
const studentController = require("../controller/studentController")

router.get("/test",function(req,res){
    return res.send({message : "ok"})
})


router.post("/createStudent", studentController.createStudentData)

router.get("/getStudent", studentController.getDataByFilter)

router.delete("/deleteStudent/:studentId", studentController.deleteStudenet)

router.put("/updateStudent/:studentId", studentController.updateStudent)
module.exports = router