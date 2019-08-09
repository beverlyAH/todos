const mysql = require('mysql')
const Sequelize = require('sequelize')

let db = process.env.DB_URI || 'localhost'
let DB_USER = process.env.DB_USER || 'root'
let DB_PASS = process.env.DB_PASS || ''

const sequelize = new Sequelize('todos', DB_USER, DB_PASS, {
  host: db,
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

const Item = sequelize.define('item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: Sequelize.STRING,
  color: {
    type: Sequelize.STRING,
    defaultValue: '#94E89E'
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = {
  Item
}