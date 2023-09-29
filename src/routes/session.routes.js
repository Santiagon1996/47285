import { Router } from "express";
import  {userModel}  from "../models/user.models.js";

const sessionRouter = Router()


sessionRouter.post(`/login`, async (req, res) => {
    const { email, password } = req.body
    try {

        if (req.session.login) {
            res.status(200).send({ respuesta: `Login existente` })

        }

        const user = await userModel.findOne({ email: email })

        if (user) {
            if (user.password == password) {
                req.session.login = true
                res.status(200).send({ respuesta: `Login OK`, messege: user })
                res.redirect(`Route Products`,200,{})
            } else {
                res.status(401).send({ respuesta: `Incorrect Password` })
            }
        } else {
            res.status(404).send({ respuesta: `User Not Found`, messege: user })
        }

    } catch (error) {
        res.status(400).send({ error: `Error en login ${error}` })
    }
})



sessionRouter.get(`/logout`, async(req,res)=>{
    if (user.session.login){
        user.session.destroy()
    }
    //res.status(200).send({respuesta: `User Deleted`})
    res.redirect(`Route Login`,200,{respuesta:  `User Deleted`})


})


export default sessionRouter