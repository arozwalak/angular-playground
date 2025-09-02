import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthStore } from './store/auth.store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  // On server, always allow (no localStorage)
  if (typeof window === 'undefined') {
    return true;
  }

  // Check if user is logged in (localStorage should be loaded by now)
  const user = authStore.user();
  if (!user) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  return true;
};
