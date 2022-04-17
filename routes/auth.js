const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const { registerValidation, loginValidation, adminUpdateValidation, staffUpdateValidation } = require('../validation')
const verify = require('../middleware/verifyToken')
const authAccess = require('../permissions/authAccess')
const { ROLE, ALL } = require('../data/static')
const Student = require('../model/Student')
const Room = require('../model/Room')


//Admin: View all Staff
router.get('/', verify, authAccess(ROLE.ADMIN), async (req, res) => {
    try{
        const user = await User.find()
        res.send(user)
    }catch(err){
        res.status(400).send(err.message)
    }
})


// Registering STAFF
router.post('/register', verify, authAccess(ROLE.ADMIN), async (req, res) => {

    //Validation
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send({'error':`${error.details[0].message}`})

    //Check mail exist
    const checkEmail = await User.findOne({ email: req.body.email })
    if(checkEmail) return res.status(400).send({'error':'Email already exists'})

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create user instance
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
    })

    //Save user instance
    try{
        await user.save()
        res.send({ user: user._id})
    }catch(err){
        res.status(400).send(err.message)
    }
})


// lOGIN staff
// router.post('/login', async (req, res) => {

//     //Validation
//     const { error } = loginValidation(req.body)
//     if(error) return res.status(400).send(error.details[0].message)

//     //Check mail exist
//     const user = await User.findOne({ email: req.body.email })
//     if(!user) return res.status(400).send('Wrong credentials')

//     //Check password
//     const checkPassword = await bcrypt.compare(req.body.password, user.password)
//     if(!checkPassword) return res.status(400).send('Wrong credentials: Password')

//     //Assign Token
//     const token = jwt.sign({ _id: user._id}, process.env.JWT_TOKEN, { expiresIn: (60*60) })
//     res.header('auth-token', token).send({
//         'token': token,
//         'role': user.role,
//         'name': user.name,
//         'email': user.email,
//         'block': user.block
//     })
// })


router.post('/login', async (req, res) => {

    //Validation
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check mail exist
    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send('Wrong credentials')

    //Check password
    const checkPassword = await bcrypt.compare(req.body.password, user.password)
    if(!checkPassword) return res.status(400).send('Wrong credentials: Password')

    //Assign Token
    const token = jwt.sign({ _id: user._id}, process.env.JWT_TOKEN, { expiresIn: (60*60) })
    const student = await Student.find()
    const block_access = user.block
    let room = []
    let staff = null

    if(user.role === ROLE.ADMIN){
        staff = await User.find()
        room = await Room.find()
    }else{
        if(block_access){
            room = await Room.find({ block: { $all: block_access } })
        }
    }

    res.header('auth-token', token).send({
        'token': token,
        'static': ALL,
        'student': student,
        'room': room,
        'staff': staff,
        'self': user,
        'block_access': block_access
    })
})


//Check own data
router.get('/my-data', verify, async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.user})
        res.send(user)
    }catch(err){
        res.status(400).send({'error': err.message})
    }
})


//Admin View to check  user data by id
router.get('/data/:userId', verify, authAccess(ROLE.ADMIN), async(req, res) => {
    try{
        const user = await User.findOne({ _id: req.params.userId })
        res.send(user)
    }catch(err){
        res.status(400).send('Not exist')
    }
})


//Admin: DELETE STAFF
router.get('/delete/:userId', verify, authAccess(ROLE.ADMIN), async(req, res) => {
    try{
        if(req.user._id === req.params.userId){
            res.status(401).send({'error':'Admin cannot delete own record'})
        }else{
            const user = await User.findOneAndDelete({ _id: req.params.userId })
            res.send(user)
        }
    }catch(err){
        res.status(400).send({'error':'Not exist'})
    }
})


//Admin: Update STAFF
router.post('/update/:userId', verify, authAccess(ROLE.ADMIN), async(req, res) => {
    try{
        if(req.user._id === req.params.userId){

            //Validation
            const { error } = adminUpdateValidation(req.body)
            if(error) return res.status(400).send(error.details[0].message)

            //Hash Password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            //UPDATE state
            const update = {
                name: req.body.name,
                password: hashedPassword,
                block: req.body.block,
            }
            
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, update)
            res.send(user)
        }else{

            //Validation
            const { error } = staffUpdateValidation(req.body)
            if(error) return res.status(400).send(error.details[0].message)

            //Hash Password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            //UPDATE state
            const update = {
                name: req.body.name,
                password: hashedPassword,
                role: req.body.role,
                block: req.body.block,
            }
            
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, update)
            res.send(user)
        }
    }catch(err){
        res.status(400).send('Not exist')
    }
})


module.exports = router