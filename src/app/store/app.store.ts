import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import * as fromApp from './app.slice';
import { withLocalStorage, withTreeShakableDevTools } from '../../helpers/store.features';
import { inject } from '@angular/core';
import { MoviesService } from '../features/movies/movies.service';
import { firstValueFrom } from 'rxjs';

export const AppStore = signalStore(
  {
    providedIn: 'root',
  },
  withTreeShakableDevTools(fromApp.appFeatureKey),
  withState(fromApp.initialAppSlice),
  withMethods((store, moviesService = inject(MoviesService)) => ({
    async getPopularMovies({ forceRefresh = false }): Promise<void> {
      patchState(store, { isLoading: true });

      const shouldFetch =
        forceRefresh || !store.popularMovies().length || this.isStale(store.lastFetched());

      if (!shouldFetch) {
        patchState(store, { isLoading: false });
        return;
      }

      const response = await firstValueFrom(moviesService.getPopularMovies());
      const movies = response?.results;

      if (movies) {
        patchState(store, { popularMovies: movies, lastFetched: new Date(), isLoading: false });
      } else {
        patchState(store, { popularMovies: [], isLoading: false });
      }
    },
    isStale(lastFetched: Date | null): boolean {
      if (!lastFetched) return true;
      const CACHE_DURATION = 1 * 60 * 1000; // 1 minute
      return Date.now() - new Date(lastFetched).getTime() > CACHE_DURATION;
    },
  })),
  withMethods((store) => ({
    refreshPopularMovies() {
      store.getPopularMovies({ forceRefresh: true });
    },
  })),
  withLocalStorage(fromApp.appFeatureKey)
);
