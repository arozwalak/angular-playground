import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import * as fromAuth from './auth.slice';
import { withLocalStorage, withTreeShakableDevTools } from '../../../helpers/store.features';

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
  withLocalStorage(fromAuth.authFeatureKey)
);
