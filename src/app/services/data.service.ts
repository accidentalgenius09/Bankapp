import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

// header global overloading
const option={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userDetails:any
  currentuser:any
  currentaccount:any

  constructor(private http:HttpClient) { 
  }

   savedetails(){
   if(this.userDetails){
    localStorage.setItem("database",JSON.stringify(this.userDetails))
   } 
   if(this.currentuser){
    localStorage.setItem('currentuser',JSON.stringify(this.currentuser))
   }
   if(this.currentaccount){
    localStorage.setItem('currentacnt',JSON.stringify(this.currentaccount))
   }
  }

  // getdetails(){
  //   if(localStorage.getItem('database')){
  //     this.userDetails=JSON.parse(localStorage.getItem('database') || '')
  //   }
  //   if(localStorage.getItem('currentuser')){
  //     this.currentuser=JSON.parse(localStorage.getItem('currentuser') || '')
  //   }
  //   if(localStorage.getItem('currentacnt')){
  //     this.currentaccount=JSON.parse(localStorage.getItem('currentacnt') || '')
  //   }
  // }

  // userDetails:any={
  //   1000:{acno:1000,username:'Surjith',password:123,balance:0,transaction:[]},
  //   1001:{acno:1001,username:'Bini',password:1234,balance:0,transaction:[]},
  //   1002:{acno:1002,username:'Kunjumon',password:12345,balance:0,transaction:[]},
  //   1003:{acno:1003,username:'Vibitha',password:123456,balance:0,transaction:[]},
  //   1004:{acno:1004,username:'Anushka',password:1234567,balance:0,transaction:[]},
  //   1005:{acno:1005,username:'Vyshnavi',password:12345678,balance:0,transaction:[]},
  // }

  gettoken(){
    const token =JSON.parse(localStorage.getItem('token') || '')

    let headers=new HttpHeaders()

    if(token){
      option.headers=headers.append('access-token',token)
    }

    return option
  }

  register(acno:any,uname:any,psw:any){

    const data={
      acno,
      uname,
      psw
    }
    return this.http.post('http://localhost:3000/register',data)

  }
  login(acno:any,psw:any){
    const data={
      acno,psw
    }
    return this.http.post('http://localhost:3000/login',data)
  }

  deposit(acno:any,psw:any,amnt:any){
    const data={
      acno,psw,amnt
    }
    return this.http.post('http://localhost:3000/deposit',data,this.gettoken())
    }
   
  

  withdraw(acntno:any,pswd:any,amt:any){
    const data={
      acntno,pswd,amt
    }
    return this.http.post('http://localhost:3000/withdraw',data,this.gettoken())
  }

  gettransaction(acno1:any){
    return this.userDetails[acno1]['transaction']
  }


}

