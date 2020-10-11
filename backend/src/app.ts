import express from "express";
import bodyParser from "body-parser";
import router from "./config/router";
import Database from './config/database';

require('dotenv').config()

Database.connect();

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router());

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);


