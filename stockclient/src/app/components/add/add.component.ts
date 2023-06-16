import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  stock !: Stock
  form!:FormGroup
  email : string  = ""
  roles : string  = ""
  validated : boolean = false


  constructor(private fb:FormBuilder , private stockSvc:StockService , private authSvc:AuthService , private router : Router){}

  ngOnInit(): void {
    this.initializeForm();
    this.checkAndValidateToken();
  }

  initializeForm(): void {
      this.form = this.fb.group({
        market : this.fb.control<string>("NASDAQ",Validators.required),
        ticker : this.fb.control<string>("", Validators.required),
        stockName : this.fb.control<string>("",Validators.required)
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

  processform(){
    this.stock = this.form.value
    this.stockSvc.addStocks(this.stock)
    .then(v => {
      console.info('resolved: ', v)
      alert(v)
      this.ngOnInit()
    }).catch(err => {
      console.error('>>> error: ', err)
      alert("failed to add this stock...")
    })
  }

}
