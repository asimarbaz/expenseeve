const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ExpenseSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default: new Date()
    },
    user:{ 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required:true 
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required:true
    }
})

// ExpenseSchema.pre('find', function() {
//     this.where({ isDeleted: false })
// })

// ExpenseSchema.pre('findOne', function(next) {
//     this.where({ isDeleted: false })
//     next()
// })

const Expense = mongoose.model('Expense', ExpenseSchema)

module.exports = Expense