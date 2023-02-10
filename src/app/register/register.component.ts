import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  acno:any
  psw:any
  uname:any
  constructor(private ds : DataService, private router:Router){}

  register(){
    var uname = this.uname
    var psw = this.psw
    var acno = this.acno
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
}
