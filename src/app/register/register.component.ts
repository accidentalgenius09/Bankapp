import { Component } from '@angular/core';
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
  constructor(private ds : DataService){}

  register(){
    var uname = this.uname
    var psw = this.psw
    var acno = this.acno
    const res = this.ds.register(acno,uname,psw)
    if(res)
    {
      alert('User created successfully')
    }
    else{
      alert("User already exist")
    }
  }
}
