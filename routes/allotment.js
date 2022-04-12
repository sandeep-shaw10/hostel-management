const router = require('express').Router()
const Room = require('../model/Room')
const Student = require('../model/Student')
const verify = require('../middleware/verifyToken')
const {blockResolve, roomResolve} = require('../permissions/roomAccess')
const {checkStudentExist, studentAlloted} = require('../permissions/studentAccess')
const {BLOCK, ROLE} = require('../data/static')
const authAccess = require('../permissions/authAccess')



//Time to leave hostel
router.post('/:studentId/end', verify, authAccess(ROLE.ADMIN),checkStudentExist, studentAlloted, async(req, res)=>{
    const update = {
        end_date: req.body.end_date,
        status: 0,
    }

    const empty = {
        status: []
    }

    try{
        const student = await Student.findOneAndUpdate({ roll: req.params.studentId }, update)
        await Room.findOneAndUpdate({ _id: req.student_alloted }, empty)
        res.send(student)
    }catch(err){
        res.status(400).send('Invalid Student ID')
    }
})


//Allot room to student
router.get( '/:roomId/:studentId', 
    verify, blockResolve, roomResolve, checkStudentExist, studentAlloted,
    
    async(req, res) => {
        if(!req.student_exist) return res.send('Student not exist')

        if(req.student_alloted) return res.send('Student Already Alloted')

        try{
            const data = await Room.findOne({ _id:req.params.roomId })
            
            // Check criteria such as gender
            const check = BLOCK.filter(x => (x.id === data.block && x.type === req.student_exist[0]))
            if(check.length === 0){ return res.send(`Not available for ${req.student_exist[0]}`) }
            // end of criteria

            if(data.status.length > 0){ return res.send('Room Already Alloted') }

            const update = {
                status: [req.params.studentId]
            }

            const joinDate = { join_date: Date.now(), end_date:null , status: 1 }

            const allot = await Room.findOneAndUpdate({ _id: req.params.roomId }, update)
            await Student.findOneAndUpdate({roll: req.params.studentId }, joinDate)

            res.send(allot)
        }catch(err){
            console.log(err)
            res.status(400).send('Not Allowed')
        }
    }
)


//Deallot room
router.get('/:roomId', verify, blockResolve, roomResolve, async(req, res)=>{
    try{
        const update = {
            status: []
        }
        const deallot = await Room.findOneAndUpdate({ _id: req.params.roomId }, update)
        return res.send(deallot)
    }catch(err){
        res.status(401).send(err.message)
    }
})


module.exports = router