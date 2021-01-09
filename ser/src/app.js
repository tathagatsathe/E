const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var mysql = require('mysql')
// var path = require('path')
var bcrypt = require('bcrypt')
var session = require('express-session')
// var router = require('express-router')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test123',
    database: 'database1'
});
connection.connect(function(err) {
    if (err) throw err;
    else console.log('Connected to the MySQL server')
})
const app= express()
var cookieParser = require('cookie-parser');
app.use(session({
    secret: 'mkdslfdsbhdans',
    resave: false,
    saveUninitialized: true
}))
app.use(morgan('combine'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        'http://localhost:8084',
        'https://localhost:8084'
    ],
      credentials: true,
      exposedHeaders: ['set-cookie']
}))

app.get('/', (req,res,next) => {
    var sq = 'SELECT * FROM prod WHERE Category LIKE "%"?"%" LIMIT 5'
    connection.query(sq,'Mobiles', function(err, results, fields) {
        if(err) {
            throw err
        } else {
            // console.log(results)
            // res.json(results)
            var sq = 'SELECT * FROM prod WHERE Category LIKE "%"?"%" LIMIT 4'
            connection.query(sq,'Watches', function(err, result, fields) {
            if(err) {
                throw err
            } else {
                var sq = 'SELECT * FROM prod WHERE Category LIKE "%"?"%" LIMIT 4'
                    connection.query(sq,'Furniture', function(err, resultf, fields) {
                    if(err) {
                        throw err
                    } else {
                        const reslt = [...results, ...result, ...resultf]
                        console.log(reslt)
                        res.send(reslt)
                    }
                })
            }
        })
        }
    })
})
app.post('/register', (req, res) => {
    var password = req.body.password
    var email = req.body.email
    var users = {
        "username": req.body.user,
        "email":req.body.email,
        "password":''
    }
    var sq = 'INSERT INTO cust SET ?';
    connection.query(sq, users, function(err, result, fields) {
        if (err){
            throw err
        }
        else {
            console.log(result)
            console.log(result[0])
        }
    })
    bcrypt.hash(password, 10, (err2, hash) => {
        if(err2) {
            console.error(err2)
            return
        }
        values = [hash, email]
        var qu = "UPDATE cust SET password = ? WHERE email = ?"
        connection.query(qu, values, function(err3, res3){
            if(err3) throw err3;
            else {
                console.log("Stored!")
                res.send(true)
            }
        })
    })
})
app.post('/login', (req, res) => {
    var email = req.body.email
    var password = req.body.password
    function auth(email, password, cb) {
        var sq = 'SELECT * FROM cust WHERE email = ?';
        connection.query(sq, [email],async function(err, result, fields) {
            if (err){
                throw err
            }
            else if (result.length > 0){
                const match = await bcrypt.compare(password, result[0].password)
                if(match) {
                    console.log(result[0].id)
                    res.json(result[0])
                }
                else {
                    res.send(match)
                }
                // console.log(match)
            }
            else{
                console.log('Email does not exist')
                res.send('Email does not exist')
            }
        })
    }
    auth(email, password, function(err, r) {
        if(err) console.log('Error')
    })
    // console.log(req.session)
})
app.get('/logout', (req, res) =>{
    console.log(session)
    console.log(req.session.email)
    req.session.destroy()
    console.log(req.session)
})
app.post('/profile',(req,res) =>{
    var sq = 'SELECT id,FirstName, LastName,Phone, address, City, username FROM cust WHERE email = ?'
    email = req.body.email
    connection.query(sq, [email],async function(err, result, fields){
        if (err){
            throw err
        } else {
            res.send(result)
            console.log(result)
        }
    })
})
app.post('/editprofile',(req,res) =>{
    var sq = 'UPDATE cust SET FirstName = ?, LastName = ?, Phone = ?, address = ?, City = ? WHERE email = ?'
    email = req.body.email
    FirstName = req.body.FirstName
    LastName = req.body.LastName
    Phone = req.body.Phone
    address = req.body.address
    City = req.body.City
    var add = [FirstName, LastName,Phone, address, City, email]
    connection.query(sq, add,async function(err, result, fields){
        if (err){
            throw err
        } else {
            res.send(result)
            console.log(result)
        }
    })
})
app.post('/addproduct',(req,res) =>{
    var sq = 'INSERT INTO prod SET ?'
    var product = {
        "user_id": req.body.id,
        "ProductName": req.body.ProductName,
        "Price": req.body.Price,
        "OriginalPrice": req.body.OriginalPrice,
        "Category": req.body.Category,
        "Image": req.body.PrImage,
        "Description": req.body.Description
    }
    console.log(req.body.PrImage)
    connection.query(sq, product,async function(err, result, fields){
        if (err){
            throw err
        } else {
            res.send(result)
            console.log(result)
        }
    })
})
app.post('/productdetails/:id',(req,res) =>{
    console.log('add to cart')
    var prod_id = req.params.id
    var cart_param = {
        cust_id: req.body.cust_id,
        price: req.body.Price,
        prod_id: prod_id,
        Prod_Name: req.body.prodname,
        Prod_Image: req.body.image,
        quantity: req.body.quantity
    }
    console.log(req.body)
    console.log(req.body.Price)
    var sq = 'INSERT INTO cart SET ?';
    connection.query(sq, cart_param, function(err, result, fields) {
        if (err){
            throw err
        }
        else {
            console.log(result.insertId)
            console.log('cart')
        }
    })
})
app.get('/productdetails/:id',(req,res) =>{
    console.log('get details')
    var sq = 'SELECT * FROM prod WHERE prod_id = ?'
    console.log(req.params.id)
    connection.query(sq, req.params.id,async function(err, result, fields){
        if (err){
            throw err
        } else {
            res.json(result[0])
            console.log(result[0])
        }
    })
})
app.get('/productsearch',(req,res) =>{
    var sq = 'SELECT * FROM prod WHERE ProductName LIKE "%"?"%" OR Category LIKE "%"?"%" OR Description LIKE "%"?"%"'
    console.log(req.query.search)
    var q = req.query.search
    connection.query(sq, [q, q, q],async function(err, result, fields){
        if (err){
            throw err
        } else {
            res.json(result)
            console.log(result.length)
        }
    })
    // res.send(resu)
})
app.post('/profile/cart',(req,res,next) =>{
    if(Number(req.body.cust_id)){
    var ord_param = {
        "cust_id": req.body.cust_id,
        "order_date": req.body.order_date,
        "shipping_add": req.body.shipping_add,
        "cust_email": req.body.cust_email,
        "TotalCost": req.body.totalcost
    }
    console.log(req.body.totalcost)
    product = req.body.product
    // console.log(product)
    // console.log(ord_param)
    var sq = 'INSERT INTO orders SET ?';
    connection.query(sq, ord_param, function(err, result, fields) {
        if (err){
            throw err
        }
        else {
            // console.log(result.insertId)
            console.log('orders')
            product.forEach(function (Item) {
                console.log(Item.prod_id)
                var ord_det = {
                    "order_id": result.insertId,
                    "prod_id": Item.prod_id,
                    "det_price": Item.price,
                    "det_quantity": 1,
                    "Prod_Name":Item.Prod_Name,
                    "Prod_Image":Item.Prod_Image
                }
                var sq = 'INSERT INTO order_details SET ?';
                connection.query(sq, ord_det, function(err, result, fields) {
                    if (err){
                        throw err
                    }
                    else {
                        // console.log(result)
                        console.log('order_details')
                        // console.log(resultd[)
                    }
                })
            })
            res.send(true)
        }
    })
    } else {
        next()
    }
    // var q = ''
    // var s = 'SELECT order_id FROM orders WHERE cust_id = ?'
    // connection.query(s, req.body.cust_id, function(err, result, fields) {
    //     if (err){
    //         throw err
    //     }
    //     else {
    //         console.log(result[0].order_id)
    //         q=result[0].order_id
    //         console.log('order_details')
    //     }
    // })
    // console.log(result[0].order_id)
    // console.log(q)
    // console.log(req.body.product)
})
app.post('/profile/cart',(req,res,next) =>{
    if(Number(req.body.id)) {
        console.log('get cart')
        var cust_id = req.body.id
        console.log(req.body.id)
        var sq = 'SELECT * FROM cart WHERE cust_id = ?'
        connection.query(sq, cust_id,async function(err, result, fields){
            if (err){
                throw err
            } else {
                res.json(result)
                console.log(result)
            }
        })
    } else {
        next()
    }
})
app.post('/profile/cart', (req,res) => {
    console.log('remove from cart')
        var cart_id = req.body.cart_id
        console.log(cart_id)
        var sq = 'DELETE FROM cart WHERE cart_id = ?'
        connection.query(sq, cart_id,async function(err, result, fields){
            if (err){
                throw err
            } else {
                res.json(result)
                console.log(result)
            }
        })
})
app.post('/profile/orders', (req,res) => {
    var sq = 'SELECT * FROM orders WHERE cust_id = ?'
    connection.query(sq, req.body.cust_id, async function(err, result, fields){
        if (err){
            throw err
        } else {
            res.send(result)
            console.log(result)
        }
    })
})
app.get('/profile/orders/:orderid', (req,res) => {
    var sq = 'SELECT * FROM order_details WHERE order_id = ?'
    console.log(req.params.orderid)
    connection.query(sq, req.params.orderid, async function(err, result, fields){
        if (err){
            throw err
        } else {
            res.send(result)
            console.log(result)
        }
    })
})

app.listen(process.env.PORT || 8000)
