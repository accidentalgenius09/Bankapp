import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  constructor(private ds:DataService, private fb:FormBuilder){
    this.user=this.ds.currentuser
  }
  dashForm=this.fb.group({amnt:['',[Validators.required,Validators.pattern('[0-9]+')]],acno:['',[Validators.required,Validators.pattern('[0-9]')]],psw:[''],acntno:['',[Validators.required,Validators.pattern('[0-9]')]],pswd:[''],amt:['',[Validators.required,Validators.pattern('[0-9]')]]})

  deposit(){
    var amnt=this.dashForm.value.amnt
    var acno=this.dashForm.value.acno
    var psw=this.dashForm.value.psw
     var res=this.ds.deposit(acno,psw,amnt)
     
     if(res){
      alert(`Rs:${amnt} deposited successfully. Updated balance is Rs:${res}`)
      // console.log(res);
      
     } 
     else{
      alert("Check account number or password")
     }    
  }


  withdraw(){
    var amt=this.dashForm.value.amt
    var acntno=this.dashForm.value.acntno
    var pswd=this.dashForm.value.pswd
    var wid=this.ds.withdraw(acntno,pswd,amt)
    // console.log(wid)
    if(wid){
      alert(`Rs:${amt} withdrawed successfully. Updated balance is Rs:${wid}`)
    } 
  }

}
