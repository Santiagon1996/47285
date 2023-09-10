const socket = io()
const form = document.getElementById("idForm")
const botonProds = document.getElementById(`botonProductos`)
const table = document.getElementById('tableBody')

socket.emit('loadProducts')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target) 
    const prod = Object.fromEntries(datForm) 
    socket.emit('addProduct', prod)
    e.target.reset()
})

function deleteProduct(id) {
    socket.emit('deleteProduct', id)
}



socket.on('deleteRow', (id) => {
    const rowDeleted = document.getElementById(`row${id}`)
    rowDeleted.remove()
})




socket.on('products', (products) => {
    products.forEach(element => {
        table.innerHTML += `<tr id='row${element.id}'>
        <td>${element.title}</td>
        <td>${element.description}</td>
        <td>${element.price}</td>
        <td>${element.status}</td>
        <td>${element.stock}</td>
        <td>${element.code}</td>
        <td><button onclick='deleteProduct(${element.id})'>Eliminar</button></td>
      </tr>`
    });
})