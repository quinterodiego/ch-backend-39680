const ProductManager = require('./Product.Manager.js')
const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: true }))

const PORT = 8080

const productManager = new ProductManager('src/products.json')

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts()
    const { limit } = req.query
    if ( limit ) {
        const productsLimit = products.splice(0, parseInt(limit))
        res.send({ productsLimit })
    } else {
        res.send( products )
    }

})

app.get('/products/:pid', async (req, res) => {
    const products = await productManager.getProducts()
    const id = parseInt(req.params.pid)
    const product = products.find(p => p.id === id)
    if(product) {
        res.send(product)
    } else {
        res.send({ error: 'Producto no encontrado'})
    }
})


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})