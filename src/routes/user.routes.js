import { Router } from "express";
import { userModel } from "../models/user.models.js";

const userRouter = Router()


userRouter.get(`/`, async (req, res) => {
    try {
        const user = await userModel.find()
        res.status(200).send({ respuesta: `OK`, mensaje: user })
    } catch (error) {
        res.status(400).send({ respuesta: `Error en consulta de users`, mensaje: error })
    }
})

userRouter.get(`/:id`, async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(id)
        if (user) {
            res.status(200).send({ respuesta: `OK`, mensaje: user })
        } else {
            res.status(404).send({ respuesta: `Error`, mensaje: `User not Found` })
        }
    } catch (error) {
        res.status(400).send({ respuesta: `Error en consulta de user`, mensaje: error })
    }
})


userRouter.post(`/`, async (req, res) => {
    const { nombre, apellido, edad, email, password } = req.body
    try {
        const respuesta = await userModel.create({ nombre, apellido, edad, email, password })
        res.status(200).send({ respuesta: `OK`, mensaje: respuesta })
    } catch (error) {
        res.status(400).send({ respuesta: `Error en crear de user`, mensaje: error })
    }
})


userRouter.put(`/:id`, async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, edad, email, password } = req.body

    try {
        const user = await userModel.findByIdAndUpdate(id, { nombre, apellido, edad, email, password })
        if (user) {
            res.status(200).send({ respuesta: `OK`, mensaje: user })
        } else {
            res.status(404).send({ respuesta: `Error en actualizar de user`, mensaje: `User not Found` })
        }
    } catch (error) {
        res.status(400).send({ respuesta: `Error en actualizar de user`, mensaje: error })
    }
})

userRouter.delete(`/:id`, async (req, res) => {
    const { id } = req.params

    try {
        const user = await userModel.findByIdAndDelete(id)
        if (user) {
            res.status(200).send({ respuesta: `OK`, mensaje: user })
        } else {
            res.status(404).send({ respuesta: `Error en elimar user`, mensaje: `User not Found` })
        }
    } catch (error) {
        res.status(400).send({ respuesta: `Error en elimar user`, mensaje: error })
    }
})


export default userRouter