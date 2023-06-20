const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const tokendata = jwt.verify(token, process.env.JWT_SECRET)
            User.findById(tokendata._id)
                .then((user)=>{
                    req.user = user
                    next()
                })
                .catch(()=>{
                    res.json({notice:'you need to be logged in'})
                })
        }
        catch(e) {
            res.json({errors:e})
        }        
    }
    else{
        res.json({notice:'you need to be logged in'})
    }
}

const authorizeUser = (req, res, next) => {
    if(req.user){
        next()
    }
    else {
        res.json({notice:"you are not allowed to access this route"})
    }
}

module.exports = {
    authenticateUser,
    authorizeUser
}