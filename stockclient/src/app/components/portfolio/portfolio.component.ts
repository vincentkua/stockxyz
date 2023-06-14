import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {

  form !: FormGroup
  stocksearch : string = ""
  stocks : Stock[] = []
  email : string = ""
  roles : string = ""
  validated : boolean = false

  constructor(private fb: FormBuilder , private stockSvc:StockService , private authSvc : AuthService , private router : Router){}

  ngOnInit(): void {
    this.email = this.authSvc.email
    this.roles = this.authSvc.roles

    this.form = this.fb.group({
      searchstring : this.fb.control<string>("", Validators.required)
    })  

    if (this.email == ""){
      alert("Please login to continue ...")
      this.router.navigate(['/login'])
    }else{
      this.authSvc.revalidate()
      .then(v=>{
        console.log(">>> User Revalidated:" , v)
        this.validated = true
        this.processform()
      })
      .catch(err=>{
        console.log(">>> Error :" , err)
        alert(err["error"]["status"])
  
      })

    }
  }

  processform(){
    this.stocksearch = this.form.value["searchstring"]
    this.stockSvc.getPortfolio(this.stocksearch, this.email)
    .then(v => {
      console.info('>>> Stock List: ', v)
      this.stocks = v
    }).catch(err => {
      console.error('>>> error: ', err)
    })  
  }

  navstockdetailpage(stockcode : string){
    this.router.navigate(['/stock/' + stockcode])
  }

  removeportfolio(portfolioid : number){
    this.stockSvc.removePortfolio(portfolioid, this.email)
    .then(v => {
      console.info('>>> Add Status: ', v)
      this.processform()
    }).catch(err => {
      console.error('>>> error: ', err)
    })  
  }




}