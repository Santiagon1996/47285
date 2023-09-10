
import express from "express"
import multer from 'multer'
import { Server } from "socket.io"
import path from "path"
import { engine } from "express-handlebars"
import mongoose from "mongoose";
import { productModel } from "./models/productos.models.js";
import { messageModel } from "./models/mensajes.models.js";
import { __dirname } from "./path.js"

import prodsRouter from "./routes/productos.routes.js"
import cartsRouter from './routes/storage.routes.js';
import realTimeProductsRouter from "./routes/realTimeProducts.routes.js";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import homeRouter from "./routes/home.routes.js";

// SERVER
const PORT = 8080
const app = express()



//Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})

//MONGOOSE
                                                    //pass
mongoose.connect(`mongodb+srv://santiagoanardelli96:Milo0000@cluster0.cgwobx8.mongodb.net/?retryWrites=true&w=majority`)

    .then(() => console.log(`DB is connect`))
    .catch(() => console.log(`Error connect DB`))

// Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine(`handlebars`, engine())
app.set(`view engine`, `handlebars`)
app.set(`views`, path.resolve(__dirname, `./views`))
const upload = multer({ storage: storage })
app.use(`/static`, express.static(path.join(__dirname, `/public`)))


//SERVER SOCKET.IO
const io = new Server(server)
const mensajes = []
const prods = []
io.on(`connection`, (socket) => {
    console.log("Server Socket.io connection");

    socket.on('addProduct', async (nuevoProd) => {
        await productModel.create(nuevoProd)
        const allProds = await productModel.find()
        const lastProd = allProds[allProds.length -1]
        socket.emit('products', [lastProd])
    })
    socket.on('loadProducts', async () => {
        const prodModel = await productModel.find()
        socket.emit('products', prodModel )
    })

    socket.on('deleteProduct', async (id) => {
        console.log(id)
        await productModel.findOneAndDelete(id)
        socket.emit('deleteRow', id)
    })
    socket.on('mensajeConexion', (user) => {
        if (user.rol === "Admin") {
            socket.emit('credencialesConexion', "Usuario valido")
        } else {
            socket.emit('credencialesConexion', "Usuario no valido")
        }
    })
    socket.on('mensaje', async (infoMensaje) => {
        await messageModel.create(infoMensaje)
        const messages = await messageModel.find()
        console.log(messages)
        io.emit('mensajes', messages)
    })
    socket.on('loadMessages', async () => {
        const messages = await messageModel.find()
        socket.emit('mensajes', messages)
    })
})




//Routes
app.use('/static/home', homeRouter)
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)
app.use('/static/realTimeProducts', realTimeProductsRouter)
app.use(`/api/user`, userRouter)
app.use('/static/chat', chatRouter)


app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen cargada")
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



