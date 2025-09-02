import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStore } from '../store/auth.store';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, of, tap } from 'rxjs';

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  #fb = inject(FormBuilder);
  #authStore = inject(AuthStore);
  #router = inject(Router);
  #authService = inject(AuthService);
  #route = inject(ActivatedRoute);

  loginForm: FormGroup<LoginForm>;

  constructor() {
    this.loginForm = this.#fb.nonNullable.group<LoginForm>({
      email: this.#fb.nonNullable.control('user@test.com', [Validators.required, Validators.email]),
      password: this.#fb.nonNullable.control('test', [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (email && password) {
        this.#authService
          .login(email, password)
          .pipe(
            tap((user) => {
              this.#authStore.login(user);
              const returnUrl = this.#route.snapshot.queryParams['returnUrl'] || '/';
              this.#router.navigateByUrl(returnUrl);
            }),
            catchError((error) => {
              console.log('error', error);
              alert('Login Failed');
              return of(null);
            })
          )
          .subscribe();
      }
    }
  }
}
