const { mongoose } = require('mongoose')
const { BLOCK } = require('../data/static')


let block_id = BLOCK.map((x) => x.id)

const roomSchema = new mongoose.Schema({

    block:{
        type: String,
        enum: block_id,
        required: true
    },

    room_no:{
        type: String,
        required: true,
        min: 1,
        max: 8
    },

    desc:{
        type: String,
        max: 1024 
    },

    status:[String],

    date:{
        type: Date,
        default: Date.now
    }
})

//Middleware
// userSchema.post('findOneAndDelete', function(doc){
//     console.log(doc)
// })

//Model
const Room = mongoose.model('Room', roomSchema)


module.exports = Room