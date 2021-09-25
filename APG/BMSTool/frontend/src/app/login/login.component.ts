import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  first_name: string="";
  last_name:string=""; 
  email:string="";
  password:string="";
 
 /* myForm:FormGroup;

  constructor(public fb:FormBuilder) {
    this.myForm=this.fb.group({
      FirstName:['',[Validators.required]],
      LastName:['',[Validators.required]], 
      Email:['',[Validators.required]],
      Password:['',[Validators.required]],
      ConfirmPassword:['',[Validators.required,Validators.minLength(8)]]
    })
   } */
   constructor(){

   }

  onSubmit(signupform:any)
  {
    console.log(signupform)
  }

  ngOnInit(): void { 
  }


}
