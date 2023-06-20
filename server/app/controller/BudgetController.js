const Budget = require('../models/Budget')

const BudgetController = {}

BudgetController.Show = (req, res) => {
    Budget.findOne({ user: req.user._id })
           .then((budget) => {
                res.json(budget)
           })
           .catch((err) => {
                res.json(err)
           })
} 
 
BudgetController.Add = (req, res) => {
    const body = req.body
    const budget = new Budget(body)
    // budget.user = req.user._id
    budget.save()
           .then((budget) => {
                res.json(budget)
           })
           .catch((err) => {
                res.json(err)
           })
}  

BudgetController.update = (req,res)=>{
     const id = req.params.id
     const body = req.body
     Budget.findOneAndUpdate({user:req.user._id } ,body ,{runValidators:true, new:true})
         .then((budget)=>{
             res.json(budget)
         })
         .catch((err)=>{
             res.json(err)
         })
}

BudgetController.destroy = (req,res)=>{
     const id = req.params.id
     Budget.findOneAndDelete(id)
         .then((budget)=>{
             res.json(budget)
         })
         .catch((err)=>{
             res.json(err)
         })
}

module.exports = BudgetController