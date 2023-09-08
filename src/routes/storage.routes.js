import { Router } from 'express';
import CartManager from "../../clases/StorageManager.js"
const cartsRouter = Router();

const cartManager = new CartManager();

cartsRouter.get('/', async (req, res) => {
    try {
        const carts = await cartManager.readCartsFile();
        res.status(200).send(carts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

cartsRouter.get('/:id', async (req, res) => {
    try {
        const cart = await cartManager.getCart(req.params.id);
        if (!cart) {
            res.status(404).send({ error: 'Cart not found' });
        } else {
            res.status(200).send(cart);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

cartsRouter.post('/', async (req, res) => {
    try {
        await cartManager.createCart();
        res.status(201).send("Cart created");
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        await cartManager.addProductToCart(req.params.cid, req.params.pid);
        res.status(201).send("Product added to cart");
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default cartsRouter;
