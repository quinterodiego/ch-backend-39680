import Router from 'express'
import ProductManager from './../controllers/ProductManager.js'

const router = Router()
const productManager = new ProductManager('src/models/products.json')

router.get('/', async ( req, res ) => {
    const products = await productManager.get()
    const { limit } = req.query
    if ( limit ) {
        const productsLimit = products.splice( 0, parseInt( limit ))
        res.send({ productsLimit })
    } else {
        res.send( products )
    }

})

router.get('/:pid', async ( req, res ) => {
    const products = await productManager.get()
    const id = parseInt( req.params.pid )
    const product = products.find( p => p.id === id )
    if( product ) {
        res.send( product )
    } else {
        res.send({ error: 'Producto no encontrado'})
    }
})

router.post('/', async ( req, res ) => {
    const product = req.body
    await productManager.add( product )
    res.send({ message: 'Producto agregado' })
})

export default router