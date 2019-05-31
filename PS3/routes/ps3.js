const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('ps3', {data:JSON.stringify({string:'Hey now'})});
});

router.post('/', function (req, res, next) {
  let input = req.body.input;
  res.render('ps3', {data:JSON.stringify({string:input,length:input.length})});
});

module.exports = router;
