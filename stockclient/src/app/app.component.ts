import { Component , OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { NotificationComponent } from './components/notification/notification.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'stockxyz';
  message:any = null;
  @ViewChild(NotificationComponent)
  NotifyComp !: NotificationComponent

  constructor(private router:Router , private authSvc : AuthService , private dialog : MatDialog){}

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }

  routepage(pagename : string){
    this.router.navigate(['/' + pagename])
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
           this.authSvc.notificationToken = currentToken
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received.', payload);
      this.message = payload;
      this.openNotificationDialog(payload);
    });
 
  }
  
  openNotificationDialog(payload: any): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      data: payload,
      height: '400px',
      width: '600px'
      
    });
  
    dialogRef.afterClosed().subscribe(() => {
      // Handle any actions after the dialog is closed, if needed
    });
  }

  initNotificationView(){
    this.NotifyComp.ngOnInit();
  }
}
