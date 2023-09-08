import { promises as fs } from 'fs';

const path = './data/carts.json'

export default class CartManager {
    constructor() {
        this.path = path
    }

    // Método para leer el archivo de carritos
    async readCartsFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading the carts file:', error);
            return [];
        }
    }

    // Método para escribir en el archivo de carritos
    async writeCartsFile(carts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(carts));
        } catch (error) {
            console.error('Error writing the carts file:', error);
        }
    }

    async getCart(id) {
        const carts = await this.readCartsFile();
        return carts.find(cart => cart.id === Number(id));
    }

    async createCart() {
        const cart = await this.readCartsFile();
        const id = await this.idCart();
        cart.push({ id, products: [] });
        await this.writeCartsFile(cart);
    }

    async addProductToCart(cid, pid) {
        const carts = await this.readCartsFile();

        if (!carts.length) return null;

        const index = carts.findIndex(cart => cart.id === Number(cid));
        if (index === -1) return console.log(`Cart ID Not Found`);


        const pids = carts[index].products.map(prod => Number(prod.id));

        if (!pids.includes(Number(pid))) {
            carts[index].products.push({ id: pid, quantity: 1 });
        } else {
            const newCountProd = carts[index].products.map(prod => ({ id: prod.id, quantity: Number(prod.quantity) + 1 }));
            carts[index] = { ...carts[index], products: [...newCountProd] };
        }

        await this.writeCartsFile(carts);
    }



    async idCart() {
        const carts = await this.readCartsFile();
        if (carts.length < 1) return 1;
        const ids = carts.map(cart => cart.id);
        const id = Math.max(...ids) + 1;
        return id;
    }
}



