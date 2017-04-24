const db = require('./db.js');

const getHandler = (req, res) => {
  db.getData((data) => {
    console.log(data);
    res.send(data);
  });
};

const postHandler = (req, res) => {
  db.addQuestion(req.body.name, req.body.question, (data) => {
    res.send(data.values);
  });
}

exports.getHandler = getHandler;
exports.postHandler = postHandler;
