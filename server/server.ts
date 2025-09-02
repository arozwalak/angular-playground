import * as express from 'express';
import { Application } from 'express';
import { loginUser } from './auth.route';
import { getPopularMovies, searchMovie } from './movies.route';

const bodyParser = require('body-parser');

const app: Application = express();

const cors = require('cors');

app.use(cors({ origin: true }));

app.use(bodyParser.json());

app.route('/api/login').post(loginUser);
app.route('/api/popular-movies').get(getPopularMovies);
app.route('/api/movies/search').get(searchMovie);

const httpServer: any = app.listen(9000, () => {
  console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});
