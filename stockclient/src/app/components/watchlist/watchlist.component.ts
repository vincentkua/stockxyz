import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

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
    localStorage.setItem('rootpage', 'watchlist');
  }

  initializeForm(): void {
    this.form = this.fb.group({
      searchstring: this.fb.control<string>('', Validators.required)
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
    alert('Invalid JWT ... Rerouting to Login Page...');
    this.router.navigate(['/login']);
  }

  handleMissingToken(): void {
    alert('JWT not found ... Rerouting to Login Page...');
    this.router.navigate(['/login']);
  }

  processform(){
    this.stocksearch = this.form.value["searchstring"]
    this.stockSvc.getWatchlist(this.stocksearch)
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

  removewatchlist(watchlistid : number){
    this.stockSvc.removeWatchlist(watchlistid, this.email)
    .then(v => {
      console.info('>>> Add Status: ', v)
      this.processform()
    }).catch(err => {
      console.error('>>> error: ', err)
    })  
  }

  logout (){
    localStorage.removeItem('jwtToken') 
    this.router.navigate(['/login'])
  }




}
