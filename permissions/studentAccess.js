const Room = require('../model/Room')
const Student = require('../model/Student')


const checkStudentExist = async(req, res, next) => {
    try{
        const data = await Student.findOne({ roll: req.params.studentId})
        if(data){req.student_exist = [data.sex] }
        else {req.student_exist = false}
    }catch(err){ next() }
    next()
}

const studentAlloted = async(req, res, next) => {
    try{
        req.student_alloted = false
        if(req.student_exist){
            const data = await Room.findOne({ status: [req.params.studentId]})
            if(data){ req.student_alloted = data._id }
        }
    }catch(err){ next() }
    next()
}


module.exports = {
    checkStudentExist, studentAlloted
}