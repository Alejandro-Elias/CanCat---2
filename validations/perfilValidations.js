const { check} = require("express-validator");

module.exports = [
    check("name")
        .notEmpty().withMessage('El nombre no puede estra vacio'),
    check("email")
        .notEmpty().withMessage("El Email no tiene que estar vacio").bail()
        .isEmail().withMessage('Debe ser un email valido'),
    check("mascota")
        .notEmpty().withMessage('Debes poner el nombre de tu mascota'),
    check("especie")
        .notEmpty().withMessage('Debes especificar la especie de tu mascota')
];