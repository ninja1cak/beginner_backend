const express = require('express')
const app = express()
const routers = require('./src/routers/index')
const db = require('./src/config/db')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routers)

db.connect().then(()=>{
  console.log("database connect")
  app.listen(8000,() =>{
    console.log("app running on port 8000")
  })
  
}).catch((e) =>{
  console.log('database not connected')
})
