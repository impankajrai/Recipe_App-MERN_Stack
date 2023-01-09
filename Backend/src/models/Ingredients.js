const mongoose = require('mongoose')

const IngredientsSchema = mongoose.Schema({
  _id:String,
  items:String,
  amount:String,
  unit:String,
  recipe_id: {
   type:String, ref: "recipe"
  }
})

module.exports = mongoose.model('ingredients', IngredientsSchema)