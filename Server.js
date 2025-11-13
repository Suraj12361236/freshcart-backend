

express = require("express")

let app = express();

// port number 
app.listen(5001, () => {
    console.log("server start")
})

// display the msg -------
app.get("/", (req, res) => {
    res.send("hello node")
})



// install nodemon server package :- for autoupdate
// nodemon :- npm i -g nodemon --save


// embeded java script : 
// .ejs :- npm i ejs
//  use ejs :
app.set("view engine", "ejs")

// call the ejs file :
app.get("/home", (req, res) => {
    res.render("home")
})


// cors -------------------
cors = require("cors")
app.use(cors())

// body-parser ---------------
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({}))


// mongodb -------------------------
const { mongoose } = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Dmart").then((res) => {
    console.log("laxmi errorrrr....")
}).catch((err) => {
    console.log(err)
})


// models -------------------
let users = require("./models/users")
let Products = require("./models/Product")
let wishlist = require("./models/Wishlist")
let Addtocart = require("./models/addtocart")




// signin ------------------------
app.post("/signin", async (req, res) => {

    let ourusers = await users.findOne({
        "email": req.body.Signin.email,
        "password": req.body.Signin.password
    })
    if (ourusers) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }

})

// signup ------------------------
app.post("/signup", async (req, res) => {
    let a = req.body.signup

    let saveusers = await users.insertOne({
        firstname: a.firstname,
        lastname: a.lastname,
        email: a.email,
        password: a.password
    })
    let result = await saveusers.save()

    if (result) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }
})


// forgotpassword ---------------------------
app.post("/forgotpassword", async (req, res) => {
    let a = req.body.forgot
    let updateuser = await users.findOneAndUpdate({ "email": a.email }, { $set: { "password": a.newpassword } })
    if (updateuser) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }
})



// addproduct ----------------
app.post("/addproduct", async (req, res) => {

    let saveproduct = await Products.insertOne({
        title: req.body.addproduct.title,
        category: req.body.addproduct.category,
        productimage: req.body.addproduct.image,
        weight: req.body.addproduct.weight,
        quantity: req.body.addproduct.quantity,
        descriptions: req.body.addproduct.descriptions,
        regularprice: req.body.addproduct.regularprice,
        saleprice: req.body.addproduct.saleprice
    })
    let result = await saveproduct.save()

    if (result) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }
})




// ourproduct ------------------
app.get("/ourproduct", async (req, res) => {
    let allproducts = await Products.find({})
    if (allproducts) {
        res.json({
            status: true,
            myproducts: allproducts
        })
    }
    else {
        res.json({
            status: false
        })
    }

})



// wishlist -----------------------

app.post("/wishlist", async (req, res) => {
    let wishlistitem = await wishlist.insertOne({
        "productimage": req.body.wishlistitem.productimage,
        "productweight": req.body.wishlistitem.weight,
        "producttitle": req.body.wishlistitem.title,
        "productprice": req.body.wishlistitem.saleprice,
    })

    let result = await wishlistitem.save()

    if (result) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }


})



// ourproduct ------------------
app.get("/wishlistproduct", async (req, res) => {
    let allproducts = await wishlist.find({})
    if (allproducts) {
        res.json({
            status: true,
            wishlistitem: allproducts
        })
    }
    else {
        res.json({
            status: false
        })
    }

})




// deletewishlistitem -----------------------
app.post("/deletewishlistitem", async (req, res) => {
    let a = await wishlist.findOneAndDelete({ "_id": req.body.item._id })

})




// addtocart -----------------------

app.post("/addtocart", async (req, res) => {
    let carttitem = await Addtocart.insertOne({
        "productimage": req.body.cartitem.productimage,
        "quantity": req.body.cartitem.quantity,
        "producttitle": req.body.cartitem.title,
        "productprice": req.body.cartitem.saleprice,
    })

    let result = await carttitem.save()

    if (result) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }


})



// cartproduct ------------------
app.get("/cartproduct", async (req, res) => {
    let allproducts = await Addtocart.find({})
    if (allproducts) {
        res.json({
            status: true,
            cartproduct: allproducts
        })
    }
    else {
        res.json({
            status: false
        })
    }

})


// deletecartdata--------------------------------
app.post("/deletecartdata", async (req, res) => {
    let a = await Addtocart.findOneAndDelete({ "_id": req.body.item._id })
})



// updatecartitem 
app.post("/updatecartitem", async (req, res) => {
    let a = await Addtocart.findOneAndUpdate({ "_id": req.body.data._id }, { $set: { "quantity": req.body.quantity } })

})


// passwordsetting-------------------------
app.post("/password", async (req, res) => {
    let a = req.body.password
    let updatepassword = await users.findOneAndUpdate({ "email": a.email }, { $set: { "password": a.newpassword } })
    if (updatepassword) {
        res.json({
            status: true,

        })
    }
    else {
        res.json({
            status: false
        })
    }
})


// accountsetting----------------------
app.post("/accountsetting", async(req, res) => {
    let a = req.body.accountsetting
    let updateaccount = await users.findOneAndUpdate({ "email": a.email }, { $set: { "password": a.newpassword,"firstname":a.firstname,"lastname":a.lastname , "phone":a.phone} })
     if (updateaccount) {
        res.json({
            status: true,

        })
    }
    else {
        res.json({
            status: false
        })
    }
})




// delete account ------------------
app.post("/deleteaccount", async (req, res) => {
    let a = await users.findOneAndDelete({ "email": req.body.deleteemail })
    if (a) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }

})