const User = require('../model/User')
const Room = require('../model/Room')

//Generate block permission
const blockResolve = async (req, res, next) => {
    const user_id = req.user._id
    let get_user = null

    try{ get_user = await User.findOne({ _id: user_id }) }
    catch(err){ res.status(401).send('Not Allowed ,,,,') }

    //Handing post request: /add/:blockId
    if(req.method === "POST"){
        let blockVal = req.body.block
        let access = get_user.block.indexOf(blockVal)   //Match request form data with user permission
        if(access === -1){ return res.status(401).send('Not Allowed') }
    }
    
    if(get_user){
        req.block_access = get_user.block
        req.role = get_user.role
    }
    else{ return res.status(400).send('Not Exist') }

    next()
}

// Room access
const roomResolve = async (req, res, next) => {
    let get_room = null

    try{ get_room = await Room.findOne({ _id: req.params.roomId }) }
    catch(err){ res.status(401).send('** Not Allowed') }
    
    if(get_room && req.block_access){
        let access = req.block_access.indexOf(get_room.block)
        if(access === -1){ return res.status(401).send('Not Allowed: No Permission') }
    }else{
        res.status(401).send('Not Exist') 
    }

    next()
}


module.exports = {
    blockResolve, roomResolve
}