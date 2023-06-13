import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform !: FormGroup


  constructor(private fb : FormBuilder , private authSvc : AuthService , private router : Router){}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email : this.fb.control<string>("", Validators.required) ,
      password : this.fb.control<string>("", Validators.required)
    })
      
  }

  processform(){
    this.authSvc.signinUser(this.loginform.value)
    .then(v=>{
      console.log(">>> Resolved:" , v)
      //preset the auth setting for auth later....
      this.authSvc.email = this.loginform.value["email"]
      this.authSvc.password = this.loginform.value["password"]
      this.authSvc.roles = v["roles"]
      this.authSvc.islogin = true
      // nav to main page
      this.router.navigate(['/all'])
      
    })
    .catch(err=>{
      console.log(">>> Error :" , err)
      alert(err["error"]["status"])

    })

  }
}
