const fs = require('fs')

class ProductManager {
    constructor (pPath) {
        this.path = pPath
    }

    async nextID() {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        if(products.length > 0){
            const lastObject = products[products.length-1]
            const id = lastObject.id + 1
            return id
        }else{
            const id = 1
            return id
        }
    }

    async addProduct (product) {

        const data = await fs.promises.readFile(this.path, 'utf-8')

        const products = await JSON.parse(data);

        if(products.length >= 0){
            const code = products.find(p => p.code === product.code)
            if(code) {
                console.log('Ya existe el codigo de producto')
                return
            }
            product.id = await this.nextID()
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        } else {
            product.id = 0
            products.push(product)
        }
    }

    async getProducts() {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        return products
    }

    async getProductById(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        const product = products.find(p => p.id === id)
        if(product){
            console.log(product)
        } else {
            console.log('Not found')
        }
    }

    async updateProduct(product) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        const productsToUpdate = products.filter(p => p.id !== product.id)
        const newProducts = [...productsToUpdate, product]
        newProducts.sort((a, b) => {
            return a.id - b.id;
        });
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
    }

    async deleteProduct(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        const newProducts = products.filter(p => p.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
    }
}

module.exports = ProductManager