import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MoviesResponse } from '../../models/movie';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  #http = inject(HttpClient);

  getPopularMovies() {
    console.log('fetching movies');
    return this.#http.get<MoviesResponse>('/api/movies');
  }
}
