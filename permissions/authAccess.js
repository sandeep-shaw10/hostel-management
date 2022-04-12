const User = require('../model/User')


module.exports = function(role){

    return async(req, res, next) => {

        const user_id = req.user._id
        let get_user = null
        try{
            get_user = await User.findOne({ _id: user_id, role: role })
        }catch(err){
            res.status(400).send(err.message)
        }
        if(!get_user) return res.status(401).send('Not Allowed')
        next()
    }

}