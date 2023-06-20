const mongoose  = require('mongoose')

const Schema = mongoose.Schema

const BudgetSchema = new Schema({
    amount:{
        type:Number,
        required:true,
        default:0
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
}, { timestamps: true })

const Budget = mongoose.model('Budget',BudgetSchema)

module.exports = Budget