import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  // amnt:any
  acno: any;
  // psw:any
  // acntno:any
  // pswd:any
  dateNtime: any;
  // amt:any
  user: any;
  constructor(
    private ds: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentuser') || '')
    this.dateNtime = new Date();
  }
  dashForm = this.fb.group({
    amnt: ["", [Validators.required, Validators.pattern("[0-9]+")]],
    acno: ["", [Validators.required, Validators.pattern("[0-9]+")]],
    psw: [""],
    acntno: ["", [Validators.required, Validators.pattern("[0-9]+")]],
    pswd: [""],
    amt: ["", [Validators.required, Validators.pattern("[0-9]+")]],
  });
  ngOnInit(): void {
    // if (!localStorage.getItem("currentacnt")) {
    //   alert("Please Login 1st");
    //   this.router.navigateByUrl("");
    // }
  }
  deposit() {
    var amnt = this.dashForm.value.amnt;
    var acno = this.dashForm.value.acno;
    var psw = this.dashForm.value.psw;
      this.ds.deposit(acno, psw, amnt).subscribe((result:any)=>{
        alert(`Rs:${amnt} deposited successfully. Updated balance is Rs:${result.message}`)
      },result=>{
        alert(result.error.message);
      })
}

  withdraw() {
    var amt = this.dashForm.value.amt;
    var acntno = this.dashForm.value.acntno;
    var pswd = this.dashForm.value.pswd;
    this.ds.withdraw(acntno, pswd, amt).subscribe((result:any)=>{
      alert(
        `Rs:${amt} withdrawed successfully. Updated balance is Rs:${result.message}`
      );
    },result=>{
      alert(result.error.message);
    })
  }
  logout() {
    localStorage.removeItem("currentuser");
    localStorage.removeItem("currentacnt");
    this.router.navigateByUrl("");
  }

  delete() {
    this.acno = JSON.parse(localStorage.getItem("currentacnt") || "");
  }
  oncancel() {
    this.acno = "";
  }
}
