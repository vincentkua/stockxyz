import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
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
  email : string = ""
  roles : string = ""
  validated : boolean = false

  constructor(private fb: FormBuilder , private stockSvc:StockService , private authSvc : AuthService , private router : Router){}

  ngOnInit(): void {
    this.initializeForm();
    this.checkAndValidateToken();
    localStorage.setItem('rootpage', 'all');
  }

  initializeForm(): void {
    this.form = this.fb.group({
      searchstring: this.fb.control<string>('')
    });
  }

  checkAndValidateToken(): void {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      console.log('>>> Validating JWT Token...');
      this.authSvc
        .validateJWT(token)
        .then(() => {
          console.log('>>> JWT Token verified... Getting Email and role....');
          this.parseAndProcessToken(token);
        })
        .catch((err) => {
          console.log('>>> Error :', err);
          if(err["error"]["status"] != null){
            alert(err["error"]["status"])
          }else{
            alert(err["message"])
          }  
          this.handleInvalidToken();
        });
    } else {
      this.handleMissingToken();
    }
  }

  parseAndProcessToken(token: string): void {
    this.authSvc
      .parseJWT(token)
      .then((result) => {
        console.log('>>> ', result);
        this.email = result.email;
        this.roles = result.role;
        this.validated = true;
        this.processform();
      })
      .catch((err) => {
        console.log('>>> Error:', err);
        this.handleInvalidToken();
      });
  }

  handleInvalidToken(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  handleMissingToken(): void {
    alert('Plase login to continue...');
    this.router.navigate(['/login']);
  }

  processform() : void{
    this.stocksearch = this.form.value["searchstring"]
    this.stockSvc.getStocks(this.stocksearch)
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

  logout (){
    localStorage.removeItem('jwtToken') 
    this.router.navigate(['/login'])
  }

  togglewatchlist(stockid : number , watchlistid : number, newcheckedstatus : boolean){
    
    if(newcheckedstatus == true){
      this.stockSvc.addWatchlist(stockid)
      .then(v => {
        console.info('>>> Add Status: ', v)
        this.processform()
      }).catch(err => {
        console.error('>>> error: ', err)
      })  
    }else{
      this.stockSvc.removeWatchlist(watchlistid)
      .then(v => {
        console.info('>>> Add Status: ', v)
        this.processform()
      }).catch(err => {
        console.error('>>> error: ', err)
      })  
    }

  }

  toggleportfolio(stockid : number , portfolioid : number, newcheckedstatus : boolean){
    
    if(newcheckedstatus == true){
      this.stockSvc.addPortfolio(stockid)
      .then(v => {
        console.info('>>> Add Status: ', v)
        this.processform()
      }).catch(err => {
        console.error('>>> error: ', err)
      })  
    }else{
      this.stockSvc.removePortfolio(portfolioid)
      .then(v => {
        console.info('>>> Add Status: ', v)
        this.processform()
      }).catch(err => {
        console.error('>>> error: ', err)
      })  
    }

  }




}
