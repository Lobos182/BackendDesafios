// Express settings
const express = require('express');
const app = express();

// JSON settings
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Handlebars setting
const handlebars = require('express-handlebars');

// Engine and app.set
//app.engine('hbs', handlebars.engine());
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts'
    })
);
app.set('view engine', 'hbs');
app.set('views', './views');

// Products 
const Container = require('../../../api/productos')
const products = new Container('../../resources/products.txt')

// GET and POST
app.get('/', (req, res) => {
    res.render('formulario', {});
})
app.post('/productos', async (req, res)=> {
    let product = req.body
    if(product){
        await products.save(product)
        console.log(`Producto guardado : ${JSON.stringify(product)}`)
        res.redirect('/')
    }
    else{res.sendStatus(400)}
    
})
app.get('/productos', async (req, res) => {
    const productos = await products.getAll()
    res.render('productos', {productos})
})

/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))