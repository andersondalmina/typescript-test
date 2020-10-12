import 'reflect-metadata';
import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import router from './config/router';
import { createConnection } from 'typeorm';
import { registerRepositories } from './config/container';

require('dotenv').config();

createConnection().then((connection: any) => {
  registerRepositories(connection);

  const app = express();
  const port = 8080;

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/', router());

  app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
  );
});
