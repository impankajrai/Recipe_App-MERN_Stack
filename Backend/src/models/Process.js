const mongoose = require('mongoose')

const ProcessSchema = mongoose.Schema({
  _id:String,
  step:String,
  recipe_id: {
    type:String, ref: "recipe"
   }
})

module.exports = mongoose.model('process', ProcessSchema)