const router = require('express').Router()
const controls = require('./controls.js')

router.route('/')
  .get(controls.getAllTodos)
  .post(controls.createTodo)

router.route('/:id')
  .get(controls.getTodo)
  .delete(controls.deleteTodo)

router.route('/complete/:id')
  .put(controls.completeTodo)

router.route('/update/:id')
  .put(controls.updateTodoText)

module.exports = router