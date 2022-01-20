import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { core } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../shared/common/common.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;

  constructor(private router: Router, private common: CommonService) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginFormGroup.controls[controlName].hasError(errorName);
  };

  
  login() {
    if (this.loginFormGroup.valid) {
      this.common.login(this.loginFormGroup.value).subscribe((result) => {
        if (result.message == 'success') {
          console.log(result);
          localStorage.setItem('Token', result.token);
          localStorage.setItem('isAdmin', result.isAdmin);
          Swal.fire('', 'Logged In Successfully!', 'success');
          this.router.navigate(['/home']);
      
        } else {
          alert(result.message);
          Swal.fire('', 'Invalid Credentials', 'error');
        }
      });
    } else {
      Swal.fire('', 'Fill Data..!', 'error');
    }
  }
}
