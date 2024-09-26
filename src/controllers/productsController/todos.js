
const db = require("../../database/models")

module.exports = (req, res) =>  {

    const {id} = req.session.userLogin ? req.session.userLogin : 0

    const productos = db.product.findAll({ 
        include: [
            "Image_products" 
        ]
    })

    const usuario = db.user.findByPk(id)

    Promise.all([productos, usuario])
    .then(([productos, usuario]) => {
        /* return res.send(productos) */
        return res.render('products/todos', {
            productos,
            usuario            
        })
    })
    .catch(error => console.log(error));
    }