const router = require('express').Router()
const verify = require('../middleware/verifyToken')
const Student = require('../model/Student')
const { FEE } = require('../data/static')
const { feeValidation } = require('../validation')


//View student fee
router.get('/:studentId', verify, async(req, res) => {
    try{
        const student = await Student.findOne({ roll: req.params.studentId })
        if(student.length === 0) return res.status(400).send('Invalid Roll Number')
        res.send({
            fee_structure: FEE,
            fee_paid: student.fee
        })
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.post('/add/:studentId', verify, async(req, res) => {
    try{

        //Validation
        const { error } = feeValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const update = {
            date: req.body.date || Date.now(),
            amount: req.body.amount,
        }

        const fee = await Student.findOneAndUpdate(
            { roll:req.params.studentId},
            { $push:{ fee: update } }
        )

        res.send(fee)
    }catch(err){
        res.status(400).send(err.message)
    }
})

//Delete fee id
router.get('/delete/:studentId/:feeId', verify, async(req, res) => {
    try{

        const fee = await Student.findOneAndUpdate(
            { roll:req.params.studentId },
            { $pull:{ fee:{_id: req.params.feeId} } },
            { safe: true, multi: false }
        )
        
        res.send(fee)
    }catch(err){
        res.status(400).send(err.message)
    }
})


module.exports = router