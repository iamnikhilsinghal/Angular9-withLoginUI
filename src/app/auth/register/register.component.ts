import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        emailId: ['', [Validators.required, Validators.email]],
        mobileNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^[0-9]+$/)
          ]
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validator: this.passwordValidator
      }
    );
  }

  passwordValidator(form: FormGroup) {
    const condition =
      form.get('password').value !== form.get('confirmPassword').value;
    return condition ? { passwordsDoNotMatch: true } : null;
  }

  register() {
    if (this.registerForm['status'] === 'VALID') {
      console.log('Form is valid');
      console.log('Entered Data: ', this.registerForm.value);
      // this.registerService.register(this.registerForm.value).subscribe((resp: any) => {
      //   console.log('Register API response: ', resp);
      // });
    } else {
      console.log('Form is Invalid');
    }
  }
}
