const db = require('../../database/models');



module.exports = (req, res) => {

    /* return res.send(req.params) */


    const { id } = req.session.userLogin ? req.session.userLogin : 0

    const usuario = db.user.findByPk(id)

    const { categoria } = req.params

    const productos = db.product.findAll({
        include: [
            "Image_products",
            "product_species",
        ]
    })

    Promise.all(([productos, usuario]))

        .then(([productos, usuario]) => {

            const productosFiltrados = productos.filter(producto => producto.product_species.name == categoria);

            // return res.send(nameSpecie)

            // return res.send(productosFiltrados)
            return res.render('products/productFilter', {
                productos: productosFiltrados,
                usuario
            });
        })
        .catch(error => console.log(error));
}