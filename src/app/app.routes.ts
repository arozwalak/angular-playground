import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./main/main').then((m) => m.Main),
    children: [
      {
        path: 'popular-movies',
        loadComponent: () => import('./main/popular-movies/popular-movies').then((m) => m.PopularMovies),
      },
      {
        path: '',
        redirectTo: 'popular-movies',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then((m) => m.Login),
  },
];
