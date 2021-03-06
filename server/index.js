const express = require('express')
const parser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes.js')
const cors = require('cors')
const db = require('../db/index.js')

const app = express()

const headers = {
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'
}

app.use(parser.json())
app.use(morgan('dev'))
app.use(cors(headers))
app.use(express.static(path.join(__dirname, '/../client/dist')))

app.use('/todos', routes)

let PORT = process.env.PORT || 3000

app.listen(PORT, (err) => {
  if(err) throw err
  console.log(`todo is listening on ${PORT}!`)
})