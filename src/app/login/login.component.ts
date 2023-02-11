import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  navigateByUrl(arg0: string) {
    throw new Error('Method not implemented.');
  }
  aim="Your perfect banking partner"
  data='Account Number'
  // acno:any
  // psw:any

  constructor (private router:Router,private log:DataService, private fb:FormBuilder){ }
loginForm=this.fb.group({acno:['',[Validators.required,Validators.pattern('[0-9]+')]],psw:['']})

  login(){
    var acno = this.loginForm.value.acno
    var psw = this.loginForm.value.psw
    if(this.loginForm.valid){
      const logres=this.log.login(acno,psw)
      if(logres){
        alert("Login Success")
        this.router.navigateByUrl('dashboard')
      }
      else{
        alert("User not found")
      }
      }
    else{
      alert("Invalid Login Details")
    }
  }
}