const socket = io.connect();
//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const productos = {
        name: document.getElementById('nombre').value,
        price: document.getElementById('precio').value,
        src: document.getElementById('foto').value
    }
    socket.emit('new-producto', productos);
    document.getElementById('formAgregarProducto').reset();

})

socket.on("productos", async (productos) => {
    const html = await makeHtmlTable(productos);
    document.getElementById("productos").innerHTML = html;

});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}


//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const nuevoMensaje = {
        author: inputUsername.value,
        text: inputMensaje.value,
        date: new Date().toLocaleString()
    }

    socket.emit('new-message', nuevoMensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajes => {
    const html = makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map((elem) => {
        return (`<div id="author"><strong>${elem.author}</strong><em id="fechaMsj">(${elem.date})<em>: <em id="textMsj">${elem.text}</em></div>`)
    }).join(' ');
}

inputUsername.addEventListener('input', () => {
    campo = inputUsername;
    valido = document.getElementById('emailOK');
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(campo.value)) {
        valido.innerText = "válido";
        inputMensaje.removeAttribute('disabled');
    } else {
        valido.innerText = "incorrecto";
        inputMensaje.disable
        btnEnviar.disable
    }

});

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
