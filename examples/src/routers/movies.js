const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/movies')


route.get("/get/", ctrl.getData)
route.get("/read/", ctrl.readDataQuery)
route.post("/", ctrl.saveDataMovie)
route.post("/update", ctrl.changaDataMovie)

module.exports = route