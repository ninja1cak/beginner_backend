const ctrl = {}
const model = require('../models/products')

ctrl.getData = async (req, res) =>{
  try{
    const result = await model.getHello()
    return res.send(result)
  }catch(error){
    console.log("ERROR")
  }

}

module.exports = ctrl