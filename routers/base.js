const express = require('express');
const router = express.Router();
const datetime = require('./datetime/datetime')

router.post('/dates', datetime.getDates);

module.exports = router;