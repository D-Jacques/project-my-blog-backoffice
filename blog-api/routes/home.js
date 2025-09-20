const express = require('express');
const homeCtrl = require('../controller/home')
const router = express.Router();

router.get("/", homeCtrl.index);

module.exports = router;