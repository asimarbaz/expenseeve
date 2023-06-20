const express = require('express')

const router = express.Router()

const ExpenseController = require('../app/controller/ExpenseController')
const CategoryController = require('../app/controller/CategoryController')
const BudgetController = require('../app/controller/BudgetController')
const UserController = require('../app/controller/UserController')
const { authenticateUser, authorizeUser } = require('../app/middleware/authentication') 

router.get('/api/user/expense', authenticateUser, ExpenseController.list)
router.post('/api/user/expense', authenticateUser, ExpenseController.Add)
router.put('/api/user/expense/:id', authenticateUser, ExpenseController.Update)
router.get("/api/user/expense/:id", authenticateUser ,ExpenseController.show)
router.delete("/api/user/expense/:id", authenticateUser, authorizeUser ,ExpenseController.destroy)

router.get('/api/user/category/:id', authenticateUser, CategoryController.show)
router.post('/api/user/category',authenticateUser , CategoryController.Add)
router.get('/api/user/category', authenticateUser , CategoryController.list)
router.put("/api/user/category/:id",authenticateUser , CategoryController.update)
router.delete("/api/user/category/:id",authenticateUser ,authorizeUser ,CategoryController.destroy)

router.get('/api/user/budget',authenticateUser, BudgetController.Show)
router.post('/api/user/budget',  BudgetController.Add)
router.put('/api/user/budget', authenticateUser, BudgetController.update)
router.delete('/api/user/budget', authenticateUser, authorizeUser, BudgetController.destroy)

router.post('/api/user/register', UserController.register)
router.post('/api/user/login', UserController.login)
router.get('/api/user/account', authenticateUser,  UserController.account)
router.put('/api/user/account/:id', UserController.Update)

module.exports = router
