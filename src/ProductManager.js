import { promises as fs } from "fs"
import { readFile } from "fs/promises";


export class ProductManager {
    constructor(path) {
        this.path = path
        this.products = this.readProductsFromJSON();
    }

    async readProductsFromJSON() {
        try {
            const info = await fs.readFile(this.path, "utf-8");
            return JSON.parse(info);
        } catch (error) {
            return []
        }
    }
    async addProduct(product) {

        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];
        if (!requiredFields.every((field) => field in product)) {
            return console.log("Todos los campos son obligatorios");
        }

        const products = JSON.parse(await fs.readFile(this.path, `utf-8`))
        const encontrado = products.find((p) => p.id === product.id)

        if (encontrado) {
            console.log(`Producto encontrado`);
        } else {
            products.push(product)
            await fs.writeFile(this.path, JSON.stringify(products))
        }
    }

    async getProducts() {

        const prods = JSON.parse(await fs.readFile(this.path, `utf-8`))
        console.log(prods);
    }

    async getProductsById(id) {

        const products = JSON.parse(await fs.readFile(this.path, `utf-8`))
        const encontrado = products.find((p) => p.id === id)

        if (encontrado == undefined) {
            return console.error(`Not Found`)
        } else {
            return console.log(encontrado)
        }

    }

    async updateProducts(id, product) {
        const products = JSON.parse(await fs.readFile(this.path, `utf-8`))
        const encontrado = products.findIndex((p) => p.id === id)

        if (encontrado === -1) {
            return console.error(`Not Found`)
        } else {
            products[encontrado].title = product.title
            products[encontrado].description = product.description
            products[encontrado].price = product.price
            products[encontrado].thumbnail = product.thumbnail
            products[encontrado].code = product.code
            products[encontrado].stock = product.stock
            await fs.writeFile(this.path, JSON.stringify(products))

        }

    }
    async deleteProducts(id) {
        const products = JSON.parse(await fs.readFile(this.path, `utf-8`))
        const encontrado = products.find((p) => p.id === id)

        if (encontrado) {
            await fs.writeFile(this.path, JSON.stringify(products.filter(el => el.id != id)))
        } else {
            console.error(`Not found`);
        }
    }

}
