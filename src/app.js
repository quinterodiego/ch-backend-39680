import express from 'express'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { Server } from "socket.io"

// FILES
import { __dirname } from './path.js'
import routerProducts from './routes/products.js'
import routerCarts from './routes/carts.js'
import ProductManager from './controllers/ProductManager.js'

const app = express()
const PORT = 8080
const productManager = new ProductManager('./src/models/products.json')

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "./views"))

// ROUTES
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)

// handlebars
app.get('/realTimeProducts', (req, res) => {
    res.render('home')
})


const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const io = new Server(server)

io.on('connection', async (socket) => {
    console.log(`Nueva conexion ${socket.id}`)
    const products = await productManager.get()

    socket.emit('products', products)

    socket.on('newProduct', async data => {
        await productManager.add(data)
        const products = await productManager.get()
        io.sockets.emit('products', products)
    })

    socket.on('delete', (id) => {
        productManager.deleteById(id)
        io.sockets.emit('products', products)
    })
})