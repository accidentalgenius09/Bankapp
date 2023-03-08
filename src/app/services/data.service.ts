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

  constructor(private http:HttpClient) { 
  }

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
    const data={
      acno1
    }
    return this.http.post('http://localhost:3000/transaction',data,this.gettoken())
  }


}

