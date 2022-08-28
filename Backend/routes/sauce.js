const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, sauceCtrl.sauceAdd);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

router.post('/:id/like', auth, sauceCtrl.Liked);

router.get('/', auth, sauceCtrl.saucesDisplay);
router.get('/:id', auth, sauceCtrl.sauceDisplay);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;