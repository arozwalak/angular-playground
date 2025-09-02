import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStore } from '../../store/app.store';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-popular-movies',
  standalone: true,
  imports: [CommonModule, MovieCard],
  templateUrl: './popular-movies.html',
  styleUrl: './popular-movies.scss',
})
export class PopularMovies implements OnInit {
  #appStore = inject(AppStore);
  popularMovies = this.#appStore.popularMovies;
  isLoading = this.#appStore.isLoading;

  ngOnInit() {
    this.#appStore.getPopularMovies({});
  }
}
