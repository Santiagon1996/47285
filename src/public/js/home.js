const socket = io()

const table = document.getElementById('tableBody')

socket.emit('loadProducts')

socket.on('products', (products) => {
    products.forEach(element => {
        table.innerHTML += `<tr>
        <td>${element.nombre}</td>
        <td>${element.description}</td>
        <td>${element.categoria}</td>
        <td>${element.precio}</td>
        <td>${element.color}</td>
        <td>${element.stock}</td>
        <td>${element.code}</td>
      </tr>`
    });
})