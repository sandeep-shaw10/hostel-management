const router = require('express').Router()
const Student = require('../model/Student')
const verify = require('../middleware/verifyToken')
const authAccess = require('../permissions/authAccess')
const { studentValidation } = require('../validation')
const { ROLE } = require('../data/static')


//View all blocks
router.get('/', async(req, res) => {
    try{
        const students = await Student.find()
        res.send(students)
    }catch(err){
        res.status(400).send('Invalid Block Id')
    }
})

router.get('/:studentId', async(req, res) => {
    try{
        const student = await Student.find({ roll: req.params.studentId })
        if(student.length === 0) return res.status(400).send('Invalid Roll Number')
        res.send(student)
    }catch(err){
        res.status(400).send('Invalid Room Id')
    }
})

router.post('/add', verify, async(req, res) => {

    //Validation
    const { error } = studentValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check existing student
    const checkStudent = await Student.findOne({ roll: req.body.roll })
    if(checkStudent) return res.status(400).send('Student already exists')

    const student = new Student({
        name: req.body.name,
        roll: req.body.roll,
        email: req.body.email,
        year: req.body.year,
        sex: req.body.sex,
        course: req.body.course,
        branch: req.body.branch,
        join_date: null,
        end_date: null,
        status: 0,
        fee:[]
    })

    //Save student
    try{
        await student.save()
        res.send({ student: student._id})
    }catch(err){
        res.status(400).send(err.message)
    }
})


router.get('/delete/:studentId', verify, authAccess(ROLE.ADMIN), async(req, res) => {
    try{
        const student = await Student.findOneAndDelete({ roll: req.params.studentId })
        res.send(student)
    }catch(err){
        res.status(400).send(err.message)
    }
})


router.post('/update/:studentId', verify, authAccess(ROLE.ADMIN), async(req, res) => {

    //Validation
    const { error } = studentValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check existing student
    const checkStudent = await Student.findOne({ roll: req.body.roll })
    if(checkStudent) return res.status(400).send('Student already exists')

    const update = {
        name: req.body.name,
        // roll: req.body.roll,
        email: req.body.email,
        year: req.body.year,
        sex: req.body.sex,
        course: req.body.course,
        branch: req.body.branch,
        join_date: req.body.join_date,
        end_date: req.body.end_date,
        status: req.body.status,
    }

    try{
        const student = await Student.findOneAndUpdate({ roll: req.params.studentId }, update)
        res.send(student)
    }catch(err){
        res.status(400).send(err.message)
    }
})


module.exports = router