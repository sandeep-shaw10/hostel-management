const router = require('express').Router()
const Room = require('../model/Room')
const verify = require('../middleware/verifyToken')
const { roomAddValidation } = require('../validation')
const {blockResolve, roomResolve} = require('../permissions/roomAccess')
const { ROLE } = require('../data/static')

//view all rooms
router.get('/', async(req, res) => {
    try{
        const rooms = await Room.find()
        res.send(rooms)
    }catch(err){
        res.status(400).send('Invalid Block Id')
    }
})

//View rooms by Id
router.get('/:roomId', async(req, res) => {
    try{
        const rooms = await Room.find({ _id: req.params.roomId })
        if(rooms.length === 0) return res.status(400).send('Invalid Room Id')
        res.send(rooms)
    }catch(err){
        res.status(400).send('Invalid Room Id')
    }
})

// Add rooms in block (Permission Required)
router.post('/add/:blockId', verify, blockResolve, async(req, res) => {

        //Validation
        const { error } = roomAddValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const room = new Room({
            block: req.body.block,
            room_no: req.body.room_no,
            desc: req.body.desc,
            status: req.body.status,
        })

        try{
            await room.save()
            res.send({ room: room._id })
        }catch(err){
            res.status(400).send(err.message)
        }
})

//Delete room by Id (Permission Required)
router.get('/delete/:roomId', verify, blockResolve, roomResolve, async(req, res) => {
    try{
        const room = await Room.findOneAndDelete({ _id: req.params.roomId })
        res.send(room)
    }catch(err){
        res.status(400).send(err.message)
    }
})

//Update room by Id (Permission Required)
router.post('/update/:roomId', verify, blockResolve, roomResolve, async(req, res) => {
    try{
        //Validation
        const { error } = roomAddValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        let update = {}

        //Admin
        if(req.role === ROLE.ADMIN){
            update = {
                block: req.body.block,
                room_no: req.body.room_no,
                desc: req.body.desc,
                status: req.body.status,
            }
        }else{
            update = {
                //restrict block change
                room_no: req.body.room_no,
                desc: req.body.desc,
                //restrict permission change
            }
        }

        const room = await Room.findOneAndUpdate({ _id: req.params.roomId }, update)
        res.send(room)
    }catch(err){
        res.status(400).send(err.message)
    }
})


module.exports = router