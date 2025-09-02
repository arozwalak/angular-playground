import { Movie } from '../models/movie';

export interface AppSlice {
  popularMovies: Movie[];
  isLoading: boolean;
  lastFetched: Date | null;
}

export const appFeatureKey = 'app';

export const initialAppSlice: AppSlice = {
  popularMovies: [],
  isLoading: false,
  lastFetched: null,
};
