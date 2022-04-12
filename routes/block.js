const router = require('express').Router()
const Room = require('../model/Room')
const { BLOCK } = require('../data/static')

//View all blocks
router.get('/', async(req, res) => {
    res.send(BLOCK)
})

//View one blocks by id
router.get('/:blockId', async(req, res) => {
    let block_id = BLOCK.filter(x => x.id === req.params.blockId)
    if((block_id.length === 1)){
        res.send(block_id[0])
    }else if(block_id.length === 0){
        res.status(400).send('Invalid Block Id')
    }else{
        res.status(500).send('Server Error: Multiple Block Id')
    }
})

// View All rooms in block
router.get('/:blockId/rooms', async(req, res) => {
    try{
        const rooms = await Room.find({ block: req.params.blockId })
        res.send(rooms)
    }catch(err){
        res.status(400).send('Invalid Block Id')
    }
})

module.exports = router