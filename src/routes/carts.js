import Router from 'express'
import CartManager from './../controllers/CartManager.js'

const router = Router()
const cartManager = new CartManager( 'src/models/carts.json' )

router.post('/', async ( req, res) => {
    const cart = req.body
    await cartManager.add( cart )
    res.send({ message: 'Carrito creado' })
})

router.get('/:cid', async ( req, res ) => {
    const id = parseInt( req.params.cid )
    const cart = await cartManager.getById( id )
    res.send({ "Products": cart })
})

router.post('/:cid/product/:pid', async ( req, res) => {
    const cartID = parseInt( req.params.cid )
    const productID = parseInt( req.params.pid )
    const message = await cartManager.addProdctByCartId( cartID, productID)
    res.send( message )
})

export default router