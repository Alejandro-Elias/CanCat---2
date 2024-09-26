const db = require("../../database/models")
module.exports = (req, res) => {

    const { id } = req.session.userLogin
    const params = req.params;

    const product = db.product.findByPk(params.id, {
        include: [
            "Image_products", "product_stock",
            "product_filing", "product_brand"
            
        ]
    })

    const mascotas = db.pet.findOne({
        where: {
            userId: id
        },
        include: ["user"]
    })
    const brand = db.brand.findAll()

    const filing = db.filing.findAll()

    const especies = db.specie.findAll()

    const sabores = db.flavor.findAll()

    Promise.all([product, especies, mascotas, sabores, brand, filing])
        .then(([product, especies, mascotas, sabores, brand, filing]) => {
            
            // return res.send(filing)
            return res.render('products/product-edit', {
                ...product.dataValues,
                especies,
                mascotas,
                sabores,
                brand,
                filing
            })
        })
}