const { validationResult, param } = require('express-validator');

const db = require("../../database/models")
const { existsSync, unlinkSync } = require('fs');

module.exports = (req, res) => {
  const errors = validationResult(req).mapped();
  console.log(errors);
  const { id } = req.session.userLogin
  const params = req.params;

  const { nombre, categoria, precio, stock, sabores, descuento, descripcion, brand, measure, value } = req.body;
  console.log(req.body);

  if (Object.keys(errors).length > 0) {

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


        return res.render('products/product-edit', {
          errors, old: req.body,
          ...product.dataValues,
          especies,
          mascotas,
          sabores,
          brand,
          filing
        })
      }); return;
  }


  db.product.findByPk(params.id, {
    include: [
      "Image_products", "product_stock",
      "product_filing", "product_brand"
    ]
  })
    .then(producto => {

      db.brand.update({
        name: brand
      }, {
        where: { id: producto.product_brand.id }

      }).then(() => {

        db.filing.update({

          measure: measure
        }, {
          where: { id: producto.product_filing.id }

        }).then(() => {

          db.product.update({
            name: nombre.trim(),
            price: precio,
            discount: +descuento,
            description: descripcion.trim(),
            value: value,
            specieId: +categoria,
            brandId: producto.product_brand.id,
            filingId: producto.product_filing.id,

          },
            {
              where: {
                id: producto.id
              }
            })
            .then(() => {
              db.stock.update({
                amount: +stock,
                flavorId: +sabores,
              }, {
                where: {
                  productId: producto.id
                }
              })

            })
            .then(() => {

              if (req.files.image1) {

                producto.Image_products[0] && existsSync('public/images/' + producto.Image_products[0].file) &&
                  unlinkSync('public/images/' + producto.Image_products[0].file)

                db.image_products.update({
                  file: req.files.image1[0].filename
                }, {
                  where: {
                    productId: producto.id,
                    primary: 1
                  }
                })
              } else {
                return Promise.resolve()
              }
            })
            .then(() => {

              if (req.files.image2) {

                producto.Image_products[1] && existsSync('public/images/' + producto.Image_products[1].file) &&
                  unlinkSync('public/images/' + producto.Image_products[1].file)

                db.image_products.update({
                  file: req.files.image2[0].filename
                }, {
                  where: {
                    productId: producto.id,
                    primary: 2
                  }
                })
              } else {
                return Promise.resolve()
              }
            })
            .then(() => {
              return res.redirect('/admin/dashboard')
            })
        })
      })
    })
} 