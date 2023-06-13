import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupform !: FormGroup


  constructor(private fb : FormBuilder , private authSvc : AuthService){}

  ngOnInit(): void {
    this.signupform = this.fb.group({
      email : this.fb.control<string>("", Validators.required) ,
      password : this.fb.control<string>("", Validators.required)
    })
      
  }

  processform(){
    console.log(this.signupform.value)
    this.authSvc.signupUser(this.signupform.value)
    .then(v => {
      console.log('>>> Resolved: ', v)
    }).catch(err => {
      console.error('>>> error: ', err)
    })
  }
}

