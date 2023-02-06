import fs from 'fs'

class CartManager {
    constructor ( path ) {
        this.path = path
    }

    async add( cart ) {

        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const carts = await JSON.parse( data );

        if(carts.length > 0) {
            const index = carts.length - 1
            cart.id = carts[index].id + 1
        } else {
            cart.id = 1
        }
        carts.push( cart )
        await fs.promises.writeFile( this.path, JSON.stringify( carts ) )

        return 'Carrito creado'
    }

    async getById( id ) {
        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const carts = await JSON.parse( data )

        const cart = carts.find(cart => cart.id === id)

        if( cart ){
            return cart.products
        } else {
            return 'Carrito no encontrado' 
        }
    }

    async addProdctByCartId( id, productID ) {
        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const carts = await JSON.parse( data )

        if( carts.some( cart => cart.id === parseInt( id ))) {
            const cartIndex = carts.findIndex( cart => cart.id === parseInt( id ))
            const productIndex = carts[cartIndex].products.findIndex( prod => prod.id === parseInt( productID ))
            if( carts[cartIndex].products.some( prod => prod.id === productID ) ) {
                carts[cartIndex].products[productIndex].quantity++
            } else {
                carts[cartIndex].products.push({ "id": productID, "quantity": 1 })
            }
            await fs.promises.writeFile( this.path, JSON.stringify( carts ) )
            return 'Producto agregado al carrito'
        } else {
            return 'Carrito no encontrado'
        }
    }
}

export default CartManager