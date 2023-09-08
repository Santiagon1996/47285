const socket = io()

const table = document.getElementById('tableBody')

socket.emit('loadProducts')

socket.on('products', (products) => {
    products.forEach(element => {
        table.innerHTML += `<tr>
        <td>${element.title}</td>
        <td>${element.description}</td>
        <td>${element.price}</td>
        <td>${element.status}</td>
        <td>${element.stock}</td>
        <td>${element.code}</td>
      </tr>`
    });
})