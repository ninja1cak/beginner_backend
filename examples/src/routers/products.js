const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/products')

route.get("/", ctrl.getData)

module.exports = route
