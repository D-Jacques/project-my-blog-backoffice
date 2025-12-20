const express = require('express');
const multer = require('multer');
const router = express.Router();
const articleCtrl = require('../controller/article');
const multerUploader = multer();


router.post('/create', multerUploader.none(), articleCtrl.create);
router.get('/', articleCtrl.getAllArticles);
router.get('/:id', articleCtrl.getArticleById);
router.patch('/edit/:id', multerUploader.none(), articleCtrl.edit); 
router.delete('/delete/:id', articleCtrl.delete);

module.exports = router;
