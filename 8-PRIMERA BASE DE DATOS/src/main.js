import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import ContenedorSQL from './contenedores/ContenedorSQL.js'

import config from './config.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes')

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    //Implementación productos
    // solo falta q ande el cargar los datos cuando se levanta el navegador productos y mensajes
    const allProducts = await productosApi.listarAll();
    socket.emit('productos', allProducts);

    socket.on('update', async  (data) => {
        await productosApi.guardar(data);
        const allProducts = await productosApi.listarAll();
        io.sockets.emit('productos', allProducts);
    })

    //Implementacion mensajes
    const allMsj = await mensajesApi.listarAll();
    socket.emit('mensajes', allMsj);

    socket.on('nuevoMensaje', async  (data) => {
        await mensajesApi.guardar(data);
        const allMsj = await mensajesApi.listarAll();
        io.sockets.emit('mensajes', allMsj);
    })
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