const express = require('express');
const {index, cart, inscribite} = require('../controllers/indexController');
const router = express.Router();

/* GET home page. */
router
  .get('/', index)
  .get('/carrito', cart)
  .post('/', inscribite)
  
module.exports = router;