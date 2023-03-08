//import db.js
const db = require("./db")
// import jsonwebtoken
const jwt = require('jsonwebtoken')

// register

register = (acno, uname, psw) => {
  return db.User.findOne({acno}).then(user=>{
    if(user){
      return {
        statusCode: 401,
        status: false,
        message: "User Already Exist",
      };
    }
    else{
      const newuser=new db.User({
        acno,
        username: uname,
        password: psw,
        balance: 0,
        transaction: []
      })
      newuser.save()
      return {
        statusCode: 200,
        status: true,
        message: "Registration Success",
      };
    }
  })
}

login = (acno, psw) => {

  return db.User.findOne({acno,password:psw}).then(user=>{
    if(user){
      const token = jwt.sign({currentAcno:acno},'secretkey123')
      return {
        statusCode: 200,
        status: true,
        message: "Login Success",
        currentAcno:acno,
        currentUser:user.username,
        token
      };
    }
    else{
      return {
        statusCode: 401,
        status: false,
        message: "Incorrect Password or Account number",
      };
    }
  })
}

deposit = (acno,psw,amnt) => {
  var amt = parseInt(amnt);

  return db.User.findOne({acno,password:psw}).then(user=>{
    if(user){
      user.balance += amt;
      user.transaction.push({ type: "Credit", amount: amt });
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: `${user.balance}`
      };
    }
    else{
        return {
          statusCode: 401,
          status: false,
          message: "Incorrect Password or Account Number"
        };
    }
  })
}

withdraw=(acntno,pswd,amt)=>{
    var amnt=parseInt(amt)

    return db.User.findOne({acno:acntno,password:pswd}).then(user=>{
      if(user){
        if(amnt<=user.balance){
          user.balance-=amnt
          user.transaction.push({type:'Debit',amount:amnt})
          user.save()
          return {
            statusCode: 200,
            status: true,
            message:`${user.balance}`
          }}
          else{ 
            return{
            statusCode: 401,
            status: false,
            message: "Insufficient Balance"}
        }
      }
      else{
        return {
        statusCode: 401,
        status: false,
        message:"Incorrect password or account number"}
      }
    })
  }
  gettransaction=acno1=>{

    return db.User.findOne({acno:acno1}).then(user=>{
      if(user){
        return{
          statusCode: 200,
          status: true,
          message:user.transaction
      }
      }
      else{
        return{
          statusCode: 401,
          status: false,
          message:"Incorrect Account Number"
      }
      }
    })
  }
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettransaction,
  
};
