const db = require("../../database/models");
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
        try {
            const [especies, mascotas, sabores, filing] = await Promise.all([
                db.specie.findAll(),
                db.pet.findOne(),
                db.flavor.findAll(),
                db.filing.findAll()
            ]);
            
            return res.render('products/product-create', {
                especies,
                mascotas,
                sabores,
                filing,
                errors,
                old: req.body
            });
        } catch (err) {
            console.error('Error fetching data from database:', err);
            return res.status(500).send('Internal Server Error');
        }
    } else {
        const { nombre, categoria, precio, stock, sabores, descuento, descripcion, brand, measure, value } = req.body;
        const image1 = req.files.image1?.[0]?.filename || null;
        const image2 = req.files.image2?.[0]?.filename || null;
        
        try {
            const createdBrand = await db.brand.create({ name: brand });
            const producto = await db.product.create({
                name: nombre.trim(),
                price: +precio,
                discount: +descuento,
                description: descripcion.trim(),
                specieId: +categoria,
                value,
                brandId: createdBrand.id,
                filingId: measure,
            });
            
            await db.stock.create({
                amount: +stock,
                flavorId: +sabores,
                productId: producto.id
            });

            const imagePromises = [
                db.image_products.create({
                    file: image1,
                    productId: producto.id,
                    primary: 1
                }),
                db.image_products.create({
                    file: image2,
                    productId: producto.id,
                    primary: 2
                })
            ];

            await Promise.all(imagePromises);
            
            return res.redirect('/admin/dashboard');
        } catch (error) {
            console.error('Error creating product:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
};
