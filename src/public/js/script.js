


const socket = io()

const sendChat = document.getElementById(`sendChat`)
const parrafoMensajes = document.getElementById(`parrafoMensajes`)
const valInput = document.getElementById(`chatBox`)

let user

Swal.fire({
    title: `Identificacion de usuario`,
    text: `Ingrese su nombre de usuario`,
    input: `text`,
    inputValidator: (valor) => {
        return !valor && `Ingrese su nombre de usuario`
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user);
})

sendChat.addEventListener(`click`, () => {
    let fechaActual = new Date().toLocaleString()

    if (valInput.value.trim().length > 0) {
        socket.emit(`mensaje`, { fecha: fechaActual, user: user, mensaje: valInput.value })
        valInput.value = ``
    }
})

socket.on(`mensaje`, (arrayMensajes) => {
    parrafoMensajes.innerHTML = ""
    arrayMensajes.forEach(mensaje => {
        parrafoMensajes.innerHTML += `<p> ${mensaje.fecha}: el usuario ${mensaje.user} escribio ${mensaje.mensaje} </p>`

    });

})