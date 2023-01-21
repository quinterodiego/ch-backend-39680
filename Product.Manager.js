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
        console.log(products)
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

const productManager = new ProductManager('./products.txt')

// productManager.getProducts()

const product1 = {
    title: 'producto1',
    description: 'xxxxxxxxxxxx',
    price: 1200,
    thumbnail: 'htpp://xxxxxxxxxxxxx',
    code: 'asfk2223kkk',
    stock: 100
}

const product2 = {
    title: 'producto2',
    description: 'yyyyyyyyyyyyyy',
    price: 5000,
    thumbnail: 'htpp://yyyyyyyyyyyyy',
    code: 'sdfskjdhf11111',
    stock: 80
}

const product3 = {
    title: 'producto3',
    description: 'zzzzzzzzzzzzzzz',
    price: 300,
    thumbnail: 'htpp://zzzzzzzzzzzzzzzzzzzz',
    code: 'sdkjhdgkjhs223r555',
    stock: 50
}

// productManager.addProduct(product1)
productManager.addProduct(product2)
// productManager.addProduct(product3)

// productManager.getProducts()

const product4 = {
    title: 'producto4',
    description: 'zzzzzzzzzzzzzzz',
    price: 300,
    thumbnail: 'htpp://zzzzzzzzzzzzzzzzzzzz',
    code: 'sdkjhdgkjhs223r555',
    stock: 50
}

// productManager.addProduct(product4)

// productManager.getProductById(2)

const productToUpdate = {
    title: 'producto2 actualizado',
    description: 'ththththththth',
    price: 5000,
    thumbnail: 'htpp://yyyyyyyyyyyyy',
    code: 'sdfskjdhf11111',
    stock: 80,
    id: 2
}

// productManager.updateProduct(productToUpdate)

// productManager.getProducts()

// productManager.deleteProduct(2)

// productManager.getProducts()