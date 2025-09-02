import {
  getState,
  patchState,
  signalStoreFeature,
  SignalStoreFeature,
  withHooks,
} from '@ngrx/signals';
import { environment } from '../environments/environment';
import { effect } from '@angular/core';

export const withTreeShakableDevTools = environment.storeWithDevTools;

export function withLocalStorage(key: string): SignalStoreFeature {
  return signalStoreFeature(
    withHooks((store) => ({
      onInit: () => {
        // Only run in browser environment
        if (typeof localStorage !== 'undefined') {
          const stateJson = localStorage.getItem(key);
          if (stateJson) {
            const state = JSON.parse(stateJson);
            patchState(store, state);
          }

          effect(() => {
            const state = getState(store);
            const stateJson = JSON.stringify(state);
            localStorage.setItem(key, stateJson);
          });
        }
      },
    }))
  );
}
