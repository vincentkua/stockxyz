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
  disableresetbtn : boolean = false
  displaymode : string = "default"


  constructor(private fb : FormBuilder , private authSvc : AuthService , private router : Router){}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email : this.fb.control<string>("", [Validators.required, Validators.email]) ,
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
        console.warn(">>> Error :" , err)
        if(err["error"]["status"] != null){
          alert(err["error"]["status"])
        }else{
          alert(err["message"])
        }  
        localStorage.removeItem('jwtToken')  
      })

    }
    
      
  }

  processform(){
    const notificationToken : string = this.authSvc.notificationToken;
    this.authSvc.signinUser(this.loginform.value , notificationToken)
    .then(v=>{
      console.log(">>> Resolved:" , v)
      // save JWT Token
      localStorage.setItem('jwtToken', v["jwtToken"]);
      // nav to main page
      this.router.navigate(['/all'])
      
    })
    .catch(err=>{
      console.warn(">>> Error :" , err)
      if(err["error"]["status"] != null){
        alert(err["error"]["status"])
      }else{
        alert(err["message"])
      }    

    })

  }

  resetpass() {

    if(this.disableresetbtn == false){
      this.disableresetbtn = true;
      this.displaymode = "sendingmail"
      const email = this.loginform.value["email"];
      const emailRegex = /^\S+@\S+\.\S+$/; // Regular expression for email validation
    
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        this.disableresetbtn = false;
        this.displaymode = "default"
      } else {
        this.authSvc.resetPassword(email)
        .then(v=>{
          console.log(">>> Resolved:" , v) 
          alert(v["status"]) 
          this.disableresetbtn = false;  
          this.displaymode = "default"
          this.router.navigate(['/reset'])    
        })
        .catch(err=>{
          console.warn(">>> Error :" , err)
          if(err["error"]["status"] != null){
            alert(err["error"]["status"])
          }else{
            alert(err["message"])
          }     
          this.disableresetbtn = false;
          this.displaymode = "default"
        })
      }
    }

  }

}
