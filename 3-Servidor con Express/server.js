const express = require('express');
const Contenedor = require('./contenedor');

const app = express();


// async function listaProductos(){
//     const product=new Contenedor('./productos.txt');
//     return await product.getAll();
// }

// async function productoRandom() {
//     let randomNumber = Math.ceil(Math.random() * 10);
//     console.log(randomNumber);
//     const product = new Contenedor('./productos.txt');
//     return await product.getById(randomNumber);
// }

app.get('/', (req, res) => {
    res.send('<h1 style="color:red;">Bienvenidos a mis Productos</h1 > ');
});

app.get('/productos', async (req, res) => {
    const product = new Contenedor('./productos.txt');
    res.send(await product.getAll());
});

app.get('/productoRandom', async (req, res) => {
    let randomNumber = Math.ceil(Math.random() * 10);
    console.log(randomNumber);
    const product = new Contenedor('./productos.txt');
    res.send(await product.getById(randomNumber));
});

const server = app.listen(8080, () => {
    console.log(`El servidor esta escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));




