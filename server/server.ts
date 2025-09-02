import * as express from 'express';
import { Application } from 'express';
import { loginUser } from './auth.route';

const bodyParser = require('body-parser');

const app: Application = express();

const cors = require('cors');

app.use(cors({ origin: true }));

app.use(bodyParser.json());

app.route('/api/login').post(loginUser);

const httpServer: any = app.listen(9000, () => {
  console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});
