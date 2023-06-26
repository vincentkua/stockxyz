import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  stock !: Stock 
  market : string = ""
  ticker : string = ""
  form!:FormGroup
  email : string  = ""
  roles : string  = ""
  validated : boolean = false

  constructor(private activatedRoute: ActivatedRoute , private fb:FormBuilder , private stockSvc : StockService , private router : Router , private authSvc : AuthService){}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((params)=>{
        const marketticker = params['ticker']
        const [market, ticker] = marketticker.split(':');
        this.market = market
        this.ticker = ticker
      })
    this.initializeForm();
    this.checkAndValidateToken();
  }

  initializeForm(): void {
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
      stockx : this.fb.control<boolean>(false),
      stocky : this.fb.control<boolean>(false),
      stockz : this.fb.control<boolean>(false),
    })
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

        if(this.roles == "admin"){
          this.validated = true;
          this.getStock()
        }else{
          alert('You are not allowed to use this module');
          this.router.navigate(['/']);
        }
        

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

  getStock(){
    this.stockSvc.getStock(this.market, this.ticker)
    .then(v => {
      console.info('resolved: ', v)
      this.stock = v;
      this.form = this.fb.group({
        market : this.fb.control<string>(this.market , Validators.required),
        ticker : this.fb.control<string>(this.ticker,Validators.required),
        stockName : this.fb.control<string>(this.stock.stockName,Validators.required),
        description : this.fb.control<string>(this.stock.description=="" ? "-" : this.stock.description,Validators.required),
        lastprice : this.fb.control<number>(this.stock.lastprice,Validators.required),
        targetprice : this.fb.control<number>(this.stock.targetprice,Validators.required),
        epsttm : this.fb.control<number>(this.stock.epsttm,Validators.required),
        pettm : this.fb.control<number>(this.stock.pettm,Validators.required),
        dps : this.fb.control<number>(this.stock.dps,Validators.required),
        divyield : this.fb.control<number>(this.stock.divyield,Validators.required),
        bookvalue : this.fb.control<number>(this.stock.bookvalue,Validators.required),
        pb : this.fb.control<number>(this.stock.pb,Validators.required),
        stockx : this.fb.control<boolean>(this.stock.stockx),
        stocky : this.fb.control<boolean>(this.stock.stocky),
        stockz : this.fb.control<boolean>(this.stock.stockz),
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

  deletestock(id : number){
    const comfirmdelete =  confirm("Are you sure to delete this stock?")
    if(comfirmdelete){
      this.stockSvc.deleteStock(id)
      .then(v => {
        console.info('resolved: ', v)
        alert(v)
        this.router.navigate(['/'])   
      }).catch(err => {
        console.error('>>> error: ', err)
      })
    }
    
  }

  backtostock(){
    this.router.navigate(['/stock/'+this.market + ":" + this.ticker])
  }

}
