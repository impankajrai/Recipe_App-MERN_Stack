require('dotenv').config()
const { default: mongoose } = require("mongoose")


module.exports.connectDatabase=()=>{
  mongoose.connect(process.env.CONSTRING, (err) => {
    if(err) return console.log(err)
    console.log("Connected to Database")
})
}