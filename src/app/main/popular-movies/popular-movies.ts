import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

@Component({
  selector: 'app-popular-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-movies.html',
  styleUrl: './popular-movies.scss',
})
export class PopularMovies {
  #http = inject(HttpClient);
  movies$: Observable<MoviesResponse> = this.#http.get<MoviesResponse>('/api/movies');
}