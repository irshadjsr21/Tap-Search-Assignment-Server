const express = require('express');
const router = express.Router();

const document = require('../controllers/document');

router.post('/', document.add);
router.get('/', document.search);
router.post('/clear', document.clear);

module.exports = router;
