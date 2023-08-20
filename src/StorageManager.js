import { promises as fs } from 'fs';

const path = `./storage.json`;


class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }

    addProduct(productId) {
        const productIndex = this.products.findIndex(p => p.product === productId);
        if (productIndex === -1) {

            this.products.push({ product: productId, quantity: 1 });
        } else {

            this.products[productIndex].quantity += 1;
        }
    }
}

export class CartManager {
    constructor() {
        this.path = path;
        this.nextId = 0;
        this.carts = []
    }

    async saveToFile() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error("Error saving carts:", error);
        }
    }

    async getAllCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            if (data.length > 0) {
                this.carts = JSON.parse(data);
                const maxIdCart = this.carts.reduce((prev, curr) => (prev.id > curr.id) ? prev : curr);
                this.nextId = maxIdCart.id + 1;
            }
            return this.carts;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("Cart file not found. A new one will be created.");
                return [];
            } else {
                console.error("Error reading cart file:", error);
            }
        }
    }

    async createCart() {
        await this.getAllCarts();
        const newCart = new Cart(this.nextId);
        this.carts.push(newCart);
        this.saveToFile();
        return newCart;
    }

    async getCartById(id) {
        await this.getAllCarts();
        const cart = this.carts.find(cart => Number(cart.id) === Number(id));
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    }

    async addProductToCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        cart.addProduct(productId);
        await this.saveToFile();
    }
}


