const { default: mongoose } = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstname:String,
  lastname:String,
  email:String,
  password:String,
  phone: String
});


module.exports = mongoose.model('users', usersSchema);
