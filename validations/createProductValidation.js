const { body, check } = require('express-validator');

module.exports = [
  body('nombre')
    .not().isEmpty().withMessage('El nombre es requerido.')
    .isLength({ min: 4 }).withMessage("El nombre debe tener al menos 4 caracteres").bail()
    .matches(/^[a-z0-9 ]+$/i).withMessage('Solo se permiten caracteres alfanuméricos y espacios'),

  body('precio')
    .not().isEmpty().withMessage('El precio es requerido.')
    .isFloat({ gt: 0 })
    .withMessage('El precio debe ser mayor a 0.'),

  body('categoria')
    .not().isEmpty()
    .withMessage('Por favor, selecciona una categoría.'),

  body('stock')
    .not().isEmpty().withMessage('El stock es requerido.')
    .isInt({ gt: 0 })
    .withMessage('El stock debe ser un número mayor a 0.'),

  body('sabores')
    .not().isEmpty()
    .withMessage('Por favor, selecciona un sabor.'),

    body('descuento')
    .optional(),

  body('measure')
    .not().isEmpty()
    .withMessage('Por favor, selecciona una unidad de medida.'),
  
  body('value')
    .not().isEmpty().withMessage('El valor es requerido.')
    .isFloat({ gt: 0 })
    .withMessage('El valor debe ser mayor a 0.'),

  body('brand')
    .not().isEmpty().withMessage('La marca es requerida.')
    .isLength({ min: 2 })
    .withMessage('La marca debe tener al menos 2 caracteres.'),

  body('descripcion')
    .not().isEmpty().withMessage('La descripción es requerida.')
    .isLength({ min: 30 })
    .withMessage('La descripción debe tener al menos 30 caracteres.'),

    check('image1')
    .custom((value, {req}) => {
        if(req.files.image1 && req.files.image1[0] && !req.files.image1[0].mimetype.startsWith('image/')){
            throw new Error('El archivo debe ser una imagen.');
        }
        return true;
    }),

  check('image2')
    .custom((value, {req}) => {
        if(req.files.image2 && req.files.image2[0] && !req.files.image2[0].mimetype.startsWith('image/')){
            throw new Error('El archivo debe ser una imagen.');
        }
        return true;
    }),



]
