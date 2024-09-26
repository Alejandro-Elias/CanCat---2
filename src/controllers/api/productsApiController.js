const paginate = require("express-paginate")
const db = require('../../database/models');
const { existsSync, unlinkSync } = require('fs');

const getAllProducts = async (req,res) => {
    try {
        const products = await db.product.findAll({
            include : [
                {
                    association : 'product_species',
                    attributes : ['name']
                },
                {
                    association : 'product_brand',
                    attributes : ['name']
                },
                {
                    association : 'product_filing',
                    attributes : [ 'measure']

                },
                {
                    association: 'Image_products',
                    attributes: ['file']
                    
                },
                {
                    association: 'product_stock',
                    attributes: ['amount', 'flavorId']
                   
                },
                {
                    association: 'product_flavor',
                    attributes: ['name', "id"]
                }
            ],
            attributes : ['id', 'name', "value", "description","price", "discount" ]
        });

        const formattedProducts = products.map(product => {
            const images = product.Image_products.map(image => {
                return `${req.protocol}://${req.get('host')}/images/${image.file}`;
            });

            return {
                ...product.dataValues,
                image1: images[0],
                image2: images[1],
                detail : `${req.protocol}://${req.get('host')}/apis/products/${product.id}`
            }
        });

        return res.status(200).json({
            ok : true,
            meta :{
                total : products.length,
                count : products.length
            },
            formattedProducts
        })
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || 'Hubo un error. Sorry!'
        })
    }
}




 const getOneProduct = async (req,res) => {
     try {
         const Producto = await db.product.findByPk(req.params.id,{
            include : [
                {
                    association : 'Image_products',
                    attributes : ['file']
                },
                {
                    association : 'product_species',
                    attributes : ['name']
                },
                {
                    association : 'product_brand',
                    attributes : ['name']
                },
                {
                    association : 'product_filing',
                    attributes : [ 'measure']

                },
                {
                    association: 'product_stock',
                    attributes: ['amount', "flavorId"]
                   
                },
                {
                    association: 'product_flavor',
                    attributes: ['name', 'id']
                }
               
            ],
            attributes : ['id', 'name', "value", "description","price", "discount", "brandId", "specieId", "filingId" ]
        })

         const productCustom = {
             ...Producto.dataValues,
             image1 : `${req.protocol}://${req.get('host')}/images/${Producto.Image_products[0].file}`,
             image2 : `${req.protocol}://${req.get('host')}/images/${Producto.Image_products[1].file}`,
             Marca : Producto.product_brand.name,
             tamaño : `${Producto.value} ${Producto.product_filing.measure} `
         }

         return res.status(200).json({
             ok : true,
            Producto : productCustom
         })
        
     } catch (error) {
         return res.status(error.status || 500).json({
             ok : false,
             msg : error.message || 'Upss, hubo un error. Sorry!'
         })
     }
}
const createProduct = async (req, res) => {
    try {
        const { nombre, categoria, precio, stock, sabores, descuento, descripcion, brand, measure, value } = req.body;

        if (!nombre || !categoria || !precio || !stock || !sabores || !descuento || !descripcion || !brand || !measure || !value) {
            return res.status(400).json({
                ok: false,
                msg: 'Faltan datos para crear el producto'
            });
        }

        const image1 = req.files?.image1?.[0]?.filename ?? null;
        const image2 = req.files?.image2?.[0]?.filename ?? null;
        

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No se proporcionaron datos para crear el producto'
            });
        }

        let brandCreated = await db.brand.findOne({ where: { name: brand } });

        if (!brandCreated) {
            brandCreated = await db.brand.create({ name: brand });
        }

        const producto = await db.product.create({
            name: nombre.trim(),
            price: precio,
            discount: +descuento,
            description: descripcion.trim(),
            specieId: +categoria,
            value: value,
            brandId: brandCreated.id,
            filingId: measure,
        });

        await db.stock.create({
            amount: +stock,
            flavorId: +sabores,
            productId: producto.id
        });

       if (image1) {
    const imageToUpdate = await db.image_products.findOne({
        where: {
            productId: producto.id,
            primary: 1
        }
    });

    if (imageToUpdate) {
        existsSync('public/images/' + imageToUpdate.file) &&
            unlinkSync('public/images/' + imageToUpdate.file)

        await imageToUpdate.update({
            file: image1,
        });
    } else {
        await db.image_products.create({
            file: image1,
            productId: producto.id,
            primary: 1
        });
    }
} else {
    await db.image_products.create({
        file: null,
        productId: producto.id,
        primary: 1
    });
}

if (image2) {
    const imageToUpdate = await db.image_products.findOne({
        where: {
            productId: producto.id,
            primary: 2
        }
    });

    if (imageToUpdate) {
        existsSync('public/images/' + imageToUpdate.file) &&
            unlinkSync('public/images/' + imageToUpdate.file)

        await imageToUpdate.update({
            file: image2,
        });
    } else {
        await db.image_products.create({
            file: image2,
            productId: producto.id,
            primary: 2
        });
    }
} else {
    await db.image_products.create({
        file: null,
        productId: producto.id,
        primary: 2
    });
}


        return res.status(201).json({
            ok: true,
            msg: 'Producto creado con éxito',
            product: producto
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el producto'
        });
    }
}


const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, precio, stock, sabores, descuento, descripcion, brand, measure, value } = req.body;

        const image1 = req.files && req.files.image1 ? req.files.image1 : null;
        const image2 = req.files && req.files.image2 ? req.files.image2 : null;

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No se proporcionaron datos para actualizar el producto'
            });
        }

        const productToUpdate = await db.product.findByPk(id);

        if (!productToUpdate) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        let brandToUpdate = await db.brand.findOne({ where: { name: brand } });

        if (brandToUpdate) {
            await brandToUpdate.update({ name: brand });
        } else {

            brandToUpdate = await db.brand.create({ name: brand });
        }

        await productToUpdate.update({
            name: nombre.trim(),
            price: precio,
            discount: +descuento,
            description: descripcion.trim(),
            specieId: +categoria,
            value: value,
            brandId: brandToUpdate.id,
            filingId: measure,
        });

        const stockToUpdate = await db.stock.findOne({
            where: {
                productId: id
            }
        });

        if (stockToUpdate) {
            await stockToUpdate.update({
                amount: +stock,
                flavorId: +sabores,
            });
        }

        if (image1) {
            const imageToUpdate = await db.image_products.findOne({
                where: {
                    productId: id,
                    primary: 1
                }
            });

            if (imageToUpdate) {
                
                fs.unlinkSync(path.join(__dirname, '../../public/images/', imageToUpdate.file));

               
                await imageToUpdate.update({
                    file: image1[0].filename,
                });
            }
        }

        if (image2) {
            const imageToUpdate = await db.image_products.findOne({
                where: {
                    productId: id,
                    primary: 2
                }
            });

            if (imageToUpdate) {
                
                fs.unlinkSync(path.join(__dirname, '../../public/images/', imageToUpdate.file));

              
                await imageToUpdate.update({
                    file: image2[0].filename,
                });
            }
        }

        res.status(200).json({
            ok: true,
            msg: 'Producto actualizado con éxito',
            product: productToUpdate
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el producto'
        });
    }
}


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const productToDelete = await db.product.findByPk(id, {
            include: ["Image_products", "product_stock", "product_filing", "product_brand"]
        });

        if (!productToDelete) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        if (productToDelete.Image_products[0] && existsSync('public/images/' + productToDelete.Image_products[0].file)) {
            unlinkSync('public/images/' + productToDelete.Image_products[0].file)

            await db.image_products.destroy({
                where: {
                    productId: productToDelete.id,
                    primary: 1
                }
            });
        }

        if (productToDelete.Image_products[1] && existsSync('public/images/' + productToDelete.Image_products[1].file)) {
            unlinkSync('public/images/' + productToDelete.Image_products[1].file)

            await db.image_products.destroy({
                where: {
                    productId: productToDelete.id,
                    primary: 2
                }
            });
        }

        await db.image_products.destroy({
            where: {
                productId: productToDelete.id
            }
        });

        await db.stock.destroy({
            where: {
                productId: productToDelete.id
            }
        });

        await db.product.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            ok: true,
            msg: 'Producto eliminado con éxito'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el producto'
        });
    }
}

const getAllSpecies = async (req, res) => {
    try {
        const species = await db.specie.findAll({      
        });

        const formattedSpecies = species.map(item => {
            return {   
                ...item.dataValues,
                detail: `${req.protocol}://${req.get('host')}/apis/species`
            }
        });

        return res.status(200).json({
            ok: true,
            meta: {
                total: species.length,
                count: species.length
            },
            formattedSpecies
        });
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok: false,
            msg: error.message || 'Hubo un error. Sorry!'
        });
    }
}

const getAllFlavor = async (req, res) => {
    try {
        const flavor = await db.flavor.findAll({      
        });

        const formattedFlavor = flavor.map(item => {
            return {   
                ...item.dataValues,
                detail: `${req.protocol}://${req.get('host')}/apis/brand`
            }
        });

        return res.status(200).json({
            ok: true,
            meta: {
                total: flavor.length,
                count: flavor.length
            },
            formattedFlavor
        });
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok: false,
            msg: error.message || 'Hubo un error. Sorry!'
        });
    }
}

const getAllFilings = async (req, res) => {
    try {
        const filing = await db.filing.findAll({      
        });

        const formattedFiling = filing.map(item => {
            return {   
                ...item.dataValues,
                detail: `${req.protocol}://${req.get('host')}/apis/filing`
            }
        });

        return res.status(200).json({
            ok: true,
            meta: {
                total: filing.length,
                count: filing.length
            },
            formattedFiling
        });
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok: false,
            msg: error.message || 'Hubo un error. Sorry!'
        });
    }
}




module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllSpecies,
    getAllFlavor,
    getAllFilings    
}