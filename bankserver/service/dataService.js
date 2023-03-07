//import db.js
const db = require("./db")
// import jsonwebtoken
const jwt = require('jsonwebtoken')

userDetails = {
  1000: {
    acno: 1000,
    username: "Surjith",
    password: 123,
    balance: 0,
    transaction: [],
  },
  1001: {
    acno: 1001,
    username: "Bini",
    password: 1234,
    balance: 0,
    transaction: [],
  },
  1002: {
    acno: 1002,
    username: "Kunjumon",
    password: 12345,
    balance: 0,
    transaction: [],
  },
  1003: {
    acno: 1003,
    username: "Vibitha",
    password: 123456,
    balance: 0,
    transaction: [],
  },
  1004: {
    acno: 1004,
    username: "Anushka",
    password: 1234567,
    balance: 0,
    transaction: [],
  },
  1005: {
    acno: 1005,
    username: "Vyshnavi",
    password: 12345678,
    balance: 0,
    transaction: [],
  },
};

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

  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      userDetails[acno]["balance"] += amt;
      userDetails[acno]["transaction"].push({ type: "Credit", amount: amt });
      return {
        statusCode: 200,
        status: true,
        message: userDetails[acno]["balance"],
      };
    } else {
      return {
        statusCode: 401,
        status: false,
        message: "Incorrect Password"
      };
    }
  } else {
    return {
      statusCode: 401,
      status: false,
      message: "User not found",
    };
  }
};

withdraw=(acntno,pswd,amt)=>{
    var amnt=parseInt(amt)

    if(acntno in userDetails){
      if(pswd==userDetails[acntno]["password"]){
        if(amnt<=userDetails[acntno]['balance']){

          userDetails[acntno]['balance']-=amnt
          userDetails[acntno]['transaction'].push({type:'Debit',amount:amnt})
          return {statusCode: 200,
            status: true,
            message:userDetails[acntno]['balance']
        }
        }
        else{ return{
            statusCode: 401,
            status: false,
            message: "Insufficient Balance"}
        }
      }
      else{return {
        statusCode: 401,
        status: false,
        message:"Incorrect password"}
      }
    }
    else{return {
        statusCode: 401,
        status: false,
        message:"Incorrect Account number"}
    }
  }
  gettransaction=(acno1)=>{
    if(acno1 in userDetails){
        return{
            statusCode: 200,
            status: true,
            message:userDetails[acno1]['transaction']
        }
    }
    else{
        return{
            statusCode: 401,
            status: false,
            message:"Incorrect Account Number"
        }
    }
  }
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettransaction,
  
};
