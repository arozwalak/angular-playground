import { Request, Response } from 'express';
import axios from 'axios';
import * as path from 'path';

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env') });

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

export async function getPopularMovies(req: Request, res: Response) {
  try {
    const { page = 1 } = req.query;

    // Get popular movies
    const response = await tmdbApi.get('/movie/popular', {
      params: {
        page,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}

export async function searchMovie(req: Request, res: Response) {
  try {
    const { page = 1, query } = req.query;

    if (query) {
      // Search movies
      const response = await tmdbApi.get('/search/movie', {
        params: {
          query,
          page,
          include_adult: false,
        },
      });
      res.status(200).json(response.data);
    } else {
      // Get popular movies
      res.status(400).json({ error: 'Query parameter is required for searching movies' });
    }
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}
