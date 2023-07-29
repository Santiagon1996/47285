class ProductManager {
    #productos
    static idCounter=0 
    constructor(title, description, price, thumbnail, code, stock) {
        this.#productos = []
        this.title=title,
        this.description=description,
        this.price=price,
        this.thumbnail=thumbnail,
        this.code=code,
        this.stock=stock
    }
    addProduct(title, description, price, thumbnail, code, stock) {

        if (title == undefined || description == undefined || price == undefined || thumbnail == undefined || code == undefined || stock == undefined) return console.log("Todos los campos son obligatorios")

        if (this.#productos.find(p => p.code === code)) return console.log("Ya existe un producto con este codigo")

        let productoNuevo = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id : ++ProductManager.idCounter
        }
        this.#productos = [...this.#productos, productoNuevo]
        return true

    }
    getProducts() {
        console.log(this.#productos)
        return this.#productos
    }
    getProductById(id) {
        const encontrado = this.#productos.find((prod) => prod.id === id)
        if (encontrado == undefined) {
            return console.error(`Not Found`)
        }else{ 
            return console.log(encontrado)
        }

    }
}
const productManager = new ProductManager()
productManager.addProduct("pelota", "futbol", "15000", "/images/..", "2", 10)
productManager.addProduct("musculosa", "ropa", "10000", "/images/", "20", 5)
productManager.addProduct("auriculares", "tecnologia", "50000", "/images/", "4", 7)
productManager.getProducts()
productManager.getProductById(1)


