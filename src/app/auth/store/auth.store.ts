import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import * as fromAuth from './auth.slice';
import { withLocalStorage, withTreeShakableDevTools } from '../../../helpers/store.features';
import { computed } from '@angular/core';

export const AuthStore = signalStore(
  {
    providedIn: 'root',
  },
  withTreeShakableDevTools(fromAuth.authFeatureKey),
  withState(fromAuth.initialAuthSlice),
  withMethods((store) => ({
    login(user: any) {
      patchState(store, { user });
    },
    logout() {
      patchState(store, { user: undefined });
    },
  })),
  withComputed((store) => ({
    isLoggedIn: computed(() => !!store.user()),
  })),
  withLocalStorage(fromAuth.authFeatureKey)
);
