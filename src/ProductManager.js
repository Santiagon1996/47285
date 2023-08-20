import { promises as fs } from "fs"

const path = `../productos.json`;

export class ProductManager {
    constructor(path) {
        this.path = path
        this.products = this.getProducts();
    }
    async addProduct(product) {
        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock","status"];
        if (!requiredFields.every(field => field in product)) {
            throw new Error("All fields are required");
        }

        const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const productExists = products.some(p => p.id === product.id);

        if (productExists) {
            throw new Error("Product already exists");
        } else {
            products.push(product);
            await fs.writeFile(this.path, JSON.stringify(products));
        }
    }

    async getProducts() {
        try {
            const info = await fs.readFile(this.path, "utf-8");
            return JSON.parse(info);
        } catch (error) {
            return []
        }
    }

    async getProductById(id) {
        const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const product = products.find(p => p.id === id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }
    async getProductByCode(code) {
        const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const product = products.find(p => p.code === code);
    
        if (!product) {
          throw new Error("Product not found");
        }
    
        return product;
      }

      async updateProducts(id, product) {
        const products = JSON.parse(await fs.readFile(this.path, `utf-8`))
        const productIndex = products.findIndex((p) => p.id === id)

        if (productIndex === -1) {
            throw new Error("Product not found");
        } else {
            products[productIndex] = { ...products[productIndex], ...product };
            await fs.writeFile(this.path, JSON.stringify(products))
        }
    }
    async deleteProducts(id) {
        const products = JSON.parse(await fs.readFile(this.path, `utf-8`))
        const productExists = products.some((p) => p.id === id)

        if (productExists) {
            await fs.writeFile(this.path, JSON.stringify(products.filter(el => el.id != id)))
        } else {
            throw new Error("Product not found");
        }
    }
}

