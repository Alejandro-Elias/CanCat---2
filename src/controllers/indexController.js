const { leerJSON, escribirJSON } = require("../data");
const db = require('../database/models');

const inscribiteJSON = leerJSON('inscribite');


module.exports = {

    index: (req, res) => {

        const { id } = req.session.userLogin ? req.session.userLogin : 0

        const usuario = db.user.findByPk(id)

        const products = db.product.findAll({
            include: [
                "Image_products",
                "product_species"
            ]
        })

        

        Promise.all( [usuario, products] )


            .then(( [usuario, products] ) => {
                //  return res.send(stocks)  
                return res.render('index', {
                    products,
                    usuario
                })
            })
            .catch(error => console.log(error))
    },
    cart: (req, res) => {

        const { id } = req.session.userLogin ? req.session.userLogin : 0

        const usuario = db.user.findByPk(id)

        const productos = db.product.findAll({
            include: [
                "Image_products",
                "product_species",
                "product_flavor"
            ]
        })

        Promise.all( [usuario, productos] )

            .then(( [usuario, productos] ) => {
                //    return res.send(products)
                return res.render('carrito', {

                    productos,
                    usuario
                })
            })
            .catch(error => console.log(error))

    },
    inscribite: (req, res) => {
        const molde = require('../data/moldeInscribite');
        const { email } = req.body;
        const nuevoMolde = new molde(email);
        inscribiteJSON.push(nuevoMolde);
        escribirJSON(inscribiteJSON, 'inscribite');

        return res.redirect('/')
    }
}