const db = require("../../database/models")
const { Op } = require('sequelize');

module.exports = (req, res) =>  {
        
    const {id} = req.session.userLogin ? req.session.userLogin : 1

    const { keywords } = req.query;
    
        const productos = db.product.findAll({
            where: {
                name: {
                    [Op.substring]: keywords
                }
            },
            include: [
                "Image_products", "product_species"
            ]
        })

        const usuario = db.user.findByPk(id)

        Promise.all([productos, usuario])
        .then(([productos, usuario]) => {
            /* return res.send(productos) */
            return res.render('products/product-search', {
                productos,
                keywords,
                usuario            
            })
        })
        .catch(error => console.log(error));
    }

  