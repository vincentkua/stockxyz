import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notification } from 'src/app/models/models';
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
  notifications : Notification[] = []

  constructor(private fb : FormBuilder , private stockSvc:StockService , private authSvc:AuthService , private notificationSvc : NotificationService){}

  ngOnInit(): void {
    this.email = "";
    this.roles = "";
    this.notifications = []
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
            console.error(err["error"]["status"])
          }else{
            console.error(err["message"])
          }  
          localStorage.removeItem('jwtToken');
        });
    } else {
      console.log('Please login to see the notification ...');
      this.notifications = []
    }
  }

  parseAndProcessToken(token: string): void {
    this.authSvc
      .parseJWT(token)
      .then((result) => {
        console.log('>>> ', result);
        this.email = result.email;
        this.roles = result.role;
        this.getNotification();       

      })
      .catch((err) => {
        console.log('>>> Error:', err);
        localStorage.removeItem('jwtToken');
      });
  }



  getNotification(){
    this.notificationSvc.getNotification()
    .then(v => {
      this.notifications = v["notifications"]
      console.warn(this.notifications)
    }).catch(err => {
      console.error('>>> Error :', err);
          if(err["error"]["status"] != null){
            alert(err["error"]["status"])
          }else{
            alert(err["message"])
          }  
    })
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

  clearNotification(){
    this.notificationSvc.clearNotification()
    .then(v => {
      console.info('resolved: ', v)
      alert(v)
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
