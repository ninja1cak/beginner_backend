const ctrl = require('../controllers/auth')
const express = require('express')
const route = express.Router()

route.post('/',  ctrl.login)

module.exports = route