const express = require('express');
const router = express.Router();
const documents = require('./document');

router.use('/documents', documents);

module.exports = router;
