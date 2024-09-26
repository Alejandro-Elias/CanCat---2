const express = require('express');
const {detail, edit , create, store, update, search, filtrados, remove, todos} = require('../controllers/productsController');

const router = express.Router();
const upload = require('../middlewares/upload');
const createProductValidation = require('../../validations/createProductValidation');
const checkUserLogin = require('../middlewares/checkUserLogin');
const editProductValidation = require('../../validations/editProductValidation');


/* GET productos listing. */
router
  .get('/detalle/:id?', detail )
  .get('/filtrados/:categoria',filtrados)
  
  .get('/editar-articulo/:id', checkUserLogin, edit)
  .put('/update/:id', upload.fields([
  {
    name : 'image1'
  },
  {
    name : 'image2'
  }
  ]), editProductValidation,update)

  .get('/agregar-articulos', checkUserLogin, create)
  .get('/todos', todos)
  .get('/search', search)
  .post('/store', upload.fields([
  {
    name : 'image1'
  },
  {
    name : 'image2'
  }
  ]),createProductValidation, checkUserLogin,store)

  .delete("/eliminar/:id",checkUserLogin, remove)


module.exports = router;


              