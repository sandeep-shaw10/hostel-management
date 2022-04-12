const { mongoose } = require('mongoose')
const { ROLE } = require('../data/static')


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 8,
        max: 256
    },

    email:{
        type: String,
        required: true,
        min: 8,
        max: 256 
    },

    role:{
        type: String,
        enum: Object.values(ROLE),
        default: ROLE.STAFF,
    },

    password:{
        type: String,
        required: true,
        min: 8,
        max: 1024 
    },

    block:[ String ],

    date:{
        type: Date,
        default: Date.now
    }
})

//Middleware
userSchema.post('findOneAndDelete', function(doc){
    console.log(doc)
})

//Model
const User = mongoose.model('User', userSchema)


module.exports = User