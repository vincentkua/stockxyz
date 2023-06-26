import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {

  stocksearch : string = ""
  stocks : Stock[] = []
  email : string = ""
  roles : string = ""
  validated : boolean = false
  strategy : string = "x"

  constructor(private fb: FormBuilder , private stockSvc:StockService , private authSvc : AuthService , private router : Router){}

  ngOnInit(): void {
    localStorage.setItem('rootpage', 'strategy');
    this.getUserStrategy();
    this.checkAndValidateToken();

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
        this.getstrategylist()
      })
      .catch((err) => {
        console.log('>>> Error:', err);
        this.handleInvalidToken();
      });
  }

  handleInvalidToken(): void {
    localStorage.removeItem('jwtToken');
    // alert('Invalid JWT ... Rerouting to Login Page...');
    this.router.navigate(['/login']);
  }

  handleMissingToken(): void {
    alert('Plase login to continue...');
    this.router.navigate(['/login']);
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
        this.getstrategylist()
      }).catch(err => {
        console.error('>>> error: ', err)
      })  
    }else{
      this.stockSvc.removeWatchlist(watchlistid)
      .then(v => {
        console.info('>>> Add Status: ', v)
        this.getstrategylist()
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
        this.getstrategylist()
      }).catch(err => {
        console.error('>>> error: ', err)
      })  
    }else{
      this.stockSvc.removePortfolio(portfolioid)
      .then(v => {
        console.info('>>> Add Status: ', v)
        this.getstrategylist()
      }).catch(err => {
        console.error('>>> error: ', err)
      })  
    }

  }

  strategyChange(event : any){
    const selectedValue = event.value;
    localStorage.setItem('strategy', selectedValue);
    this.strategy = selectedValue
    this.getstrategylist()
  }

  getstrategylist(){
    this.stockSvc.getStocksXYZ(this.strategy)
    .then(v => {
      console.info('>>> Stock List: ', v)
      this.stocks = v
    }).catch(err => {
      console.error('>>> error: ', err)
    }) 
  }

  getUserStrategy(){
    const strategy = localStorage.getItem('strategy');
    if (strategy == null){
      this.strategy = "x"
    }else{
      this.strategy = strategy
    }
  }




}