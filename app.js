const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(express.static('./client'));
app.use(morgan('tiny'));

const handlers = require('./handlers.js');
// const db = require('./db.js');

const google = require('googleapis');
const credentials = {
  "type": process.env.GOOGLECRED_TYPE,
  "project_id": process.env.GOOGLECRED_PROJECT_ID,
  "private_key_id": process.env.GOOGLECRED_PRIVATE_KEY_ID,
  "private_key": process.env.GOOGLECRED_PRIVATE_KEY,
  "client_email": process.env.GOOGLECRED_CLIENT_EMAIL,
  "client_id": process.env.GOOGLECRED_CLIENT_ID,
  "auth_uri": process.env.GOOGLECRED_AUTH_URI,
  "token_uri": process.env.GOOGLECRED_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.GOOGLECRED_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url":  process.env.GOOGLECRED_CLIENT_X509_CERT_URL
};

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



app.listen(process.env.PORT || 3000);
