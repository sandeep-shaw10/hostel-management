const router = require('express').Router()
const { BLOCK, ROLE, BRANCH, COURSE, GENDER, FEE } = require('../data/static')

//View all blocks
router.get('/', async(req, res) => {
    const data = {
        role: ROLE,
        branch: BRANCH,
        course: COURSE,
        sex: GENDER,
        block: BLOCK,
        fees: FEE
    }
    res.send(data)
})


module.exports = router