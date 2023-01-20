import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

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

  constructor (private router:Router,private log:DataService){ }


  login(){
    var acno = this.acno
    var psw = this.psw
    const logres=this.log.login(acno,psw)
    if(logres){
      alert("Login Success")
      this.router.navigateByUrl('dashboard')
    }
    else{
      alert("User not found")
    }
  }
}