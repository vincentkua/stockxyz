import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from 'src/app/models/models';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  stock !: Stock
  form!:FormGroup

  constructor(private fb:FormBuilder , private stockSvc:StockService){}

  ngOnInit(): void {
      this.form = this.fb.group({
        market : this.fb.control<string>("NASDAQ",Validators.required),
        ticker : this.fb.control<string>("", Validators.required),
        stockName : this.fb.control<string>("",Validators.required)
      })
  }

  processform(){
    this.stock = this.form.value
    this.stockSvc.addStocks(this.stock)
    .then(v => {
      console.info('resolved: ', v)
      alert(v)
      this.ngOnInit()
    }).catch(err => {
      console.error('>>> error: ', err)
    })
  }

}
