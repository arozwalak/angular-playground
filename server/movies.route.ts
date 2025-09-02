import { Request, Response } from 'express';
import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

if (!TMDB_ACCESS_TOKEN) {
  console.error('TMDB_ACCESS_TOKEN is not defined in environment variables');
}

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export async function getMovies(req: Request, res: Response) {
  try {
    const { page = 1, query } = req.query;

    let response;
    if (query) {
      // Search movies
      response = await tmdbApi.get('/search/movie', {
        params: {
          query,
          page,
          include_adult: false,
        },
      });
    } else {
      // Get popular movies
      response = await tmdbApi.get('/movie/popular', {
        params: {
          page,
        },
      });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}
