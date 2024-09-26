const { check, body } = require("express-validator");
const { compareSync } = require('bcryptjs');
const { leerJSON } = require("../src/data");
const db = require("../src/database/models")

const usuariosRegistrados = leerJSON('users');

module.exports = [
    check("email")
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('No es un email válido'),
    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria").bail()
        .custom((value, { req }) => {
            
            return db.user.findOne({
                where : {
                    email : req.body.email
                }
            })
            .then(user => {
                if(!user || !compareSync(value, user.password)) {
                    return Promise.reject()
                }  
            })
            .catch(error => {
                console.log(error);
                return Promise.reject("Credenciales inválidas")
            })
        })
];