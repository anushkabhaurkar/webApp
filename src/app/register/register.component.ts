import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { CommonService } from '../shared/common/common.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  name="^[a-zA-Z].*";
  constructor(private common:CommonService,private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.registerForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.pattern(this.name)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      passwordHash:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      street:new FormControl(''),
      apartment:new FormControl(''),
      city:new FormControl(''),
      zip:new FormControl(''),
      country:new FormControl(''),
    })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }


  registerUser() {

    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      
      this.common.registration(this.registerForm.value).subscribe(result =>{
        console.log(result)
        if(result){
          console.log(result);
          Swal.fire("", "Registered Successfully!", "success");
          this.router.navigate(['/']);
        }else{
          alert(result);
          Swal.fire("", "Invalid Credentials", "error");
        }
      })
    }
    else{
      Swal.fire("","Data Incomplete","error");
    }
  //   this.registerForm.markAllAsTouched();
  //   if (!this.registerForm.valid) {
  //     Swal.fire('Fill All Details','','error');
  //     return;
  //   }
  //   const newUser = {
  //     name: this.registerForm.value.name,
  //     email: this.registerForm.value.email,
  //     password: this.registerForm.value.password,
  //     phone: this.registerForm.value.phone,
  //     street: this.registerForm.value.street,
  //     apartment: this.registerForm.value.apartment,
  //     city: this.registerForm.value.city,
  //     pincode: this.registerForm.value.pincode,
  //     country: this.registerForm.value.countr,
  //   };
  //   console.log("register user ", newUser);
  //   this.common.registration(this.registerForm.value).subscribe(response=>{
       
  //       if (response) {

  //           Swal.fire(
  //             "",
  //             "Registration Successful. Activation link sent to your email address.",
  //             "success"
  //           );
  //         }
  
  //         else{
  //           Swal.fire("","invalid","error");
  //         }
  //        });
  // }
  }
}
