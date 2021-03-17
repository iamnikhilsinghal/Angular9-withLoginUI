import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      Email: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(f) {
    this.spinner.show();
    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.loginForm.value.Email,
          password: this.loginForm.value.Password
        })
        .subscribe(
          (response: any) => {
            console.log('response:', response);
            if (response && response.token) {
              this.snackBar.open('Login Successful!', '', {
                panelClass: ['bg-success', 'text-white']
              });
              this.authService.userUpdated.next(response);
              localStorage.setItem('crs', JSON.stringify({ user: response }));
              localStorage.setItem(
                'Info',
                JSON.stringify({ UserName: 'Nikhil Singhal' })
              );

              this.router.navigate(['dashboard']);
            } else {
              console.log('here');

              this.snackBar.open('Login Failed', '', {
                panelClass: ['bg-danger', 'text-white']
              });
            }
            this.spinner.hide();
          },
          (response) => {
            this.spinner.hide();
            if (response) {
              this.snackBar.open(response.error.error, '', {
                panelClass: ['bg-danger', 'text-white']
              });
            }
          }
        );
    }
  }
}
