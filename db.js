const google = require('googleapis');

const sheets = google.sheets('v4');
const spreadsheetId = '1ae_TJsdnSt2qaSwzs5A5ZEETN491YzbUNZAycumC6S0';

const getData = (callback) => {
  sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'questions!all'
  }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      callback(res.values.map((val, idx) => {
        return {
          range: `questions!${idx + 1}:${idx + 1}`,
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

const updateQuestion = (question, res) => {
  sheets.spreadsheets.values.update({
    spreadsheetId,
    range: question.range,
    valueInputOption: 'USER_ENTERED',
    includeValuesInResponse: true,
    resource: {
      values: [ [
        question.votes,
        question.username,
        question.body,
        question.link,
        question.createdAt,
        question.answered
      ] ]
    }
  }, (err, googleRes) => {
    if (err) {
      console.error(err);
      res.send('There was an error in updateQuestion');
    } else {
      res.send(googleRes);
    };
  });
};

const getRawResponse = (res) => {
  sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'questions!all'
  }, (err, googleRes) => {
    if (err) {
      console.log(err);
    } else {
      res.send(googleRes.updates.updatedData);
    }
  });
}

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

module.exports.addQuestion = addQuestion;
module.exports.getData = getData;
module.exports.getRawResponse = getRawResponse;
module.exports.updateQuestion = updateQuestion;
