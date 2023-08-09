import { promises as fs } from "fs"

const path = `./productos.json`

class ProductManager {
    constructor() {
        this.products = []

    }
    async addProduct(product) {
        if (product.title == undefined || product.description == undefined || product.price == undefined || product.thumbnail == undefined || product.code == undefined || product.stock == undefined) return console.log(`todos los campos son obligatorios`);


        const products = JSON.parse(await fs.readFile(path, `utf-8`))
        const encontrado = products.find((p) => p.id === product.id)

        if (encontrado) {
            console.log(`Producto encontrado`);
        } else {
            products.push(product)
            await fs.writeFile(path, JSON.stringify(products))
        }
    }

    async getProducts() {

        const prods = JSON.parse(await fs.readFile(path, `utf-8`))
        console.log(prods);
    }

    async getProductsById(id) {

        const products = JSON.parse(await fs.readFile(path, `utf-8`))
        const encontrado = products.find((p) => p.id === id)

        if (encontrado == undefined) {
            return console.error(`Not Found`)
        } else {
            return console.log(encontrado)
        }

    }

    async updateProducts(id, product) {
        const products = JSON.parse(await fs.readFile(path, `utf-8`))
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
            await fs.writeFile(path, JSON.stringify(products))

        }

    }
    async deleteProducts(id) {
        const products = JSON.parse(await fs.readFile(path, `utf-8`))
        const encontrado = products.find((p) => p.id === id)

        if (encontrado) {
            await fs.writeFile(path, JSON.stringify(products.filter(el => el.id != id)))
        } else {
            console.log(`Not found`);
        }
    }
}
class Productos {
    static idIncrement = 0
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Productos.incrimentarId()
    }
    static incrimentarId(){
        this.idIncrement++
        return this.idIncrement
    }
    // static incrimentarId() {
    //     if (this.idIncrement) {
    //         this.idIncrement++
    //     } else {
    //         this.idIncrement = 1
    //     }
    //     return this.idIncrement
    // }

}

const producto1 = new Productos("pelota", "futbol", 15000, [], "2PP", 10)
const producto2 = new Productos("musculosa", "ropa", 10000, [], "20MM", 5)
const producto3 = new Productos("auriculares", "tecnologia", 50000, [], "4AA", 7)

const productManager = new ProductManager()


//productManager.addProduct(producto1)
//productManager.addProduct(producto2)
//productManager.addProduct(producto3)


//productManager.getProducts()

//productManager.getProductsById(2)

//productManager.updateProducts(1,{title: "mouse", description: "electronica", price: 20000 , thumbnail: [], code:"20TT", stock: 33})

//productManager.deleteProducts(2)

