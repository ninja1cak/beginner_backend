const ctrl = require ("../controllers/user")
const express = require('express')
const route = express.Router()

route.post('/', ctrl.insertDataUser)

module.exports = route