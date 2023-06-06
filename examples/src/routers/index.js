const express = require('express')
const route = express.Router()
const product = require('./products')
const movie = require('./movies')

route.use("/product", product)
route.use("/movie", movie)


module.exports = route
