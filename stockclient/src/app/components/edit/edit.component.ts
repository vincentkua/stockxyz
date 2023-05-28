import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  market : string = ""
  ticker : string = ""
  stockName : string = ""
  lastprice : number = 0
  stock !: Stock
  form!:FormGroup

  constructor(private activatedRoute: ActivatedRoute , private fb:FormBuilder , private stockSvc : StockService , private router : Router){}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((params)=>{
        const marketticker = params['ticker']
        const [market, ticker] = marketticker.split(':');
        this.market = market
        this.ticker = ticker
      })

      //Initiate the form with empty data , reassign with value after getStock asyn method is completed
      this.form = this.fb.group({
        market : this.fb.control<string>("" , Validators.required),
        ticker : this.fb.control<string>("",Validators.required),
        stockName : this.fb.control<string>("",Validators.required),
        lastprice : this.fb.control<number>(0,Validators.required),
      })

      this.getStock()
  }

  getStock(){
    this.stockSvc.getStock(this.market, this.ticker)
    .then(v => {
      console.info('resolved: ', v)
      const stock : Stock = v;
      this.stockName = stock.stockName
      this.lastprice = stock.lastprice

      this.form = this.fb.group({
        market : this.fb.control<string>(this.market , Validators.required),
        ticker : this.fb.control<string>(this.ticker,Validators.required),
        stockName : this.fb.control<string>(this.stockName,Validators.required),
        lastprice : this.fb.control<number>(this.lastprice,Validators.required),
      })

    }).catch(err => {
      console.error('>>> error: ', err)
    })

  }

  processform(){
    this.stock = this.form.value
    this.stockSvc.updateStock(this.stock)
    .then(v => {
      console.info('resolved: ', v)
      alert(v)
      this.backtostock()
      
      
    }).catch(err => {
      console.error('>>> error: ', err)
    })

  }

  backtostock(){
    this.router.navigate(['/stock/'+this.market + ":" + this.ticker])
  }

}
