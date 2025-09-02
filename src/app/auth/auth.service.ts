import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);

  login(email: string, password: string) {
    return this.#http.post<User>('/api/login', { email, password });
  }
}
