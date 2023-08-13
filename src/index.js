
import express from "express"
import { ProductManager } from "../src/ProductManager.js"
import { Productos } from "../src/Productos.js"

const path = `./productos.json`
const PORT = 4000
const app = express()
const productManager = new ProductManager(path);
app.use(express.json())
const producto1 = new Productos("pelota", "futbol", 15000, [], "2PP", 10)
const producto2 = new Productos("musculosa", "ropa", 10000, [], "20MM", 5)
const producto3 = new Productos("auriculares", "tecnologia", 50000, [], "4AA", 7)




//productManager.addProduct(producto1)
//productManager.addProduct(producto2)
//productManager.addProduct(producto3)


//productManager.getProducts()

//productManager.getProductsById(2)

//productManager.updateProducts(1,{title: "mouse", description: "electronica", price: 20000 , thumbnail: [], code:"20TT", stock: 33})

//productManager.deleteProducts(1)



app.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    const limit = Number(req.query.limit);
    if (limit) {
        return res.status(200).json(products.slice(0, limit))
    } else
        return res.status(200).json(products)
})


app.get("/products/:pid", async (req, res) => {
    const id = Number(req.params.pid);
    const product = await productManager.getProductById(id);
    if (!product){
      return res.status(404).json(product);
    }else{
      res.status(200).json(product);
    }
  });

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})