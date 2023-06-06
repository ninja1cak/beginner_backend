const model = {}

model.getHello = async () =>{
  try{
    return  "hello from model"
  }catch (error) {
    console.log("ERROR")
  }
}

module.exports = model