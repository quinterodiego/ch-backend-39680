import fs from 'fs'

class ProductManager {
    constructor ( path ) {
        this.path = path
    }

    async add ( product ) {

        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const products = await JSON.parse( data );

        if(products.length > 0) {
            const index = products.length - 1
            product.id = products[index].id + 1
        } else {
            product.id = 1
        }
        products.push( product )
        await fs.promises.writeFile( this.path, JSON.stringify( products ) )
        return 'Producto creado'
    }

    async get() {
        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const products = await JSON.parse( data )
        return products
    }

    async getById( id ) {
        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const products = await JSON.parse( data) 
        const product = products.find( prod => prod.id === id )
        if( product ){
            return product
        } else {
            return 'Producto no encontrado' 
        }
    }

    async update( id, product ) {
        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const products = await JSON.parse( data )
        if( products.some( prod => prod.id === parseInt( id ) ) ) {
            const index = products.findIndex( prod => prod.id === parseInt(id) )
            products[index].title = product.title
            products[index].description = product.description
            products[index].code = product.code
            products[index].price = product.price
            products[index].status = product.status
            products[index].stock = product.stock
            products[index].category = product.category
            products[index].thumbnails = product.thumbnails
            await fs.promises.writeFile( this.path, JSON.stringify( products ) )
            return 'Producto actualizado'
        } else {
            return 'Producto no encontrado'
        }
    }

    async deleteById( id ) {
        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const products = await JSON.parse( data )
        const newProducts = products.filter( prod => prod.id !== id )
        await fs.promises.writeFile( this.path, JSON.stringify( newProducts ) )
    }
}

export default ProductManager