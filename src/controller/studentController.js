const studentModel = require("../model/studentModel")
const { isValidName, isValidDecimalNumber } = require("../validator/validator")

const createStudentData = async function (req, res) {
    try {
        let data = req.body
        let { name, subject, marks } = data
        if (!name) return res.status(400).send({ status: false, message: "name is not present" })
        if (!isValidName(name)) return res.status(400).send({ status: false, message: "name is not valid" })

        if (!subject) return res.status(400).send({ status: false, message: "subject is not present" })
        if (!isValidName(subject)) return res.status(400).send({ status: false, message: "subject is not valid" })

        if (!marks) return res.status(400).send({ status: false, message: "marks is not present" })
        if (!isValidDecimalNumber(marks)) return res.status(400).send({ status: false, message: "marks is not valid" })

        const oldStudent = await studentModel.findOne({ name: name, subject: subject })
        if (oldStudent) {
            let marks = oldStudent.marks + data.marks
            const update = await studentModel.findOneAndUpdate({ name: name, subject: subject }, { marks: marks }, { new: true })
            return res.status(200).send({ status: true, msg: "student marks updated successfully", data: update })
        }

        let newData = await studentModel.create(data)


        return res.status(201).send({ status: false, message: newData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const getDataByFilter = async function (req, res) {
    try {
        let data = req.query
        let { name, subject } = data
        let obj = {
            isDeleted: false
        }

        if (name) {
            obj.name = name
        }
        if (subject) {
            obj.subject = subject
        }
        let getData = await studentModel.find(obj)
        return res.status(200).send({ status: false, message: getData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const deleteStudenet = async function (req, res) {
    try {
        let studentId = req.params.studentId
        let isIdPresent = await studentModel.findById(studentId)
        if (!isIdPresent) return res.status(404).send({ status: false, message: "student ID not exist" })
        if (isIdPresent.isDeleted == true) return res.status(400).send({ status: false, message: "Data is already deleted" })
        await studentModel.findByIdAndUpdate({ _id: studentId }, { $set: { isDeleted: true } })
        return res.status(200).send({ status: false, message: "Data successfully deleted" })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const updateStudent = async function (req, res) {
    try {
        let studentId = req.params.studentId
        let isIdPresent = await studentModel.findById(studentId)
        if (!isIdPresent) return res.status(404).send({ status: false, message: "student ID not exist" })
        if(isIdPresent.isDeleted == true) return res.status(400).send({status : false, message : "data is already deleted"})

        let data = req.body
        let { name, subject, marks } = data
        if (name) {
            if (!isValidName(name)) return res.status(400).send({ status: false, message: "name is not valid" })
        }
        if (subject) {
            if (!isValidName(subject)) return res.status(400).send({ status: false, message: "subject is not valid" })
        }
        if (marks) {
            if (!isValidDecimalNumber(marks)) return res.status(400).send({ status: false, message: "marks is not valid" })
        }

        let updateData = await studentModel.findByIdAndUpdate({ _id: studentId }, { $set: { name, subject, marks } }, { new: true })
        return res.status(201).send({ status: false, message: updateData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createStudentData, getDataByFilter, deleteStudenet, updateStudent }