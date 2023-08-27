
import express from "express"
import multer from 'multer'
import {prodsRouter} from "./routes/productos.routes.js"
import {cartsRouter} from './routes/storage.routes.js'; 
import {__dirname} from "./path.js"
import path from "path"
import {engine} from "express-handlebars"

// SERVER
const PORT = 8080
const app = express()

//Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img') //null hace referencia a que no envia errores
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) //Concateno el nombre original de mi archivo con milisegundos con Date.now()
    }
})
// Middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Defino que motor de plantilla utilozo y su config
app.engine(`handlebars`, engine())
//Setting de mi app hbs
app.set(`view engine`, `handlebars`)
//Rutas de mis vistas uso el resolve como el metodo join, pero resulve rutas absoluta atraves de rutas relativas
app.set(`views`, path.resolve(__dirname, `./views`))
const upload = multer({ storage: storage })
app.use(`/static`, express.static(path.join(__dirname, `/public`)))// Unir rutas en una sola concatenandolas



//Routes
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)


app.get(`/static`, (req, res )=>{
    res.render(`home`, {
        nombre: `casa`,
        titleHome:`Inicio`,
        titleProductos:`Productos`,
        cssProduct: `product.css`,
        cssHome: `style.css`
    })
})


app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen cargada")
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})


//Lista de Productos

//const producto1 = new Productos("pelota", "deporte", 15000, [], "2PP", 10, true)
// const producto2 = new Productos("musculosa", "ropa", 10000, [], "20MM", 5, true)
// const producto3 = new Productos("auriculares", "tecnologia", 50000, [], "4AA", 7, true)
// const producto4 = new Productos("teclado", "tecnologia", 3000, [], "4AA", 3, true)
// const producto5 = new Productos("monitor", "tecnologia", 40000, [], "5MM", 77, true)
// const producto6 = new Productos("botines", "deporte", 80000, [], "B66", 20, true)
// const producto7 = new Productos("short", "deporte", 60000, [], "S77", 33, true)
// const producto8 = new Productos("gorra", "ropa", 1000, [], "8GG", 12, true)
// const producto9 = new Productos("pantalon", "ropa", 20000, [], "9PP", 4, true)
// const producto10 = new Productos("celular", "tecnologia", 1000000, [], "10CC", 13, true)


//Agregando Productos

//productManager.addProduct(producto1)
// productManager.addProduct(producto2)
// productManager.addProduct(producto3)
// productManager.addProduct(producto4)
// productManager.addProduct(producto5)
// productManager.addProduct(producto6)
// productManager.addProduct(producto7)
// productManager.addProduct(producto8)
// productManager.addProduct(producto9)
// productManager.addProduct(producto10)



//Testing de metodos

//productManager.getProducts()
//productManager.getProductsById(2)
//productManager.updateProducts(1,{title: "mouse", description: "electronica", price: 20000 , thumbnail: [], code:"20TT", stock: 33})
//productManager.deleteProducts(1)



