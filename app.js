const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

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

const sheets = google.sheets('v4');

auth.authorize((err, tokens) => {
  // console.log(tokens);
});

const spreadsheetId = '1ae_TJsdnSt2qaSwzs5A5ZEETN491YzbUNZAycumC6S0';

const getData = (callback) => {
  sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'questions!all'
  }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      callback(res.values.map((val) => {
        return {
          votes: val[0],
          username: val[1],
          body: val[2],
          link: val[3],
          createdAt: val[4],
          answered: val[5]
        };
      }));
    }
  });
};

const addQuestion = (username, questionText, callback) => {
  const value = [0, username, questionText, '', Date.now(), false];
  sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'questions!all',
    valueInputOption: 'USER_ENTERED',
    includeValuesInResponse: true,
    resource: {
      values: [value]
    }
  }, (err, res) => {
    if (err) {
      console.error(err);
    } else {
    console.log('updates: ');
    console.log(res.updates);
    console.log('updatedData');
    console.log(res.updates.updatedData);
    callback(res.updates.updatedData);
    }
  });
};

// const writeToSpreadSheet = (username, questionText, callback = consoleLogCb) => {
//   sheets.spreadsheets.values.append({
//     spreadsheetId,
//     range: 'questions!all',
//     valueInputOption: 'USER_ENTERED',
//     includeValuesInResponse: true,
//     resource: {
//       values: [[0, username, questionText, '', Date.now(), 'false']]
//     }
//   }, callback);
// };

const consoleLogCb = (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Write successful!');
    console.log(res);
  }
};

const getHandler = (req, res) => {
  getData((data) => {
    console.log(data);
    res.send(data);
  });
};

const postHandler = (req, res) => {
  addQuestion(req.body.name, req.body.question, (data) => {
    res.send(data.values);
  });
}

app.get('/questions', (req, res) => {
  getHandler(req, res);
});

app.post('/questions', (req, res) => {
  postHandler(req, res);
});

app.listen(3000);
