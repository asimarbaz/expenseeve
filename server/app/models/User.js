const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const isEmail = require("validator/lib/isEmail")
const isNumeric = require("validator/lib/isNumeric")


const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return "Invalid email address"
            }
        }
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10,
        validate:{
            validator:function(value){
                return isNumeric(value)
            },
            message:function(){
                return "Invalid mobile number"
            }
        }
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minlength:6,
        maxlength:200
    },
    role:{
        type:String,
        default:'user'
    },
    image_url:{
        type:String,
        default:''
    },
    occupation:{
        type:String,
        default:''
    }
    
}, {timestamps:true})

// UserSchema.pre('save', function(next){
//     const user = this
//     bcrypt.genSalt(10)
//           .then((salt) => {
//             bcrypt.hash(user.password, salt)
//                   .then((encrypted) => {
//                     user.password = encrypted
//                     next()
//            }) })
// })


const User = mongoose.model('User', UserSchema)

module.exports = User