import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // amnt:any
  // acno:any
  // psw:any
  // acntno:any
  // pswd:any
  // amt:any
  user:any
  constructor(private ds:DataService, private fb:FormBuilder, private router:Router){
    this.user=this.ds.currentuser
  }
  dashForm=this.fb.group({amnt:['',[Validators.required,Validators.pattern('[0-9]+')]],acno:['',[Validators.required,Validators.pattern('[0-9]+')]],psw:[''],acntno:['',[Validators.required,Validators.pattern('[0-9]+')]],pswd:[''],amt:['',[Validators.required,Validators.pattern('[0-9]+')]]})

  deposit(){
    var amnt=this.dashForm.value.amnt
    var acno=this.dashForm.value.acno
    var psw=this.dashForm.value.psw
    if(this.dashForm.valid){
      var res=this.ds.deposit(acno,psw,amnt)
     
      if(res){
       alert(`Rs:${amnt} deposited successfully. Updated balance is Rs:${res}`)
       // console.log(res);
       
      } 
      else{
       alert("Check account number or password")
      } 
    } 
    else{
      alert('Invalid Inputs')
    }  
  }


  withdraw(){
    var amt=this.dashForm.value.amt
    var acntno=this.dashForm.value.acntno
    var pswd=this.dashForm.value.pswd
    if(this.dashForm.valid){
      var wid=this.ds.withdraw(acntno,pswd,amt)
    // console.log(wid)
    if(wid){
      alert(`Rs:${amt} withdrawed successfully. Updated balance is Rs:${wid}`)
    } 
    else{
      alert('Check Account number or password')
    }
    }
    else{
      alert('Invalid inputs')
    }
  }

  logout(){
    localStorage.removeItem('currentuser')
    localStorage.removeItem('currentacnt')
    this.router.navigateByUrl('')
  }

}
