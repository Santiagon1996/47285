import { Router } from 'express';
import { cartModel } from "../models/cart.models.js";
import { productModel } from "../models/productos.models.js";
const cartsRouter = Router();


cartsRouter.get('/', async (req, res) => {
    try {
        const carts = await cartModel.find()
        res.status(200).send(carts)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error retrieving carts' })
    }
});

cartsRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const cart = await cartModel.findById(id)
        if (cart)
            res.status(200).send({ respuesta: 'OK', mensaje: cart })
        else
            res.status(404).send({ respuesta: 'Error en consultar Carrito', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta carrito', mensaje: error })
    }
});

cartsRouter.post('/', async (req, res) => {
    try {
        const cart = await cartModel.create({})
        res.status(200).send({ respuesta: 'OK', mensaje: cart })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear Carrito', mensaje: error })
    }
});

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid) //Busco si existe en LA BDD

            if (prod) {
                const indice = cart.products.findIndex(item => item.id_prod == pid) //Busco si existe en el carrito
                if (indice != -1) {
                    cart.products[indice].quantity = quantity //Si existe en el carrito modifico la cantidad
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity }) //Si no existe, lo agrego al carrito
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart) //Actualizar el carrito
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
            } else {
                res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Produt Not Found' })
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Cart Not Found' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', mensaje: error })
    }
});
///
cartsRouter.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid) //Busco si existe en LA BDD, no en el carrito

            if (prod) {
                const indice = cart.products.findIndex(item => item.id_prod._id.toString() == pid) //Busco si existe en el carrito
                if (indice !== -1) {
                    cart.products[indice].quantity = quantity //Si existe en el carrito modifico la cantidad
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity }) //Si no existe, lo agrego al carrito
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid , cart ) //Actualizar el carrito
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
            } else {
                res.status(404).send({ respuesta: 'Error adding Product to the Cart', mensaje: 'Produt Not Found' })
            }
        } else {
            res.status(404).send({ respuesta: 'Error adding Product to the Cart', mensaje: 'Cart Not Found' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ respuesta: 'Error adding Product to the Cart', mensaje: error })
    }
})

cartsRouter.put('/:cid', async (req, res) => {
    const { prodsArr } = req.body
    const { cid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const finalArr = prodsArr.filter(elemento => cart.products.indexOf(elemento) === -1)
            cart.products = finalArr
            const newCart = [...cart.products]
            await cartModel.findOneAndUpdate({ _id: cid }, { products: newCart })
            res.status(200).send({ respuesta: 'OK', message: newCart })
        } else
            res.status(404).send({ respuesta: 'Error en consultar Carrito', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta carrito', mensaje: error })
    }
})

cartsRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await cartModel.findOneAndUpdate(cid)
        if (cart) {
            await cartModel.findOneAndUpdate({ _id: cid }, { products: [] })
            res.status(200).send({ respuesta: 'OK', mensaje: 'Cart Deleted' })
        } else
            res.status(404).send({ respuesta: 'Error en consultar Carrito', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta carrito', mensaje: error })
    }
})

export default cartsRouter;
