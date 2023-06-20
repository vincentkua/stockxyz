import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  tokenform !: FormGroup
  resetform !: FormGroup
  token : string = ""
  email : string = ""
  status : string = "tokeninput"


  constructor(private fb : FormBuilder , private authSvc : AuthService , private router : Router){}

  ngOnInit(): void {

    this.tokenform = this.fb.group({
      token : this.fb.control<string>("", Validators.required)
    })

    this.resetform = this.fb.group({
      newpassword : this.fb.control<string>("", Validators.required)
    })  
   
      
  }

  checktoken(){
    this.status= "validating"
    this.token = this.tokenform.value["token"]
        if(this.token != ""){
      this.authSvc.getResetEmail(this.token)
      .then(v=>{
        console.log(">>> Resolved :" , v)
        this.email = v["email"]
        this.status= "validated"
      })
      .catch(err=>{
        console.warn(">>> Error :" , err)
        if(err["error"]["status"] != null){
          alert(err["error"]["status"])
        }else{
          alert(err["message"])
        }  
        this.status= "tokeninput"
      })

    }

  }

  processform(){
    const newpassword : string = this.resetform.value["newpassword"]
    this.authSvc.resetUserpassword( this.token, newpassword)
    .then(v => {
      console.log('>>> Resolved: ', v)
      alert("User Password Updated!!!")
      this.router.navigate(['/login'])
    }).catch(err => {
      console.error('>>> error: ', err)
      if(err["error"]["status"] != null){
        alert(err["error"]["status"])
      }else{
        alert(err["message"])
      }  
    })

  }

}
