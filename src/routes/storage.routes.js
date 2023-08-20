import { Router } from 'express';
import { CartManager } from "../StorageManager";

const cartsRouter = Router();

const cartManager = new CartManager();

cartsRouter.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getAllCarts();
        res.status(200).send(carts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

cartsRouter.get('/:id', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.id);
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

cartsRouter.post('/', async (req, res) => {
    try {
        await cartManager.createCart();
        res.status(201).send("Cart added");
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        await cartManager.addProductToCart(req.params.cid, req.params.pid);
        res.status(201).send("Product added to cart");
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

export default cartsRouter;