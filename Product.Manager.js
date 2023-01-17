class ProductManager {
    constructor () {
        this.products = []
    }

    addProduct(product) {
        if(this.products.length >= 0){
            const code = this.products.find(p => p.code === product.code)
            if(code) {
                console.log('Ya existe el codigo de producto')
                return
            }
            product.id = this.products.length + 1
            this.products.push(product)
        } else {
            product.id = 0
            this.products.push(product)
        }
    }

    getProducts() {
        console.log(this.products)
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id)
        if(product){
            console.log(product)
        } else {
            console.log('Not found')
        }
    }
}

const productManager = new ProductManager()

productManager.getProducts()

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

productManager.addProduct(product1)
productManager.addProduct(product2)
productManager.addProduct(product3)

console.log('|************************Listado de productos************************|')
productManager.getProducts()


const product4 = {
    title: 'producto4',
    description: 'zzzzzzzzzzzzzzz',
    price: 300,
    thumbnail: 'htpp://zzzzzzzzzzzzzzzzzzzz',
    code: 'sdkjhdgkjhs223r555',
    stock: 50
}

productManager.addProduct(product4)

console.log('|***********************Buscar producto*************************|')
productManager.getProductById(3)