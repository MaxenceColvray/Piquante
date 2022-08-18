const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

router.post('/', auth, sauceCtrl.sauceAdd);


module.exports = router;