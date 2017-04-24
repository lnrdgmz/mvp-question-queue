const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const handlers = require('./handlers.js');
// const db = require('./db.js');

const google = require('googleapis');
const credentials = require('./config/credentials.json');

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets'],
  null
);

google.options({auth});


auth.authorize((err, tokens) => {
  // console.log(tokens);
});

/*
 * Routes
 *
 */
app.get('/raw', (req, res) => {
  handlers.rawHandler(res);
});

app.get('/questions', (req, res) => {
  handlers.getHandler(req, res);
});

app.post('/questions', (req, res) => {
  handlers.postHandler(req, res);
});

app.put('/questions', (req, res) => {
  handlers.putHander(req, res);
});

app.listen(3000);
