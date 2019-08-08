const mysql = require('mysql')
const { dbUri } = require('../secrets.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('todos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('connected to database!')
  })
  .catch(() => {
    console.log('error occurred connecting to database!')
  })

  const Model = sequelize.Model

const Item = sequelize.define('item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: Sequelize.STRING,
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = {
  Item
}