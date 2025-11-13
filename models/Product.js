const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  title:String,
  category:String,
  productimage:String,
  weight:String,
  quantity:String,
  descriptions:String,
  regularprice:String,
  saleprice:String
});


module.exports = mongoose.model('products', productSchema);
