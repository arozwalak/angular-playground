import { signalStore, withState } from '@ngrx/signals';
import * as fromApp from './app.slice';
import { withTreeShakableDevTools } from '../../helpers/store.features';

export const AppStore = signalStore(
  {
    providedIn: 'root',
  },
  withTreeShakableDevTools(fromApp.appFeatureKey),
  withState(fromApp.initialAppSlice)
);
