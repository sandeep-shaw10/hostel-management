const { mongoose } = require('mongoose')


const feeSchema = new mongoose.Schema({

    date:{
        type: Date,
        required: true,
    },

    amount:{
        type: Number,
        min: 0,
        required: true
    }

})


module.exports = {
    feeSchema
}