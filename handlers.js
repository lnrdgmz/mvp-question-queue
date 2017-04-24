const db = require('./db.js');

const getHandler = (req, res) => {
  db.getData((data) => {
    console.log(data);
    res.send(data);
  });
};

const rawHandler = (res) => {
  db.getRawResponse(res);
};

const postHandler = (req, res) => {
  db.addQuestion(req.body.name, req.body.question, (data) => {
    res.send(data.values);
  });
};

const putHandler = (req, res) => {
  db.updateQuestion(req.body, res);
};


exports.getHandler = getHandler;
exports.postHandler = postHandler;
exports.rawHandler = rawHandler;
exports.putHander = putHandler;
