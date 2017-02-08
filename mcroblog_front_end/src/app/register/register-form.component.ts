/**
 * Created by tianzhang on 2017/1/22.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/http/authentication.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {equalValidator} from "./forbiden-validator.directive";
@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  model = {
    'username': '',
    'password': '',
    'email': '',
    'first_name': '',
    'last_name': '',
  }

  isWeak: boolean;
  isMiddle: boolean;
  isStrong: boolean;

  registerForm: FormGroup;
  error: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      'username': [this.model.username, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.pattern(/^(?!_)[a-zA-Z0-9_\u4e00-\u9fa5]+$/),
      ]],

      'password': [this.model.password, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.pattern(/^[a-zA-Z0-9!@#$%^&*_]+$/),
        equalValidator('passwordConfirm'),

      ]],

      'passwordConfirm': [, [
        equalValidator('password'),
      ]],


      'email': [this.model.email, [
        Validators.required,
        Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
      ]],

      'first_name': [this.model.first_name, [
        Validators.required,
      ]],

      'last_name': [this.model.last_name, [
        Validators.required,
      ]],

    });


    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {

    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm;

    if (form.get('password').value == '') {
      this.isStrong = false;
      this.isWeak = false;
      this.isMiddle = false;
    }
    else if (form.get('password').value.match(/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*_]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*_]+$)(?![\d!@#$%^&*_]+$)[a-zA-Z\d!@#$%^&*_]+$/)) {
      this.isStrong = true;
      this.isWeak = false;
      this.isMiddle = false;
    }
    else if (form.get('password').value.match(/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*_]+$)[a-zA-Z\d!@#$%^&*_]+$/)) {
      this.isStrong = false;
      this.isWeak = false;
      this.isMiddle = true;
    }
    else if (form.get('password').value.match(/^(?:\d+|[a-zA-Z]+|[!@#$%^&*_]+)$/)) {
      this.isStrong = false;
      this.isWeak = true;
      this.isMiddle = false;
    }

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'username': '',
    'password': '',
    'passwordConfirm': '',
    'email': '',
    'first_name': '',
    'last_name': '',
  };

  validationMessages = {
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 4 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
      'pattern': 'Contain unsupported characters'
    },

    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 24 characters long.',
      'pattern': 'Contain unsupported characters',
      'validateEqual': 'Confirm password is different from password',
    },

    'passwordConfirm': {
      'required': 'passwordConfirm is required.',
      'validateEqual': 'Confirm password is different from password',

    },

    'email': {
      'required': 'Email is required.',
      'pattern': 'This is not a correct email address',

    },

    'first_name': {
      'required': 'first_name is required.',

    },

    'last_name': {
      'required': 'last_name is required.',
      'pattern': 'This is not a correct email address',

    },

  };

  beforeSubmit() {
    let model = this.model;
    let result = true;
    let form = this.registerForm;
    for (const field in this.formErrors) {
      if (form.get(field).status.toUpperCase() != "VALID") {
        result = false;
      }
    }
    return result;
  }


  onSubmit() {
    this.register();
  }

  register() {
    let model = this.registerForm.value;
    delete model['passwordConfirm'];
    this.authenticationService.register(model)
      .subscribe(
        data => {
          this.authenticationService.login(model)
            .subscribe(
              data => {
                this.router.navigate(['home']);
              },
              error => {
                if (error.status == 401) {
                  this.error = 'login fail';

                }

              });
        },
        error => {
          console.log(error);
        });
  }


}
