import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  userDetails:any={
    1000:{acno:1000,username:'surjith',password:123,balance:0},
    1001:{acno:1001,username:'bini',password:1234,balance:0},
    1002:{acno:1002,username:'kunjumon',password:12345,balance:0},
    1003:{acno:1003,username:'vibitha',password:123456,balance:0},
    1004:{acno:1004,username:'anushka',password:1234567,balance:0},
    1005:{acno:1005,username:'vyshnavi',password:12345678,balance:0},
  }

  register(acno:any,uname:any,psw:any){

    var userDetails = this.userDetails
    if(acno in userDetails){
      return false
    }
    else{
      userDetails[acno]={acno:acno,username:uname,password:psw,balance:0}
      console.log(userDetails);
      
      return true
    }

  }
  login(acno:any,psw:any){

    var userDetails=this.userDetails
    if(acno  in userDetails){
      if(psw==userDetails[acno]["password"]){
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
}
