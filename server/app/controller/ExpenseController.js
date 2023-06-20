const Expense = require('../models/Expense')

const ExpenseController = {}

ExpenseController.Add = (req, res) => {
     const body = req.body
     const expense = new Expense(body)
     expense.user = req.user._id
     expense.save()
            .then((expense) => {
                 res.json(expense)
            })
            .catch((err) => {
                 res.json(err)
            })
}

ExpenseController.list = (req, res) => {
    Expense.find({ user: req.user._id })
           .then((expenses) => {
                res.json(expenses)
           })
           .catch((err) => {
                res.json(err)
           })
} 

ExpenseController.Update = ((req, res) => {
     const id = req.params.id
     const body = req.body
     Expense.findByIdAndUpdate({ _id:id, user:req.user._id }, body, { new: true, runValidators: true })
           .then((expense) => {
             res.json(expense)
           })
           .catch((err) => {
             res.json(err)
           })
})

ExpenseController.show = (req, res) => {
     const id = req.params.id
     Expense.findOne({ _id: id, user: req.user._id })
         .then((expense) => {
             res.json(expense)
         })
         .catch((err) => {
             res.json(err)
         })
}

ExpenseController.destroy = (req, res) => {
     const id = req.params.id
     Expense.findOneAndDelete({ _id: id, user: req.user._id })
         .then((expense) => {
             res.json(expense)
         })
         .catch((err) => {
             res.json(err)
         })
 }



module.exports = ExpenseController