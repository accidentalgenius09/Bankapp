import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  aim="Your perfect banking partner"
  data='Account Number'
  acno:any
  psw:any

  userDetails:any={
    1000:{acno:1000,username:'surjith',password:123,balance:0},
    1001:{acno:1001,username:'bini',password:1234,balance:0},
    1002:{acno:1002,username:'kunjumon',password:12345,balance:0},
    1003:{acno:1003,username:'vibitha',password:123456,balance:0},
    1004:{acno:1004,username:'anushka',password:1234567,balance:0},
    1005:{acno:1005,username:'vyshnavi',password:12345678,balance:0},
  }

  login(){
    // alert('Wrking')
    var acno = this.acno
    var psw = this.psw
    var userDetails = this.userDetails
    if(acno in userDetails)
    {
      if(psw==userDetails[acno]["password"]){
        alert("Login Success")

      }
      else{
        alert("Incorrect password")
      }
    }
    else{
      alert("Incorrect username")
    }

  }
  acnoChange(event:any){

    this.acno=event.target.value;
    console.log(event);

  }
  pswChange(event:any){

    this.psw=event.target.value;
   
    
  }

}
