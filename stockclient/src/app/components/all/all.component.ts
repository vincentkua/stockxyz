import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from 'src/app/models/models';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  form !: FormGroup
  stocksearch : string = ""
  stocks : Stock[] = []

  constructor(private fb: FormBuilder , private stockSvc:StockService){}

  ngOnInit(): void {
      this.form = this.fb.group({
        searchstring : this.fb.control<string>("", Validators.required)
      })

      this.processform()
  }

  processform(){
    this.stocksearch = this.form.value["searchstring"]
    this.stockSvc.getStocks(this.stocksearch)
    .then(v => {
      console.info('resolved: ', v)
      this.stocks = v
    }).catch(err => {
      console.error('>>> error: ', err)
    })

    

  }




}
