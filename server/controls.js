const { Item } = require('../db/index.js')

module.exports = {
  getAllTodos: (req, res) => {
    return Item.findAll({})
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        console.log('error occurred retrieving todos: ', err)
        res.sendStatus(500)
      })
  },
  getTodo: (req, res) => {
    return Item.findOne({
      where: { id: req.params.id }
    })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        console.log('error occurred retrieving todo: ', err)
        res.sendStatus(500)
      })
  },
  updateTodoText: (req, res) => {
    return Item.update({ description: req.body.description },
      { where: { id: req.params.id } })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        console.log('error occurred updating todo text: ', err)
        res.sendStatus(500)
      })
  },
  completeTodo: (req, res) => {
    return Item.update({ completed: true },
      { where: { id: req.params.id } })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        console.log('error completing todo: ', err)
        res.sendStatus(500)
      })
  },
  createTodo: (req, res) => {
    return Item.create({
      description: req.body.description
    })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        console.log('error occurred creating todo: ', err)
        res.sendStatus(500)
      })
  },
  deleteTodo: (req, res) => {
    return Item.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        console.log(data)
        res.send(`${data} todo deleted: #${req.params.id}`)
      })
      .catch(err => {
        console.log('error occurred deleting todo: ', err)
        res.sendStatus(500)
      })
  }
}