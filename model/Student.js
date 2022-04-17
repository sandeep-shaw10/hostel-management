const { mongoose } = require('mongoose')
const { GENDER, COURSE, BRANCH } = require('../data/static')
const Room = require('../model/Room')
const {feeSchema} = require('./Fee')


const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 8,
        max: 256
    },

    roll:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        min: 8,
        max: 256 
    },

    year:{
        type: Date,
        required: true,
    },

    sex:{
        type: String,
        enum: Object.values(GENDER),
        required: true,
    },

    course:{
        type: String,
        enum: Object.values(COURSE),
        required: true,
    },

    branch:{
        type: String,
        enum: Object.values(BRANCH),
        required: true,
    },

    join_date:{
        type: Date
    },

    end_date:{
        type: Date
    },

    status:{
        type: String,
        required: true
    },

    fee:[feeSchema]

})

//Middleware CASCADING: "ON STUDENT DELETE, DEALLOT THE ROOM"
studentSchema.post('findOneAndDelete', async function(doc){
    try{
        const update = {
            status: []
        }
        const deallot = await Room.findOneAndUpdate({ status: [doc.roll] }, update)
        console.log(deallot)
    }catch(err){
        console.log(err)
    }
})

//Model
const Student = mongoose.model('Student', studentSchema)


module.exports = Student