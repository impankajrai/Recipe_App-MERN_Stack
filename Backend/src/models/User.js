const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  _id:String,
  name: String,
  user_id: String,
  password: {
    type: String,
    select: false,
  }
})

module.exports = mongoose.model('user', UserSchema)