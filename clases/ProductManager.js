
import { promises as fs } from "fs";

const path = './data/productos.json';

export default class ProductManager {
    constructor() {
        this.path = path
        this.products = null;
        this.initializeIdIncrement();
    }


    async readProductsFile() {
        try {
            const info = await fs.readFile(this.path, "utf-8");
            return JSON.parse(info);
        } catch (error) {
            console.error('Error reading the products file:', error);
            return [];
        }
    }


    async initializeIdIncrement() {
        try {
            const products = await this.readProductsFile();
            if (products.length > 0) {
                const maxId = Math.max(...products.map(p => p.id));
                Productos.idIncrement = maxId;
            }
        } catch (error) {
            console.error('Error reading the products file:', error);
        }
    }


    async addProduct(productData) {
        if (typeof productData === 'string') {
            productData = JSON.parse(productData);
        }

        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock", "status"];
        for (let field of requiredFields) {
            if (!(field in productData)) {
                console.error("All fields are required");
                break;
            }
        }
        try {
            const products = await this.readProductsFile();
            const newProduct = new Productos(productData.title, productData.description, productData.price, productData.thumbnail, productData.code, productData.stock, productData.status);
            products.push(newProduct);
            await fs.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.error(error);
            console.error("Failed to add product");
        }

    }

    async getProducts() {
        if (!this.products) {
            this.products = await this.readProductsFile();
        }
        return this.products;
    }

    async getProductById(id) {
        const idN = Number(id)
        const products = await this.readProductsFile();
        const product = products.find(p => p.id === idN);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    async getProductByCode(code) {
        const products = await this.readProductsFile();
        const product = products.filter(p => p.code === code);
        console.log(product);
        return product.length > 0
            ? product
            : console.log('Cannot Create The Product')
    }

    async updateProducts(id, product) {
        const products = await this.readProductsFile();
        const productIndex = products.findIndex((p) => p.id === Number(id))

        if (productIndex === -1) {
            throw new Error("Product not found");
        } else {
            products[productIndex] = { ...products[productIndex], ...product };
            await fs.writeFile(this.path, JSON.stringify(products));
        }
    }

    async deleteProductById(id) {
        const products = await this.readProductsFile();
        const productExists = products.some((p) => p.id === Number(id))

        if (productExists) {
            await fs.writeFile(this.path, JSON.stringify(products.filter(el => el.id !== Number(id))));
        } else {
            throw new Error("Product not found");
        }
    }
    async deleteAllProducts() {
        const products = await this.readProductsFile()
        await fs.writeFile(this.path, '[]')
        return console.log('All Products Deleted')
    }
}

class Productos {
    static idIncrement = 0;

    constructor(title, description, price, thumbnail, code, stock, status) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status
        this.id = Productos.incrementarId();
    }

    static incrementarId() {
        Productos.idIncrement++;
        return Productos.idIncrement;
    }
}


