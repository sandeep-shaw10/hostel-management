const Joi = require('joi')
const { ROLE, BLOCK, GENDER, COURSE, BRANCH } = require('./data/static')


// Register Validation: models/User
const registerValidation = (data) => {
    let block_id = BLOCK.map((x) => x.id)
    const schema = Joi.object({
        name: Joi.string().min(8).max(256).required(),
        email: Joi.string().min(8).max(256).required().email(),
        role: Joi.string().valid(...Object.values(ROLE)),
        password: Joi.string().min(8).max(64).required(),
        block: Joi.array().items(Joi.string().valid(...block_id)).required()
    })
    return schema.validate(data)
}

// ADMIN Update Validation: models/User
const adminUpdateValidation = (data) => {
    let block_id = BLOCK.map((x) => x.id)
    const schema = Joi.object({
        name: Joi.string().min(8).max(256).required(),
        password: Joi.string().min(8).max(64).required(),
        block: Joi.array().items(Joi.string().valid(...block_id)).required()
    })
    return schema.validate(data)
}

//All update
const staffUpdateValidation = (data) => {
    let block_id = BLOCK.map((x) => x.id)
    const schema = Joi.object({
        name: Joi.string().min(8).max(256).required(),
        role: Joi.string().valid(...Object.values(ROLE)).required(),
        password: Joi.string().min(8).max(64).required(),
        block: Joi.array().items(Joi.string().valid(...block_id)).required()
    })
    return schema.validate(data)
}

// Login Validation: models/User
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(8).max(256).required().email(),
        password: Joi.string().min(8).max(64).required(),
    })
    return schema.validate(data)
}

const roomAddValidation = (data) => {
    let block_id = BLOCK.map((x) => x.id)
    const schema = Joi.object({
        block: Joi.string().valid(...block_id).required(),
        room_no: Joi.string().min(1).max(8).required(),
        desc: Joi.string().max(1024),
        status: Joi.array().items(Joi.string()),
    })
    return schema.validate(data)
}

const feeValidation = (data) => {
    const schema = Joi.object({
        date: Joi.date().required(),
        amount: Joi.number().required()
    })
    return schema.validate(data)
}


const studentValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(8).max(256).required(),
        roll: Joi.string().required(),
        email: Joi.string().min(8).max(256).required().email(),
        year: Joi.date().required(),
        sex: Joi.string().valid(...Object.values(GENDER)).required(),
        course: Joi.string().valid(...Object.values(COURSE)).required(),
        branch: Joi.string().valid(...Object.values(BRANCH)).required(),
        join_date: Joi.date(),
        end_date: Joi.date(),
        status: Joi.string().required(),    //Changed from number to string
        fee: Joi.array().items(Joi.object({
            date: Joi.date(),
            amount: Joi.number().required()
        }))
    })
    return schema.validate(data)
}

module.exports = {
    registerValidation,
    loginValidation,
    adminUpdateValidation,
    staffUpdateValidation,

    roomAddValidation,
    studentValidation,
    feeValidation
}