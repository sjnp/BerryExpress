const express = require('express')
const app = express()

const cors = require('cors')
const controller = require('./controllers')
const { connectToDatabase } = require('./utils/db')

connectToDatabase()

app.use(cors())
app.use(express.json())

app.use('/api/positions', controller.positions)
app.use('/api/items', controller.items)
app.use('/api/trackingHistories', controller.trackingHistories)
app.use('/api/staffs', controller.staffs)
app.use('/api/itemStates', controller.itemStates)
app.use('/api/branches', controller.branches)
app.use('/api/branchTypes', controller.branchTypes)
app.use('/api/login', controller.login)


module.exports = app