import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth/store/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  #authStore = inject(AuthStore);
  #router = inject(Router);
  isLoggedIn = this.#authStore.isLoggedIn;
  userName = this.#authStore.user()?.name;
  logout() {
    this.#authStore.logout();
    this.#router.navigateByUrl('/login');
  }
}
