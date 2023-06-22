import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {

  notificationform!: FormGroup
  email : string  = ""
  roles : string  = ""
  validated : boolean = false

  constructor(private fb : FormBuilder , private stockSvc:StockService , private authSvc:AuthService , private notificationSvc : NotificationService){}

  ngOnInit(): void {
    this.email = "";
    this.roles = "";
    this.validated = false;
    this.initializeForm();
    this.checkAndValidateToken();
  }

  initializeForm(): void {
    this.notificationform = this.fb.group({
      title : this.fb.control<string>("",Validators.required),
      content : this.fb.control<string>("", Validators.required),

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
          // alert('You are not allowed to use this module');
        }
        

      })
      .catch((err) => {
        console.log('>>> Error:', err);
        this.handleInvalidToken();
      });
  }

  handleInvalidToken(): void {
    localStorage.removeItem('jwtToken');
    alert('Invalid JWT ... ');

  }

  handleMissingToken(): void {
    console.log('Please login to see the notification ...');
  }

  processform(){
    this.notificationSvc.sendNotification(this.notificationform.value)
    .then(v => {
      console.info('resolved: ', v)
      alert(v['status'])
      this.ngOnInit()
    }).catch(err => {
      console.error('>>> Error :', err);
          if(err["error"]["status"] != null){
            alert(err["error"]["status"])
          }else{
            alert(err["message"])
          }  
    })

  }

}
