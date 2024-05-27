const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
// it means getting out of curr dir and looking for views folder and inside of it index.html file

module.exports = router;
