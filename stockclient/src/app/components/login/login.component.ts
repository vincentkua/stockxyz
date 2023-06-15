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

    // Check JWT exist and validate it....
    const token = localStorage.getItem('jwtToken');
    if(token != null){
      this.authSvc.validateJWT(token)
      .then(v=>{
        alert("Welcome Back...")
        this.router.navigate(['/all'])

      })
      .catch(err=>{
        console.log(">>> Error :" , err)
        alert(err["error"]["status"])
        localStorage.removeItem('jwtToken')  
      })

    }
    
      
  }

  processform(){
    this.authSvc.signinUser(this.loginform.value)
    .then(v=>{
      console.log(">>> Resolved:" , v)
      // save JWT Token
      localStorage.setItem('jwtToken', v["jwtToken"]);
      // nav to main page
      this.router.navigate(['/all'])
      
    })
    .catch(err=>{
      console.log(">>> Error :" , err)
      alert(err["error"]["status"])

    })

  }
}
