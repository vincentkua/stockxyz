import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stockxyz';

  constructor(private router:Router , private authSvc : AuthService){}

  routepage(pagename : string){
    this.router.navigate(['/' + pagename])
  }
}
