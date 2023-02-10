import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  amnt:any
  acno:any
  psw:any
  acntno:any
  pswd:any
  amt:any
  user:any
  constructor(private ds:DataService){
    this.user=this.ds.currentuser
  }

  deposit(){
    var amnt=this.amnt
    var acno=this.acno
    var psw=this.psw
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
    var amt=this.amt
    var acntno=this.acntno
    var pswd=this.pswd
    var wid=this.ds.withdraw(acntno,pswd,amt)
    // console.log(wid)
    if(wid){
      alert(`Rs:${amt} withdrawed successfully. Updated balance is Rs:${wid}`)
    } 
  }

}
