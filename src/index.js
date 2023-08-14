
import express from "express"
import { ProductManager } from "../src/ProductManager.js"
import { Productos } from "../src/Productos.js"


const path = `./productos.json`
const PORT = 4000
const app = express()
const productManager = new ProductManager(path);
app.use(express.json())
const readProduct= productManager.readProductsFromJSON()

//Lista de Productos
const producto1 = new Productos("pelota", "deporte", 15000, [], "2PP", 10)
const producto2 = new Productos("musculosa", "ropa", 10000, [], "20MM", 5)
const producto3 = new Productos("auriculares", "tecnologia", 50000, [], "4AA", 7)
const producto4 = new Productos("teclado", "tecnologia", 3000, [], "4AA", 3)
const producto5 = new Productos("monitor", "tecnologia", 40000, [], "5MM", 77)
const producto6 = new Productos("botines", "deporte", 80000, [], "B66", 20)
const producto7 = new Productos("short", "deporte", 60000, [], "S77", 33)
const producto8 = new Productos("gorra", "ropa", 1000, [], "8GG", 12)
const producto9 = new Productos("pantalon", "ropa", 20000, [], "9PP", 4)
const producto10 = new Productos("celular", "tecnologia", 1000000, [], "10CC", 13)


//Agregando Productos

// productManager.addProduct(producto1)
// productManager.addProduct(producto2)
// productManager.addProduct(producto3)
// productManager.addProduct(producto4)
// productManager.addProduct(producto5)
// productManager.addProduct(producto6)
// productManager.addProduct(producto7)
// productManager.addProduct(producto8)
// productManager.addProduct(producto9)
// productManager.addProduct(producto10)



//productManager.getProducts()

//productManager.getProductsById(2)

//productManager.updateProducts(1,{title: "mouse", description: "electronica", price: 20000 , thumbnail: [], code:"20TT", stock: 33})

//productManager.deleteProducts(1)



app.get("/products", async (req, res ) => {

  let limit = Number(req.query.limit)

  if(!limit){
    return res.send( await readProduct)
  }

  let products = await readProduct

  let productslimit= products.slice(0,limit)

  res.send(productslimit);

})

app.get("/products/:id", async(req, res )=>{
  let id = Number(req.params.id)

  if(!id){
    return res.send( await readProduct)
  }

  let products = await readProduct

  let productId= products.find(p=> p.id === id )

  res.send(productId)
})


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})