import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  transaction:any
  acno1:any
  constructor(private data:DataService){
    this.acno1=JSON.parse(localStorage.getItem('currentaccount')||"")
    this.data.gettransaction(this.acno1).subscribe((result:any)=>{
      this.transaction=result.message
    })
  }

  
}
