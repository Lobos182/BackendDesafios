const express = require('express');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo')

//--------------------------------------------
// instancio servidor, socket y api


const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const ProductosApi = new ContenedorArchivo('./data/products.txt');
const mensajes = [];


//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo Cliente');
    //chat
    socket.emit('mensajes', mensajes);
    socket.on('new-message', data => {
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    });
    //productos
    socket.emit('productos', await ProductosApi.getAll());
    socket.on('new-producto', async data => {
        await ProductosApi.save(data);
        const productos = await ProductosApi.getAll();
        io.sockets.emit('productos', productos);
    });
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
