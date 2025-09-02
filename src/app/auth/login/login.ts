import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStore } from '../store/auth.store';
import { isPlatformServer } from '@angular/common';

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
  #platformId = inject(PLATFORM_ID);

  loginForm: FormGroup<LoginForm>;
  isServer = isPlatformServer(this.#platformId);

  constructor() {
    // Initialize form even on server to avoid hydration issues
    this.loginForm = this.#fb.nonNullable.group<LoginForm>({
      email: this.#fb.nonNullable.control('user@test.com', [Validators.required, Validators.email]),
      password: this.#fb.nonNullable.control('test', [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.valid && !this.isServer) {
      const { email, password } = this.loginForm.value;

      if (email && password) {
        this.#authStore.login(email, password);
      }
    }
  }
}
