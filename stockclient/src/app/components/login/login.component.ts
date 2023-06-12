import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform !: FormGroup


  constructor(private fb : FormBuilder , private authSvc : AuthService){}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email : this.fb.control<string>("peter@gmail.com", Validators.required) ,
      password : this.fb.control<string>("peter123", Validators.required)
    })
      
  }

  processform(){
    console.log(this.loginform.value)
    this.authSvc.signinUser(this.loginform.value)

    console.log(this.authSvc.email)
  }
}
