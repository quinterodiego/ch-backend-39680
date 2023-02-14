const socket = io()

const renderProducts = (data) => {
    const html = data.map((product) => {
        return (`
        <tr>
            <th scope="row">${product.id}</th>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td><img src="${product.thumbnail}" width="75"/></td>
            <td align="center">
                <a href="#" class="text-white">
                    <i class="fa-solid fa-trash-can" onclick="deleteProduct(${product.id})"></i>
                </a>
            </td>
        </tr>
        `)
    }).join('');
    document.getElementById('products').innerHTML = html;
}

const deleteProduct = (id) => {
    socket.emit('delete', id)
}

const formProducts = document.getElementById('form-products');
formProducts.onsubmit = e => {
    e.preventDefault();
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        thumbnail: document.getElementById('thumbnail').value,
        price: parseInt(document.getElementById('price').value),
        code: document.getElementById('code').value,
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value
    }

    socket.emit('newProduct', product);
    formProducts.reset();
}

socket.on('products', (data) => {
    renderProducts(data);
})