import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // acno:any
  // psw:any
  // uname:any
  constructor(private ds : DataService, private router:Router, private fb:FormBuilder){}

  registerForm=this.fb.group({uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],acno:['',[Validators.required,Validators.pattern('[0-9]+6yyy')]],psw:['']})


  register(){
    var uname = this.registerForm.value.uname
    var psw = this.registerForm.value.psw
    var acno = this.registerForm.value.acno
    if(this.registerForm.valid){
      const res = this.ds.register(acno,uname,psw)
      if(res)
      {
        alert('User created successfully')
        this.router.navigateByUrl('')
      }
      else{
        alert("User already exist")
        this.router.navigateByUrl('')

      }
    }
    else{
      alert('Invalid Form')
    }
  }
}
