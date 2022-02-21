require('./db/mongoose')
const express = require('express')
const recordRouter = require('./routers/record')

const app = express() 

app.use(express.json())
app.use(recordRouter)

module.exports = app