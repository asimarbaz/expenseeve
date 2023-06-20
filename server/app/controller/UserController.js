const User = require('../models/User')
const { pick, omit } = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserController = {}

UserController.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    bcrypt.genSalt(10)
        .then((salt)=>{
            bcrypt.hash(user.password,salt)
                .then((encrypted)=>{
                    user.password = encrypted
                    user.save()
                        .then((user)=>{
                            res.json(user)
                        })
                        .catch((err)=>{
                            res.json(err)
                        })
                })
        })
    // user.save()
    //     .then((user) => {
    //         res.json(user)
    //     })
    //     .catch((err) => {
    //         res.json(err)
    //     })
}

UserController.login = (req, res) => {
    const {email, password} = req.body
    User.findOne({email:email})
        .then((user) => {
            if(user){
                bcrypt.compare(password, user.password)
                      .then((result) => {
                        if(result){
                            const token = jwt.sign({
                                _id:user._id,
                                email:user.email,
                                mobile:user.mobile}, process.env.JWT_SECRET)       
                            res.json({token:`bearer ${token}`})
                        }
                        else{
                            res.json({notice:"invalid email or password"})
                        }
                      })
            }
            else {
                res.json({notice:'invalid email or password'})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

UserController.account = (req, res) => {
    res.json(req.user)
}


UserController.Update = ((req, res) => {
    const id = req.params.id
    const body = req.body
    User.findByIdAndUpdate(id, body, {new:true, runValidators:true})
          .then((user) => {
            res.json(user)
          })
          .catch((err) => {
            res.json(err)
          })
})


module.exports = UserController