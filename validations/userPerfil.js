const { check, body } = require("express-validator");

module.exports = [
    check("name")
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage("Mínimo dos caracteres").bail()
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo caracteres alfabéticos'),
    check("email")
        .notEmpty().withMessage('Email obligatorio').bail()
        .isEmail().withMessage('El email tiene un formato inválido').bail(),
    check("mascota")
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage("Mínimo dos caracteres").bail()
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('Solo caracteres alfabéticos')
]