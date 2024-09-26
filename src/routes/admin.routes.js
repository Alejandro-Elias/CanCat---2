const express = require('express');
const {dashboard, search} = require('../controllers/adminControllers');
const checkAdmin = require('../middlewares/checkAdmin');
const router = express.Router();

/* admin */
router
  .get('/dashboard', checkAdmin, dashboard)
  .get('/search',checkAdmin, search)

module.exports = router;