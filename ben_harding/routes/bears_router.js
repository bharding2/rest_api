const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Bear = require(__dirname + '/../models/bear');
const handleErr = require(__dirname + '/../lib/handle_err');

var bearsRouter = module.exports = Router();

bearsRouter.post('/bears', bodyParser, (req, res) => {
  console.log('inside bear post');
  var newBear = new Bear(req.body);
  newBear.save((err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});
