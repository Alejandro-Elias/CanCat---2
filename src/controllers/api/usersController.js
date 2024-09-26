const db = require("../../database/models")
const createError = require("http-errors")
const paginate = require('express-paginate')
const { existsSync, unlinkSync } = require('fs');

const bcryptjs = require('bcryptjs')

const listUser = async (req, res) => {
    try {
        const { count, rows } = await db.user.findAndCountAll({
            include: [{
                association: "pet",
                attributes: ["name"]
            }],
            attributes: ["id", "name", "email", "image", "roleId"],
            limit: req.query.limit,
            offset: req.skip
        })

        const pegeCount = Math.ceil(count / req.query.limit)
        const currentPage = req.query.page
        const pages = paginate.getArrayPages(req)(pegeCount, pegeCount, req.query.page)

        const usuarios = rows.map(usuario => {
            return {
                ...usuario.dataValues,
                pet: usuario.pet[0].name,
                detail: `${req.protocol}://${req.get("host")}/api/users`
            }

        })

        return res.status(200).json({
            ok: true,
            meta: {
                total: count,
                count: usuarios.length,
                pages,
                currentPage
            },
            data: usuarios
        })

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
}

const oneUser = async (req, res) => {
    try {

        const usuario = await db.user.findByPk(req.params.id, {
            include: [{
                association: "pet",
                attributes: ["name"]
            }],
            attributes: ["id", "name", "email", "image", "roleId"]
        })

        const customUser = {
            ...usuario.dataValues,
            image: `${req.protocol}://${req.get('host')}/images/${usuario.image}`,
            pet: usuario.pet[0].name
        }

        return res.status(200).json({
            ok: true,
            data: customUser,
            detail: `${req.protocol}://${req.get("host")}/api/users/${usuario.id}`
        })


    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
}

const crearUsuario = async (req, res) => {

    try {
        const { name, email, password, mascota, especie } = req.body;

        if ([name, email, password, mascota, especie].includes(" " || undefined)) throw createError(400, "Todos los campos son obligatorios")

        const usuario = await db.user.create({
            name,
            email,
            password: bcryptjs.hashSync(password.trim(), 10),
            roleId: 2,
            image: ""
        })
        const pet = await db.pet.create({
            name: mascota,
            specieId: especie,
            userId: usuario.id
        })

        const user = {
            ...usuario.dataValues,
            password: "***",
            ...pet.dataValues
        }

        return res.status(200).json({
            ok: true,
            data: user,
            detail: `${req.protocol}://${req.get("host")}/api/users`
        })
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
}

const editarUsuario = async (req, res) => {

    try {
        const { name, email, mascota, especie } = req.body;
        const { id } = req.params

        if (isNaN(id)) throw createError(404, "no se el usuario")
        if ([name, email, mascota, especie].includes("" || undefined)) throw createError(400, "Todos los campos son obligatorios")

        const usuario = await db.user.findByPk(id)

        const imagenDelete = req.file ? req.file.fieldname : null;

        (imagenDelete && existsSync('public/images/' + usuario.image)) &&
            unlinkSync('public/images/' + usuario.image)

        if (!usuario) throw createError(404, "no se encuentra el usuario")

        usuario.name = name?.trim() || usuario.name
        usuario.email = email?.trim() || usuario.email
        usuario.image = req.file ? req.file.filename : usuario.image

        await usuario.save()

        const mascotas = await db.pet.findOne({
            where: {
                userId: id
            }
        })

        mascotas.name = mascota?.trim() || mascotas.name
        mascotas.specieId = especie || mascotas.specieId
        mascotas.userId = usuario.id || mascotas.userId

        await mascotas.save()

        const user = {
            ...usuario.dataValues,
            ...mascotas.dataValues
        }

        return res.status(200).json({
            ok: true,
            data: user,
            detail: `${req.protocol}://${req.get("host")}/api/users/${usuario.id}`
        })

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }



}
const cambiarjerarquia = async (req, res) => {

    try {
        const { roleId } = req.body;
        const { id } = req.params

        if (isNaN(id)) throw createError(404, "no se el usuario")
        if ([roleId].includes("" || undefined)) throw createError(400, "El campo es obligatorio")

        const usuario = await db.user.findByPk(id)        

        if (!usuario) throw createError(404, "no se encuentra el usuario")

        usuario.roleId = roleId || usuario.roleId

        await usuario.save()

        const user = {
            ...usuario.dataValues,
        }

        return res.status(200).json({
            ok: true,
            data: user,
            detail: `${req.protocol}://${req.get("host")}/api/users/jerarquia${usuario.id}`
        })

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
}

const borrarUsuario = async (req, res) => {
    try {

        const { id } = req.params

        const mascotas = await db.pet.destroy({
            where: {
                userId: id
            }
        })

        const usuario = await db.user.destroy({
            where: {
                id
            }
        })

        const user = {
            ...usuario.dataValues
        }

        return res.status(200).json({
            ok: true,
            data: user,
            detail: `${req.protocol}://${req.get("host")}/api/users/jerarquia/${usuario.id}`
        })

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
}

module.exports = {
    listUser,
    oneUser,
    crearUsuario,
    editarUsuario,
    borrarUsuario,
    cambiarjerarquia
}