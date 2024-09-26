const db = require("../../database/models")

module.exports = (req, res) => {
    const especies = db.specie.findAll()

    const mascotas = db.pet.findOne()

    const sabores = db.flavor.findAll()

    const filing = db.filing.findAll()

    Promise.all([especies, mascotas, sabores, filing])
        .then(([especies, mascotas, sabores, filing]) => {
            return res.render('products/product-create', {
                especies,
                mascotas,
                sabores,
                filing
            })
        })

}
