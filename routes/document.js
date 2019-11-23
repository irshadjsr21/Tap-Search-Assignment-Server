const express = require('express');
const router = express.Router();

const document = require('../controllers/document');

router.post('/', document.add);

module.exports = router;
