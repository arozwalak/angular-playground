import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import * as fromAuth from './auth.slice';
import { withLocalStorage, withTreeShakableDevTools } from '../../../helpers/store.features';
import { computed, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

export const AuthStore = signalStore(
  {
    providedIn: 'root',
  },
  withTreeShakableDevTools(fromAuth.authFeatureKey),
  withState(fromAuth.initialAuthSlice),
  withMethods((store) => {
    const authService = inject(AuthService);
    const route = inject(ActivatedRoute);
    const router = inject(Router);

    return {
      async login(email: string, password: string): Promise<void> {
        patchState(store, { isLoading: true });

        const user = await firstValueFrom(authService.login(email, password));

        if (user) {
          patchState(store, { user, isLoading: false });

          if (user) {
            const returnUrl = route.snapshot.queryParams['returnUrl'] || '/';
            router.navigateByUrl(returnUrl);
          } else {
            alert('Login Failed');
          }
        } else {
          patchState(store, { isLoading: false });
        }
      },
      logout() {
        patchState(store, { user: undefined });
      },
    };
  }),
  withComputed((store) => ({
    isLoggedIn: computed(() => !!store.user()),
  })),
  withLocalStorage(fromAuth.authFeatureKey)
);
