const express = require('express');
const router = express.Router();
const datetime = require('./datetime/datetime')

router.post('/dates', datetime.getDates);
router.post('/first-date-last-date', datetime.getFirstDateLastDate);
router.post('/first-date-last-date-year', datetime.getFirstDateLastDateYear);

module.exports = router;