import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentuser:any
  currentaccount:any

  constructor() { }

  userDetails:any={
    1000:{acno:1000,username:'Surjith',password:123,balance:0,transaction:[]},
    1001:{acno:1001,username:'Bini',password:1234,balance:0,transaction:[]},
    1002:{acno:1002,username:'Kunjumon',password:12345,balance:0,transaction:[]},
    1003:{acno:1003,username:'Vibitha',password:123456,balance:0,transaction:[]},
    1004:{acno:1004,username:'Anushka',password:1234567,balance:0,transaction:[]},
    1005:{acno:1005,username:'Vyshnavi',password:12345678,balance:0,transaction:[]},
  }

  register(acno:any,uname:any,psw:any){

    var userDetails = this.userDetails
    if(acno in userDetails){
      return false
    }
    else{
      userDetails[acno]={acno:acno,username:uname,password:psw,balance:0,transaction:[]}
      console.log(userDetails);
      
      return true
    }

  }
  login(acno:any,psw:any){

    var userDetails=this.userDetails
    if(acno  in userDetails){
      if(psw==userDetails[acno]["password"]){
        this.currentuser=userDetails[acno]['username']
        // this.currentaccount=userDetails[acno]
        this.currentaccount=acno
        return true
      }
      else{
        return false
      }
    }
    else{
      return false
    }
  }

  deposit(acno:any,psw:any,amnt:any){

    var userDetails=this.userDetails
    var amt=parseInt(amnt)


    if(acno in userDetails){
      if(psw==userDetails[acno]["password"]){
        userDetails[acno]["balance"]+=amt
        userDetails[acno]['transaction'].push({type:'Credit',amount:amt})
        return userDetails[acno]["balance"]
      }
      else{
        alert("Incorrect password")
      }
    }
    else{
      alert("Incorrect Account number")
    }
  }

  withdraw(acntno:any,pswd:any,amt:any){
    var userDetails= this.userDetails
    var amnt=parseInt(amt)

    if(acntno in userDetails){
      if(pswd==userDetails[acntno]["password"]){
        if(amnt<=userDetails[acntno]['balance']){

          userDetails[acntno]['balance']-=amnt
          userDetails[acntno]['transaction'].push({type:'Debit',amount:amnt})

          return userDetails[acntno]['balance']
        }
        else{
          alert('Insufficient Balance')
        }
      }
      else{
        alert("Incorrect password")
      }
    }
    else{
      alert("Incorrect Account number")
    }
  }

  gettransaction(acno1:any){
    return this.userDetails[acno1]['transaction']
  }

}
