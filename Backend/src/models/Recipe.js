const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
  _id:String,
 name:String,
 desc:String,
 image_url:String,
 creator_id:{ type:String, ref: "user" },

})

module.exports = mongoose.model('recipe', RecipeSchema)