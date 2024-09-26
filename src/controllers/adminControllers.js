const { Op } = require('sequelize');
const { leerJSON } = require('../data')
const db = require("../database/models")

module.exports = {

    dashboard: (req, res) => {

        db.product.findAll({
            include: [
                "Image_products" , "product_species"
              ]
        })
            .then(productos => {
                /* return res.send(productos) */
                return res.render('./dashboard', { productos })
            })
            .catch(error => console.log(error))

    },
    search: (req, res) => {
        const { keywords } = req.query;
    
        db.product.findAll({
            where: {
                name: {
                    [Op.substring]: keywords
                }
            },
            include: [
                "Image_products" 
            ]
        })
        .then(productos => {
            /* return res.send(productos) */
            return res.render('dashboardFilter', {
                productos,
                keywords
            });
        })
        .catch(error => console.log(error));
    }
}