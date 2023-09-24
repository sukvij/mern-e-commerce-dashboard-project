const express = require("express")
const cors = require("cors")
require("./db/config")
const User = require("./db/User")
const Product = require("./db/Product")
const app = express()
const jwt = require("jsonwebtoken")
const jwtKey = "e-comm"

app.use(express.json())
app.use(cors())


app.post("/register", async (req, res)=>{
    let user = new User(req.body)
    let result = await user.save();
    result = result.toObject()
    delete result.password;
    jwt.sign({result}, jwtKey, {expiresIn:"2h"}, (err, token)=>{
        if(err){
            res.send("some thing went wrong please try again")
        }else{
            res.send({result, auth:token})
        }
    })
})

app.post("/login", async (req, res)=>{
    let user =await User.findOne(req.body).select("-password")
    if(user){
        jwt.sign({user}, jwtKey, {expiresIn:"2h"}, (err, token)=>{
            if(err){
                res.send("some thing went wrong please try again")
            }else{
                res.send({user, auth:token})
            }
        })
    }else{
        res.send({"result":"user not found"})
    }
})

app.post("/add-product", verifyToken,  async (req, res)=>{
    let product = new Product(req.body)
    let result = await product.save();
    res.send(result);
})

app.get("/products", verifyToken,  async (req, res)=>{
    let products =await Product.find()
    if(products.length >0 ){
        res.send(products)
    }else{
        res.send({result:"no product fould"})
    }
})

app.get("/product/:id", verifyToken, async (req, res)=>{
    let result = await Product.findOne({_id:req.params.id})
    res.send(result)
})

app.delete("/product/:id", verifyToken, async (req, res)=>{
    let result =await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

app.put("/product/:id", verifyToken, async(req, res)=>{
    let result = await Product.updateOne({_id:req.params.id}, {
        $set:req.body
    }
    )
    res.send(result)
})

app.get("/product/search/:key", verifyToken, async (req, res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
        ]
    })
    res.send(result)
})

function verifyToken(req, res, next){
    let token = req.headers["authorization"]
    if(token){
        token = token.split(' ')[1]
        jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                res.send("please provide valid token")
            }else{
                next();
            }
        })
    }else{
        res.send("please send token with header")
    }
}

app.listen(5000)