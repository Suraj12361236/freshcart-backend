const { default: mongoose } = require("mongoose");

const wishlistSchema = new mongoose.Schema({
        productimage: String,
        productweight: String,
        producttitle: String,
        productprice: String,


});


module.exports = mongoose.model('wishlist', wishlistSchema);
