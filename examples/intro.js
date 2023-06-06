const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//params endpoint
//params 2 cb function cb wajib ada 2 parameter yg masuk
//get menangkap request lalu kriim response (optionmal)
// req: melihat data dalam request
// res: membalas response ke user


//tiga jenis request yaitu params, query, dan body

//request params : ngirim parameter lewat url (tydak private)
app.get("/age/:angka/:name", (req,res) =>{
  const umur = req.params.angka
  //const name = req.params.name
  res.send(`umur anda adalah ${umur}
  dan nama anda adalah`)
})

/*request query : (tydak private)
  http://localhost:8000/bioddata?name=hauzan&buah=pear
  ? ngambil data 
  & pemisah antara key value
  bentuk datanya adalah objek
*/
app.get("/bioddata", (req, res)=>{
  const bio = req.query
  console.log(bio)
  res.send("berhasil")
})

//request body (methodnya post)
app.post('/data', (req, res) =>{
  const data = req.body
  const {school} = data
  const {sd} = school
  console.log(data)
  console.log(sd)
  res.send("berhasil")
})

app.get("/", (req, res)=>{
  console.log("request masuk")
  console.log(req.url)
  res.send("halo")
  res.status(123)
})





//membuat program berlajan tanpa berhenti (void loop dalam arduino)
/*
  https://gitcareer.com/login
  gitcareer.com = domain
  /login = endpoint
*/

/**
 * controller => mengolah request masuk dan mengirim respons (logika)
 * models -> model berkomunikasi dengan database
 * routers -> menentukan method dan endpoint request
 * 
 * flow :
 * - request masuk ditangkep didalam routers terlebih dahulu
 * - si routers akan melihat endpointnya
 * - kemudian routers dilanjutkan dengan controller
 * - jika controller butuh database maka manggil models
 * 
 * singkatnya
 * routers -> controller -> models
 */