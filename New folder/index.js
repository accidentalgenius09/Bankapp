//import dataService file from service folder
const dataservice = require('./service/dataService')

//import jsonwebtoken
const jwt =require('jsonwebtoken')

// import express
const express = require('express')
const { json } = require('express')

//create an app using express
const app=express()

//to convert json data
app.use(express.json())

//request

//GET

// app.get('/',(req,res)=>{
//     res.send('Get method working.....')
// })
// //post

// app.post('/',(req,res)=>{
//     res.send('post method working.....')
// })

// //put
// app.put('/',(req,res)=>{
//     res.send('put method working.....')
// })

// //patch
// app.patch('/',(req,res)=>{
//     res.send('patch method working.....')
// })

// //delete
// app.delete('/',(req,res)=>{
//     res.send('delete method working.....')
// })

//middlewares for verifing token

const jwtmiddleware = (req,res,next)=>{
    console.log(".......middleware working.......");
    try{
        const token = req.headers['access-token']
        const data = jwt.verify(token,"secretkey123")
        console.log(data);
        next()
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"Please login"
        })
    }
    }


                                        //requests

// register
app.post('/register',(req,res)=>{

    const result= dataservice.register(req.body.acno,req.body.uname,req.body.psw)

    res.status(result.statusCode).json(result)
})

//login
app.post('/login',(req,res)=>{

    const result= dataservice.login(req.body.acno,req.body.psw)

    res.status(result.statusCode).json(result)
})

//deposit
app.post('/deposit',jwtmiddleware,(req,res)=>{

    const result= dataservice.deposit(req.body.acno,req.body.psw,req.body.amnt)

    res.status(result.statusCode).json(result)
})

//withdraw
app.post('/withdraw',jwtmiddleware,(req,res)=>{

    const result= dataservice.withdraw(req.body.acntno,req.body.pswd,req.body.amt)

    res.status(result.statusCode).json(result)
})

//gettransaction
app.post('/transaction',jwtmiddleware,(req,res)=>{

    const result= dataservice.gettransaction(req.body.acno1)

    res.status(result.statusCode).json(result)
})

//create port number
app.listen(3000,()=>{
    console.log("Server Running Successfully");
})
