const express = require('express')
const router = express.Router()
const { add, get, delTodo } = require('../controllers/todoController')

router.post('/todo', add)
router.get('/todo', get)
router.patch('/todo')
router.delete('/todo', delTodo)

module.exports = router
