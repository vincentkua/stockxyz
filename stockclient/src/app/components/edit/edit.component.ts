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
  stock : Stock = {
    id: 0,
    market: '',
    ticker: '',
    stockName: '',
    description : '',
    lastprice: 0,
    targetprice :0 ,
    epsttm: 0,
    pettm: 0,
    dps: 0,
    divyield: 0,
    bookvalue :0,
    pb: 0
  }
  market : string = ""
  ticker : string = ""
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
        market : this.fb.control<string>("-" , Validators.required),
        ticker : this.fb.control<string>("-",Validators.required),
        stockName : this.fb.control<string>("-",Validators.required),
        description : this.fb.control<string>("-",Validators.required),
        lastprice : this.fb.control<number>(0,Validators.required),
        targetprice : this.fb.control<number>(0,Validators.required),
        epsttm : this.fb.control<number>(0,Validators.required),
        pettm : this.fb.control<number>(0,Validators.required),
        dps : this.fb.control<number>(0,Validators.required),
        divyield : this.fb.control<number>(0,Validators.required),
        bookvalue : this.fb.control<number>(0,Validators.required),
        pb : this.fb.control<number>(0,Validators.required),
      })

      this.getStock()
  }

  getStock(){
    this.stockSvc.getStock(this.market, this.ticker)
    .then(v => {
      console.info('resolved: ', v)
      const stock : Stock = v;
      this.form = this.fb.group({
        market : this.fb.control<string>(this.market , Validators.required),
        ticker : this.fb.control<string>(this.ticker,Validators.required),
        stockName : this.fb.control<string>(stock.stockName,Validators.required),
        description : this.fb.control<string>(stock.description=="" ? "-" : stock.description,Validators.required),
        lastprice : this.fb.control<number>(stock.lastprice,Validators.required),
        targetprice : this.fb.control<number>(stock.targetprice,Validators.required),
        epsttm : this.fb.control<number>(stock.epsttm,Validators.required),
        pettm : this.fb.control<number>(stock.pettm,Validators.required),
        dps : this.fb.control<number>(stock.dps,Validators.required),
        divyield : this.fb.control<number>(stock.divyield,Validators.required),
        bookvalue : this.fb.control<number>(stock.bookvalue,Validators.required),
        pb : this.fb.control<number>(stock.pb,Validators.required),
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
