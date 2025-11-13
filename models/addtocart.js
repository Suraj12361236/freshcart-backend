const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
  producttitle:String,
  productimage:String,
  quantity:String,
  productprice:String
});


module.exports = mongoose.model('addtocart', cartSchema);
